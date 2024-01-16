// LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>

      <header>
        <h1>Welcome to Our Website</h1>
      </header>
      <main>
        <p>Discover amazing things with our awesome platform!</p>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
      </main>
      <footer>
        <p>Contact us for more information</p>
      </footer>

      
    </div>
  );
};

export default LandingPage;
