import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignIn from './pages/SignIn.jsx';
import Home from './pages/Home.jsx';
import { CannibasProvider } from './context/context.jsx';

const App = () => {
  return (
    <BrowserRouter>

      <CannibasProvider>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          {/* Add other routes as needed */}
        </Routes>

      </CannibasProvider>
      
    </BrowserRouter>
  );
};

export default App;
