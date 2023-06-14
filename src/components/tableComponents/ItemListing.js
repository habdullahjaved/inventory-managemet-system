import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
const ItemListing = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const items = JSON.parse(localStorage.getItem('items')) || [];
  console.log(items);

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    // console.log('input', searchInput);
  };

  const searchItems = (searchInput) => (item) =>
    item.itemName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.itemType.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.purchasingPerson.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.department.toLowerCase().includes(searchInput.toLowerCase());
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleView = (id) => {};
  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  return (
    <div className='card py-4 agent-void-card' data-aos='fade-up'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <form
              onSubmit={(e) => handleSearchSubmit(e)}
              className='d-flex justify-content-start'
            >
              <label htmlFor='search' className='mt-2'>
                Search:
              </label>
              <input
                type='text'
                name='searchbar'
                placeholder='Search here...'
                value={searchInput}
                className='form-control ms-2 w-50'
                onChange={(e) => handleSearch(e)}
              />
            </form>
          </div>
          <div className='col-md-6'></div>
        </div>
      </div>

      <div className='table-responsive mt-2'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th className='text-wrap'>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>MinuteSheet Number</th>
              <th>Quantity</th>
              <th className='text-wrap'>Date of Purchase</th>
              <th className='text-wrap'>Rate Per Unit</th>
              <th>Total Cost</th>
              <th>Department</th>
              <th>Purchasing Person</th>
              <th>On Charge Of</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items
                .filter(searchItems(searchInput))
                .map(
                  ({
                    id,
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
                  }) => (
                    <tr key={itemName}>
                      <td>{itemName}</td>
                      <td>{itemType}</td>
                      <td>{description}</td>
                      <td>{minuteSheetNumber}</td>
                      <td>{quantity}</td>
                      <td>{dateOfPurchase}</td>
                      <td>{ratePerUnit}</td>
                      <td>{totalCost}</td>
                      <td>{department}</td>
                      <td>{purchasingPerson}</td>
                      <td>{onChargeOf}</td>
                      <td>
                        <div className='btn-group' role='group'>
                          <Link
                            className='btn btn-primary btn-sm'
                            to={`/viewitem/${id}`}
                          >
                            View
                          </Link>
                          <Link
                            to={`/edititem/${id}`}
                            className='btn btn-success btn-sm'
                          >
                            Edit
                          </Link>
                          <button className='btn btn-danger btn-sm'>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
            ) : (
              <tr>
                <td colSpan='12'>No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemListing;
