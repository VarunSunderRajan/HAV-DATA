// TrendingCard.jsx
import React from 'react';
import MoreButton from './MoreButton';
import TrendingCardRow from './TrendingCardRow';

const styles = {
  trendingCard: ` p-5 py-3 pb-0 bg-[#fffff] rounded-xl text-black mr-3 shadow-md`,
  trendingCardWrapper: `flex items-center justify-between`,
};

const TrendingCard = ({ title, icon, trendingData }) => {
  return (
    <div className={styles.trendingCard}>
      <div className={styles.trendingCardWrapper}>
        
        <div className='flex'>
          {icon && <img src={icon} width={27} height={27} alt='icon' />}
          &nbsp;&nbsp;
          <p className='font-bold'>{title}</p>
        </div>
        <MoreButton />
      </div>
      <br />

      {trendingData &&
        trendingData.map((item, index) => {
          return (
            <TrendingCardRow
              key={item.salesid}
              number={index + 1} // Assuming you want to display the index as the number
              salesDate={item.salesdate}
              salesBrand={item.brand}
              salesProduct={item.productname}
              salesQuantity={item.quantitysold}
              salesGross={item.soldatprice}
              salesSKU={item.sku}
              salesClassification={item.classification}
            />
          );
        })}
    </div>
  );
};

export default TrendingCard;
