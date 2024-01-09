import React, { useState } from 'react';
import Info from '../../../assets/svg/Info'


const styles = {
  textIcon: `flex items-center cursor-pointer`,
  headerBorder: 'border-b border-t border-solid border-gray-200 cursor-pointer',
  headerBorderNonClickable: 'border-b border-t border-solid border-gray-200',
  
};

const TableHeader = ({ onSort }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (column === sortColumn) {
      // If the same column is clicked, toggle the sort order
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // If a new column is clicked, set the new column and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }

    // Notify the parent component (Table) about the sorting preferences
    onSort(column, sortOrder);
  };

  return (
    <tbody>
      <tr>
        <th className={`${styles.headerBorderNonClickable}`}>
        #&nbsp;
        </th>

        <th className={`${styles.headerBorder}`} onClick={() => handleSort('date')}>
          Date
        </th>
        <th className={`${styles.headerBorder}`} onClick={() => handleSort('brand')}>
          Brand
        </th>
        <th className={`${styles.headerBorderNonClickable}`}>
          Product
        </th>
        
        <th className={`${styles.headerBorder}`} onClick={() => handleSort('quantitysold')}>
          Quantity Sold
        </th>

        <th className={`${styles.headerBorder}`} onClick={() => handleSort('grosssales')}>
          Gross Sales
        </th>



        <th className={`${styles.headerBorder}`} onClick={() => handleSort('classification')}>
          <div className={styles.textIcon}>
            <p className='mr-2'>Category</p>
            <Info/>
          </div>
        </th>
        <th className={`${styles.headerBorderNonClickable}`}>
            <div className='flex items-center'>
                <p className='mr-2'>SKU</p>
                <div className={`${styles.textIcon}`}>
                <Info />
                </div>
            </div>
        </th>
      </tr>
    </tbody>
  );
};

export default TableHeader;
