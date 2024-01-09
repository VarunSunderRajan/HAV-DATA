import React, { useState, useContext, useEffect, useCallback } from 'react';
import { CannibasContext } from '../../../context/context';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import FilterButton from './FilterButton';
import DownloadButton from './DownloadButton';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Table = () => {
  const [originalData, setOriginalData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const { getSalesDataForUser } = useContext(CannibasContext);
  const navigate = useNavigate(); // Define navigate
  const auth = getAuth();

  useEffect(() => {
    setData();
  }, []);

  // Define a function to handle navigation
    const navigateToDashboard = (path) => {
        navigate(`/dashboard/${encodeURIComponent(path)}`);
    };

  const setData = useCallback(async () => {
    try {

      const user = auth.currentUser;

      if (!user) {
        console.error('User not authenticated');
        return;
      }

      console.log('Current User:', user.displayName);
      console.log('Current User Email:', user.email);



      // Fetch sales data based on the user's username
      const salesData = await getSalesDataForUser(user.email); // Adjust as per your user data structure
      console.log('SalesData:', salesData)
      

      setOriginalData(salesData);


      //  let apiResponse = await getSalesDataForUser();
      //  setOriginalData(apiResponse);

      // setOriginalData(salesData);

      // Default sorting based on 'date' in ascending order
      const sorted = salesData.slice().sort((a, b) => a.quantitysold - b.quantitysold);
      setSortedData(sorted);

      
    } catch (error) {
      console.error(error.message);
    }
  }, [getSalesDataForUser]);
  


  const handleSort = (column, newSortOrder) => {
    if (column === sortColumn) {
      // If the same column is clicked, toggle the sort order
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // If a new column is clicked, set the new column and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }

    // Sort the data based on the selected column and order
    const sorted = originalData.slice().sort((a, b) => {
      if (column === 'classification') {
        // Sort by highest grossing product within each classification
        const grossA = a.grosssales;
        const grossB = b.grosssales;

        if (a.classification === b.classification) {
          // If classifications are the same, sort by gross sales
          return newSortOrder === 'asc' ? grossA - grossB : grossB - grossA;
        } else {
          // If classifications are different, sort by classification
          return newSortOrder === 'asc' ? a.classification.localeCompare(b.classification) : b.classification.localeCompare(a.classification);
        }
      } else {
        // For other columns, use default numeric sorting
        return newSortOrder === 'asc' ? a[column] - b[column] : b[column] - a[column];
      }
    });

    setSortedData(sorted);
  };



  const exportToCsv = () => {
    const headers = ['Date', 'Brand', 'Product', 'Quantity Sold', 'Gross Sales', 'Classification', 'SKU'];
    const csvContent = `${headers.join(',')}\n${sortedData.map(row => (
      `${row.salesdate},${row.brand},${row.productname},${row.quantitysold},${row.grosssales},${row.classification},${row.sku}`
    )).join('\n')}`;
    
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.target = '_blank';
    link.download = 'sales_data.csv';
    link.click();
  };
  
  

  return (
    <div className='text-black font-semi-bold'>
      <div className='mx-auto max-w-screen-2xl'>
        <FilterButton onSort={handleSort} />
        <DownloadButton onClick={exportToCsv}/>
        <table className='w-full'>
          <TableHeader onSort={handleSort} />

          {sortedData && sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <TableRow
                key={item.salesid}
                number={index + 1}
                salesDate={item.salesdate}
                salesBrand={item.brand}
                salesProduct={item.productname}
                onProductClick={() => navigateToDashboard(index.productname)}
                salesQuantity={item.quantitysold}
                salesGross={item.grosssales}
                salesSKU={item.sku}
                salesClassification={item.classification}
              />
            ))
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};


export default Table;
