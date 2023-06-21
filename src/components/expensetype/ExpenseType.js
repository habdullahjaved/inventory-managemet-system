import React, { useEffect, useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ExpenseType = () => {
  const [itemType, setItemType] = useState({
    expense_type: '',
  });
  const { expense_type } = itemType;
  const [itemTypes, setItemTypes] = useState([]);
  const [ItemById, setItemById] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setItemType({ ...itemType, expense_type: value });
  };
  const handleEditChange = (type, value) => {
    setItemById({ ...ItemById, expense_type: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:8000/api/expensetypes', itemType)
        .then((res) => {
          console.log(res.data);
        });

      getItemTypes();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/expensetypes/${id}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => alert('Item Type deleted Successfully'));
      getItemTypes();
    } catch (err) {
      console.log(err);
    }
  };
  const getItemTypes = async () => {
    try {
      await axios
        .get('http://localhost:8000/api/expensetypes', {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => setItemTypes(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getItemTypeById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/expensetypes/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setItemById(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const data = {
      expense_type: ItemById.expense_type,
    };
    console.log(data);
    console.log(id);
    try {
      await axios
        .put(`http://localhost:8000/api/expensetypes/${id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => console.log(res.data));
      setShow(false);
      getItemTypes();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (id) => {
    setShow(true);
    getItemTypeById(id);
  };
  useEffect(() => {
    getItemTypes();
  }, []);
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Item Type</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Expense Type</label>
                  <InputComponent
                    type={'text'}
                    name={'expense_type'}
                    placeholder={' Expense Type'}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-primary w-100'>
                    Add Expense Type
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card py-2 px-1'>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Item Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemTypes?.map((itmType, index) => (
                  <tr key={itmType.id}>
                    <td>{index + 1}</td>
                    <td>{itmType.expense_type}</td>
                    <td>
                      <div
                        className='btn-group d-flex justify-content-center'
                        role='group'
                      >
                        <button
                          className='btn btn-success btn-sm'
                          onClick={() => handleEdit(itmType.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDelete(itmType.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight'>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Title</label>
                  <InputComponent
                    type={'text'}
                    name={'expense_type'}
                    placeholder={''}
                    value={ItemById?.expense_type}
                    className='form-control'
                    handleChange={handleEditChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button
                    type='submit'
                    className='btn btn-success w-100'
                    onClick={(e) => handleUpdate(e, ItemById.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpenseType;