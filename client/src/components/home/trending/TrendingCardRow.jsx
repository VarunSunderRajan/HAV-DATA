// TrendingCardRow.jsx
import React from 'react';
import Rate from '../table/Rate';

const styles = {
  trendingCardRow: `flex items-center justify-between mb-2 text-[0.93rem]`, // Adjusted margin-bottom here
  dataContainer: `flex flex-1`, // Added a flex container for better control and flex-1 to take up available space
  dataElement: `mx-4`, // Added a margin here to reduce spacing between data elements
};

const TrendingCardRow = ({
  number,
  salesProduct,
  salesQuantity,
  salesGross,

}) => {
  return (

    <div className={styles.trendingCardRow}>
      <p className='opacity-40'>{number}</p>
      <div className={`flex flex-1 items-center`}>
        <p className={`${styles.dataElement}`}>{salesProduct}</p>
        <p className={`${styles.dataElement}`}>{salesQuantity}</p>
        <p className={`${styles.dataElement}`}>{salesGross}</p>
        <p> <Rate isIncrement={true} rate='0.53%' /> </p>
      </div>
      {/* <div className={`flex items-center`}>
        <Rate isIncrement={true} rate='0.53%' />
      </div> */}
    </div>


    
  );
};

export default TrendingCardRow;

