import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ViewExpense = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getItembyid = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/expenses/${id}`
      );
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
    <div className='page-wrapper'>
      <h2 className='page-title ms-2'>View</h2>
      <div>
        <div ref={componentRef} className='print-container p-2'>
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
                <th>Expense</th>
                <td>{item?.expense_ammount}</td>
              </tr>
              <tr>
                <th>Expense Type</th>
                <td>{item?.expense_type}</td>
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
    </div>
  );
};

export default ViewExpense;
