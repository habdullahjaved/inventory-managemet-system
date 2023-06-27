import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { API_LINK } from '../../commons/Constants';
const ListExpense = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const [items, setItems] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    // console.log('input', searchInput);
  };
  const getItems = async () => {
    try {
      await axios.get(`${API_LINK}expenses`).then((res) => {
        setItems(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const searchItems = (searchInput) => (item) =>
    item.ItemName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.ItemType.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.purchasing_person.Name.toLowerCase().includes(
      searchInput.toLowerCase()
    ) ||
    item.department.DepartmentName.toLowerCase().includes(
      searchInput.toLowerCase()
    );
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleView = (id) => {};
  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_LINK}expenses/${id}`).then((res) => {
        console.log(res.data);
        alert('Item deleted Succefully');
        getItems();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className='page-wrapper'>
      <h2 className='page-title ps-3'>Expenses</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <div className='card py-4 agent-void-card' data-aos='fade-up'>
              <div className='row'>
                <div className='col-md-6'>
                  <form
                    onSubmit={(e) => handleSearchSubmit(e)}
                    className='d-flex justify-content-start ps-3'
                  >
                    <label htmlFor='search' className='mt-2'>
                      Search:
                    </label>
                    <input
                      type='text'
                      name='searchbar'
                      placeholder='Search here...'
                      value={searchInput}
                      className='form-control w-50'
                      onChange={(e) => handleSearch(e)}
                    />
                  </form>
                </div>
                <div className='col-md-6'></div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <div className='table-responsive mt-2'>
                    <table className='table table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th className='text-wrap'>Name</th>
                          <th>Type</th>
                          <th>Description</th>
                          <th>MinuteSheet Number</th>
                          <th className='text-wrap'>Date of Purchase</th>
                          <th>Quantity</th>
                          <th className='text-wrap'>Rate Per Unit</th>
                          <th>Total Cost</th>
                          <th>Expense</th>
                          <th>Expense Type</th>

                          <th>Department</th>
                          <th>Purchasing Person</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items && items.length > 0 ? (
                          items?.filter(searchItems(searchInput))?.map(
                            ({
                              id,
                              ItemName,
                              ItemType,
                              Description,
                              Quantity,
                              DateOfPurchase,
                              RatePerUnit,
                              TotalCost,
                              minuteSheetNumber,
                              DepartmentID,
                              PurchasingPersonID,

                              purchasing_person,
                              department,
                              expense_type,
                              expense_ammount,
                            }) => (
                              <tr key={id}>
                                <td>{ItemName}</td>
                                <td>{ItemType}</td>
                                <td>{Description}</td>
                                <td>{minuteSheetNumber}</td>
                                <td>{DateOfPurchase}</td>
                                <td>{Quantity}</td>
                                <td>{RatePerUnit}</td>
                                <td>{TotalCost}</td>
                                <td>{expense_ammount}</td>
                                <td>{expense_type}</td>
                                <td>{department.DepartmentName}</td>
                                <td>{purchasing_person.Name}</td>

                                <td>
                                  <div className='btn-group' role='group'>
                                    <Link
                                      className='btn btn-primary btn-sm'
                                      to={`/viewexpense/${id}`}
                                    >
                                      View
                                    </Link>
                                    <Link
                                      to={`/editexpense/${id}`}
                                      className='btn btn-success btn-sm'
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      className='btn btn-danger btn-sm'
                                      onClick={() => handleDelete(id)}
                                    >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListExpense;
