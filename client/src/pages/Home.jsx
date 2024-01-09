import {React, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Header from '../components/home/Header';
import Table from '../components/home/table/Table';
import Trending from '../components/home/trending/Trending';


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If not authenticated, redirect to the login page
        navigate('/sign-in');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);



  return (

    
      <div className='w-full'>
        <Header/>
          <div className='mt-10'/>
            <Trending/>
          <div className='mt-20'/>
            <Table/>

      </div>

    
    
  )
}

export default Home;
