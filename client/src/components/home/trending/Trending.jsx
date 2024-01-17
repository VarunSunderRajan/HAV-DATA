// Trending.jsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import fire from '../../../assets/fire.png';
import recent from '../../../assets/recent.png';
import gainers from '../../../assets/gainers.png';
import ReactSwitch from 'react-switch';
import Rate from '../table/Rate';

import TrendingCard from './TrendingCard';
import { CannibasContext } from '../../../context/context';
import { getAuth } from 'firebase/auth';

const styles = {
  trendingWrapper: `mx-auto max-w-screen-2xl`,
  h1: `text-3xl text-black`,
  flexCenter: `flex items-center`,
};



const Trending = () => {
  const { getSalesDataForUser } = useContext(CannibasContext);
  const [checked, setChecked] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [salesData2, setSalesData2] = useState(null);
  const [salesData3, setSalesData3] = useState(null);




  const auth = getAuth();
  const user = auth.currentUser;


  // const getUsernameFromEmail = (email) => {
  //   const username = email.split('@')[0]; // Split by '@' and take the first part
  //   return username.charAt(0).toUpperCase() + username.slice(1);
    
  // }




  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {

      const salesData1 = await getSalesDataForUser(user.email);
      const salesData2 = await getSalesDataForUser(user.email);
      const salesData3 = await getSalesDataForUser(user.email);

      //const apiResponse = await getSalesDataForUser();
      setSalesData(salesData1.slice(4,7));
      setSalesData2(salesData2.slice(8,11));
      setSalesData3(salesData3.slice(12,15));


    } catch (error) {
      console.error(error.message);
    }
  }, [getSalesDataForUser]);
  //console.log(salesData)

  return (
    <div className='text-black'>
      <div className={styles.trendingWrapper}>
        <div className='flex justify-between'>
          <h1 className={styles.h1}> Company Dashboard</h1>
          <div className='flex'>
            <p className='text-gray-400'>Dark Mode &nbsp;</p>
            <ReactSwitch checked={checked} onChange={() => setChecked(!checked)} />
          </div>
        </div>
        <br />
        {/* <div className='flex'>
          <p className='text-gray-400'>The global cannibas market cap is $1.73B, a&nbsp; </p>
          <span>
            {' '}
            <Rate isIncrement={true} rate='0.53%' />
          </span>
          <p> &nbsp; decrease over the last day. <span className='underline'>Read More</span> </p>
        </div> */}
        <br />

        <div className={styles.flexCenter}>
          <TrendingCard title='Trending' icon={fire} trendingData={salesData} />
          <TrendingCard title='Biggest Gainers' icon={gainers} trendingData={salesData2} />
          <TrendingCard title='Recently Added' icon={recent} trendingData={salesData3} />
        </div>
      </div>
    </div>
  );
};

export default Trending;
