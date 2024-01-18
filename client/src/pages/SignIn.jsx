import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import app from './Firebase'; // Import the Firebase initialization file
import eye from '../assets/eye.png'
import app from '../components/Firebase'

const auth = getAuth(app);

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const signIn = async () => {
    try {

      setLoading(true);
      // Implement sign-in logic with Firebase
      await signInWithEmailAndPassword(auth, username, password);
      console.log('User signed in successfully');
      navigate('/home');
    } catch (error) {
      console.error('Sign-in error:', error.message);

      setErrorMessage('Invalid credentials');
    } finally {
      setLoading(false);
    }

  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // If Enter key is pressed, trigger the sign-in function
      signIn();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

      <div>
        <input
          className="w-full p-3 mb-4 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative">
          <input
            className="w-full p-3 mb-4 border rounded"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute top-1/2 right-3  transform -translate-y-1/2 bg-transparent text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            <img src={eye} alt="Toggle Password" width="20" height="20"/>
          </button>
        </div>

        <button
          className="font-inter w-full bg-[#6469ff] text-white p-3 rounded hover:bg-blue-600 transition duration-300"
          onClick={signIn}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <Link to="/" className="block text-center mt-4 text-[#6469ff] hover:underline">
          Go Back
        </Link>


      </div>

      <p className="text-center">
        Don't have an account? Email&nbsp;
        <Link to="" className="text-[#6469ff]">
          info@havdata.ca
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
