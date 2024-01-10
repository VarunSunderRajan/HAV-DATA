import React from 'react';
import More from '../../../assets/svg/More';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const styles = {
  tableRow: `text-black border-b border-solid border-gray-200 text-[0.93rem] p-4`, // Add p-4 for padding
  hoverEffect: `hover:bg-gray-100`,
};


const TableRow = ({
  number,
  salesDate,
  salesBrand,
  salesProduct,
  salesQuantity,
  salesGross,
  salesSKU,
  salesClassification,
}) => {
  const formattedDate = new Date(salesDate).toLocaleDateString();


  const navigate = useNavigate(); // Define navigate

  const navigateToDashboard = (path) => {
    navigate(`/dashboard/${encodeURIComponent(path)}`);
  };




  return (
    <tbody className={`${styles.tableRow} ${styles.hoverEffect}`}>
      <tr className='cursor-pointer'>

        <td className='p-10'> 
          <p className='opacity-40'>{number}</p>
        </td>

        <td className='p-10'> 
          <p>{formattedDate}</p>
        </td>
        <td className='p-10'> 
          <p>{salesBrand}</p>
        </td>
        <td className='p-10'>
        <Link to={`/dashboard/${encodeURIComponent(salesProduct)}`}>
          <p>{salesProduct}</p>
        </Link> 
        </td>
        <td className='p-10'> 
          <p>{salesQuantity}</p>
        </td>
        <td className='p-10'> 
          <p>${salesGross}</p>
        </td>
        <td className='p-10'> 
          <p>{salesClassification}</p>
        </td>
        <td className='p-10'> 
          <p>{salesSKU}</p>
        </td>
        {/* <td className='p-10'> 
          <More />
        </td> */}
      </tr>
    </tbody>
  );
};

export default TableRow;
