import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebaseConfig'; // Adjust the import path as needed
import { FaPaperclip } from 'react-icons/fa'; // Importing the paper clip icon from react-icons
import { useNavigate } from 'react-router-dom';
import eventBus from '@/utils/eventBus';

export default function ProfileForm({ onUpdate }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    profilePictureURL: '',
    role: '',
    username: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setFormData({
            bio: data.bio || '',
            profilePictureURL: data.profilePictureURL || '',
            role: data.role || '',
            username: data.username || '',
          });
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureURL = formData.profilePictureURL;

      if (profileImage) {
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(imageRef, profileImage);
        profilePictureURL = await getDownloadURL(imageRef);
      }

      const userDoc = doc(db, "users", currentUser.uid);
      await updateDoc(userDoc, {
        bio: formData.bio,
        profilePictureURL,
        username: formData.username,
      });

      setSuccessMessage("Profile updated successfully!");
      eventBus.emit('profileUpdated', { profilePictureURL });

      if (onUpdate) {
        onUpdate(); // Trigger any additional update if needed
      }

      
      navigate('/Dashboard')
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.role}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div className="flex items-center">
              <label htmlFor="profilePictureURL" className="cursor-pointer flex items-center">
                <FaPaperclip className="text-gray-300 text-xl mr-2" />
                <span className="text-gray-300">Upload a new profile picture</span>
              </label>
              <input
                type="file"
                id="profilePictureURL"
                name="profilePictureURL"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
