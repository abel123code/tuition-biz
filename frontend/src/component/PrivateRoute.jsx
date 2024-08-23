import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner or any loading indicator
  }

  return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

