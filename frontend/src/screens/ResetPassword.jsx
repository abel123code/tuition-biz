import React, { useState } from 'react';
import { doPasswordReset } from '../utils/auth'; // Adjust the import path as necessary

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await doPasswordReset(email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#6d6dcc]">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
          >
            Send Password Reset Email
          </button>
          <div className="mt-8 flex justify-center">
            <a href="/login" className="text-sm text-blue-500 hover:underline">Go Back To Login</a>
            </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
