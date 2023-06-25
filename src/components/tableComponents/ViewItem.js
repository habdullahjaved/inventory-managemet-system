// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// const ViewItem = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState({});

//   // const handlePrint = () => {
//   //   const tableContainer = document.getElementById('table-container');
//   //   if (tableContainer) {
//   //     const content = tableContainer.innerHTML;
//   //     const originalContents = document.body.innerHTML;
//   //     document.body.innerHTML = content;
//   //     window.print();
//   //     document.body.innerHTML = originalContents;
//   //   }
//   // };

//   const handlePrint = () => {
//     const tableContainer = document.getElementById('table-container');
//     if (tableContainer) {
//       const content = tableContainer.innerHTML;
//       const originalContents = document.body.innerHTML;
//       document.body.innerHTML = content;
//       window.print();
//       document.body.innerHTML = originalContents;
//     }
//   };

//   const getItembyid = async (id) => {
//     try {
//       await axios.get(`http://localhost:8000/api/items/${id}`).then((res) => {
//         setItem(res.data);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     //  const items = JSON.parse(localStorage.getItem('items'));
//     //  const item = items.find((item) => item.id === id);
//     //  setItem(item);
//     getItembyid(id);
//   }, []);

//   return (
//     <div>
//       <div id='table-container' className='print-container'>
//         <table className='table table-bordered report-table'>
//           <tr>
//             <th>Name</th>
//             <td>{item?.ItemName}</td>
//           </tr>
//           <tr>
//             <th>Item Type</th>
//             <td>{item.ItemType}</td>
//           </tr>
//           <tr>
//             <th>Description</th>
//             <td>{item?.Description}</td>
//           </tr>
//           <tr>
//             <th>Quantity</th>
//             <td>{item.Quantity}</td>
//           </tr>
//           <tr>
//             <th className='text-wrap'>Date of Purchase</th>
//             <td>{item?.DateOfPurchase}</td>
//           </tr>
//           <tr>
//             <th className='text-wrap'>Rate Per Unit</th>
//             <td>{item.RatePerUnit}</td>
//           </tr>
//           <tr>
//             <th>Total Cost</th>
//             <td>{item.TotalCost}</td>
//           </tr>
//           <tr>
//             <th>Department</th>
//             <td>{item?.department?.DepartmentName}</td>
//           </tr>
//           <tr>
//             <th>Purchasing Person</th>
//             <td>{item?.purchasing_person?.Name}</td>
//           </tr>
//           <tr>
//             <th>On Charge Of</th>
//             <td>{item?.authorityname}</td>
//           </tr>
//           <tr>
//             <th>MinuteSheet Number</th>
//             <td>{item?.minuteSheetNumber}</td>
//           </tr>
//         </table>
//       </div>

//       <div className='row'>
//         <div className='col-sm-12 d-flex justify-content-center'>
//           <button className='btn btn-primary mb-3' onClick={handlePrint}>
//             Print
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewItem;
// // How to make table printable

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { API_LINK } from '../../commons/Constants';

const ViewItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getItembyid = async (id) => {
    try {
      const response = await axios.get(`${API_LINK}items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };
  useEffect(() => {
    getItembyid(id);
  }, []);

  return (
    <div>
      <div ref={componentRef} className='print-container p-2'>
        {/* <div className='print-header ms-2'>
          <h2>Item Details</h2>
          <p>Printed on: {getCurrentDate()}</p>
        </div> */}
        <table className='table table-bordered report-table'>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{item?.ItemName}</td>
            </tr>
            <tr>
              <th>Item Type</th>
              <td>{item.ItemType}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{item?.Description}</td>
            </tr>
            <tr>
              <th>MinuteSheet Number</th>
              <td>{item?.minuteSheetNumber}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{item.Quantity}</td>
            </tr>
            <tr>
              <th className='text-wrap'>Date of Purchase</th>
              <td>{item?.DateOfPurchase}</td>
            </tr>
            <tr>
              <th className='text-wrap'>Rate Per Unit</th>
              <td>{item.RatePerUnit}</td>
            </tr>
            <tr>
              <th>Total Cost</th>
              <td>{item.TotalCost}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{item?.department?.DepartmentName}</td>
            </tr>
            <tr>
              <th>Purchasing Person</th>
              <td>{item?.purchasing_person?.Name}</td>
            </tr>
            <tr>
              <th>On Charge Of</th>
              <td>{item?.authorityname}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='row'>
        <div className='col-sm-12 d-flex justify-content-center'>
          <button className='btn btn-primary mb-3' onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
