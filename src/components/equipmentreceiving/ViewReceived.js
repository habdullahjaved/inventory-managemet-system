import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { API_LINK } from '../../commons/Constants';

const ViewReceived = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getItembyid = async (id) => {
    try {
      const response = await axios.get(`${API_LINK}equipment-receiving/${id}`);
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

      <div ref={componentRef} className='print-container p-2'>
        {/* <div className='print-header ms-2'>
          <h2>Item Details</h2>
          <p>Printed on: {getCurrentDate()}</p>
        </div> */}
        <table className='table table-bordered report-table'>
          <tbody>
            <tr>
              <th>Equipment Name</th>
              <td>{item?.ItemName}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{item.Quantity}</td>
            </tr>
            <tr>
              <th>Date In</th>
              <td>{item?.DateIn}</td>
            </tr>
            <tr>
              <th>Time In</th>
              <td>{item?.TimeIn}</td>
            </tr>
            <tr>
              <th>ReceivingPerson</th>
              <td>{item?.ReceivingPerson}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{item?.Location}</td>
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

export default ViewReceived;
