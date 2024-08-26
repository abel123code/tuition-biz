import React from 'react'
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        const auth = getAuth();
        try {
          await signOut(auth);
          navigate('/'); // Navigate back to login page after logout
        } catch (error) {
          console.error("Error logging out: ", error);
          // You can also set an error message state here to display to the user
        }
      };
  return (
    <div>
      you have login
      <button className='bg-black text-white' onClick={handleLogout}>
        sign out
      </button>
    </div>
  )
}

export default Dashboard
