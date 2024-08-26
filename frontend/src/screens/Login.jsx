import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doSignInWithGoogle } from '@/utils/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setInfoMessage('');

        if (!isLoggingIn) {
            setIsLoggingIn(true);
            const auth = getAuth();
            try {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredentials.user;

                if (user.emailVerified) {
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Please verify your email address before logging in.');
                    await auth.signOut(); // Prevent login if email is not verified
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoggingIn(false);
            }
        }
    };

    const resendVerificationEmail = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && !user.emailVerified) {
            try {
                await sendEmailVerification(user);
                setInfoMessage('Verification email resent. Please check your inbox.');
            } catch (error) {
                setErrorMessage('Failed to resend verification email. Please try again later.');
            }
        } else {
            setErrorMessage('User not found or email already verified.');
        }
    };

    const onGoogleSignIn = async () => {
        setErrorMessage('');
        setInfoMessage('');

        if (!isLoggingIn) {
            setIsLoggingIn(true);
            const auth = getAuth();
            try {
                const result = await doSignInWithGoogle();
                const user = result.user;

                if (user.emailVerified) {
                    navigate('/Dashboard');
                } else {
                    setErrorMessage('Please verify your email address before logging in.');
                    await auth.signOut(); // Prevent login if email is not verified
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoggingIn(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#6d6dcc]">
            <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
                <h2 className="text-3xl font-semibold mb-2 text-center text-white">Welcome Back</h2>
                <p className="mb-6 text-center text-white">Please Login to Continue</p>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                {infoMessage && <p className="text-green-500 text-center mb-4">{infoMessage}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex mb-3">
                        <a href="/Reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <button 
                        onClick={onGoogleSignIn} 
                        className="bg-white text-black px-4 py-2 rounded-lg flex items-center justify-center space-x-2 w-full"
                        disabled={isLoggingIn}
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5" />
                        <span>Google</span>
                    </button>
                </div>
                <div className="mt-4 flex justify-center">
                    <button 
                        className="text-sm text-blue-500 hover:underline"
                        onClick={resendVerificationEmail}
                    >
                        Resend Verification Email
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <a href="/" className="text-sm text-blue-500 hover:underline">Go Back To Home</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
