import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the home page after sign-out
      navigate('/sign-in');
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign-out error:', error.message);
    }
  };

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/home" className="font-inter font-medium text-black px-4 py-2">HAV DATA LOGO</Link>
      <Link to="/reports" className="font-inter font-small text-black px-4 py-2 rounded-md">Reports</Link>
      <Link to="/analytics" className="font-inter font-small text-black px-4 py-2 rounded-md">Analytics</Link>
      <Link to="/learn" className="font-inter font-small text-black px-4 py-2 rounded-md">Learn</Link>
      <button
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;