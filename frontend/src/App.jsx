import React from 'react'
import LandingPage from './screens/LandingPage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './screens/AboutUs';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import CheckAndVerifyEmailPage from './screens/VerifyEmailPage';
import Dashboard from './screens/Dashboard';
import ResetPassword from './screens/ResetPassword';
import PrivateRoute from './component/PrivateRoute';
import Layout from './component/Layout';
import Profile from './screens/Profile';
import Courses from './screens/Courses';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
          <Route path='/Verify-email' element={<CheckAndVerifyEmailPage />} />
          <Route path="/Reset-password" element={<ResetPassword />} />
          <Route path='/Dashboard' element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } 
          />
          <Route path='/Profile' element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          } />
          <Route path='/Courses' element={
            <PrivateRoute>
              <Layout>
                <Courses />
              </Layout>
            </PrivateRoute>
          } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
