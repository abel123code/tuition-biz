import React, { useEffect, useState } from 'react';
import { GradualSpacingDemo } from '@/component/GradualSpacingDemo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Adjust the import path for your Firebase config

function Dashboard() {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (currentUser) {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData({
          name: data.username || 'Unknown User',
          email: data.email,
          imageUrl: data.profilePictureURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        });
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentUser]); // Corrected dependency array

  return (
    <div className="dark bg-gray-900 text-white min-h-screen p-6">
        <GradualSpacingDemo text={`Welcome back, ${userData.name}`} />
    </div>
  );
}

export default Dashboard;
