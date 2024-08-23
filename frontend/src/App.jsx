import React from 'react'
import LandingPage from './screens/LandingPage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './screens/AboutUs';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
    </Router>
  )
}

export default App
