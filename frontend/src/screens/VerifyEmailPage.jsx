import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, applyActionCode } from "firebase/auth";

function CheckAndVerifyEmailPage() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const oobCode = params.get('oobCode');

        if (oobCode) {
            applyActionCode(auth, oobCode)
                .then(() => {
                    setMessage('Email verified successfully! Redirecting to the dashboard...');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 3000);
                })
                .catch((error) => {
                    setError('Invalid or expired verification link. Please try again.');
                });
        } else {
            setMessage('A verification link has been sent to your email address. Please check your inbox and click on the link to verify your email.');
        }
    }, [location, navigate, auth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#6d6dcc]">
            <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Verify Your Email</h2>
                {message && <p className="text-white text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mt-8 flex justify-center">
                    <a href="/" className="text-sm text-blue-500 hover:underline">Go Back To Home</a>
                </div>
            </div>
        </div>
    );
}

export default CheckAndVerifyEmailPage;
