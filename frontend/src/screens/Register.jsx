import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '@/firebaseConfig';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            const auth = getAuth();
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredentials.user;

                await sendEmailVerification(user);

                // Store basic user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                    username: "", // Placeholder for username
                    role: "student", // Default role
                    profilePictureURL: "", // Placeholder for profile picture URL
                    bio: "" // Placeholder for user bio
                });

                // Redirect to a page that informs the user to check their email
                navigate('/Verify-email');
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-black to-[#6d6dcc] min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg mx-auto bg-gray-800 text-white p-8 flex flex-col justify-center items-center rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-2 text-center">Create an Account</h2>
                <p className="mb-6 text-center">Please fill in the details to register</p>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <form onSubmit={onSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}  // Toggle between text and password
                            id="password" 
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-1 pr-2 pt-2 text-gray-400"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}  // Toggle between text and password for confirm password as well
                            id="confirmPassword" 
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
                        disabled={isRegistering}
                    >
                        {isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <a href="/" className="text-sm text-blue-500 hover:underline">Go Back To Home</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
