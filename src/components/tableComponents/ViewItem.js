import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ViewItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    itemName: '',
    itemType: '',
    description: '',
    quantity: 0,
    dateOfPurchase: '',
    ratePerUnit: 0,
    totalCost: 0,
    minuteSheetNumber: '',
    department: '',
    purchasingPerson: '',
    onChargeOf: '',
  });

  const {
    itemName,
    itemType,
    description,
    quantity,
    dateOfPurchase,
    ratePerUnit,
    totalCost,
    minuteSheetNumber,
    department,
    purchasingPerson,
    onChargeOf,
  } = item;
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    const item = items.find((item) => item.id === id);
    setItem(item);
  }, []);
  // const handlePrint = () => {
  //   const tableContainer = document.getElementById('table-container');
  //   if (tableContainer) {
  //     const content = tableContainer.innerHTML;
  //     const originalContents = document.body.innerHTML;
  //     document.body.innerHTML = content;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //   }
  // };

  const handlePrint = () => {
    const tableContainer = document.getElementById('table-container');
    if (tableContainer) {
      const content = tableContainer.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = content;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };
  return (
    <div>
      <div id='table-container' className='print-container'>
        <table className='table table-bordered report-table'>
          <tr>
            <th>Name</th>
            <td>{itemName}</td>
          </tr>
          <tr>
            <th>Item Type</th>
            <td>{itemType}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{description}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{quantity}</td>
          </tr>
          <tr>
            <th className='text-wrap'>Date of Purchase</th>
            <td>{dateOfPurchase}</td>
          </tr>
          <tr>
            <th className='text-wrap'>Rate Per Unit</th>
            <td>{ratePerUnit}</td>
          </tr>
          <tr>
            <th>Total Cost</th>
            <td>{totalCost}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{department}</td>
          </tr>
          <tr>
            <th>Purchasing Person</th>
            <td>{purchasingPerson}</td>
          </tr>
          <tr>
            <th>On Charge Of</th>
            <td>{onChargeOf}</td>
          </tr>
          <tr>
            <th>MinuteSheet Number</th>
            <td>{minuteSheetNumber}</td>
          </tr>
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
// How to make table printable
