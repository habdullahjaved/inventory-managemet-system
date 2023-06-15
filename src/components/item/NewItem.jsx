import React, { useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const NewItem = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setItemName(value);
  };
  const handleSubmit = (e) => {};
  return (
    <div className='page-wrapper'>
      <h2 className='page-title'>Add Item</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Add New Item</label>
                  <InputComponent
                    type={'text'}
                    name={'itemName'}
                    placeholder={'Add New Item'}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-primary w-100'>
                    Add New Item{' '}
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
                  <th>Item Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pen</td>
                  <td>
                    <div
                      className='btn-group d-flex justify-content-center'
                      role='group'
                    >
                      {/* <Link className='btn btn-primary btn-sm'>View</Link> */}
                      <Link
                        className='btn btn-success btn-sm'
                        onClick={handleShow}
                      >
                        Edit
                      </Link>
                      <button className='btn btn-danger btn-sm'>Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Update Item</label>
                  <InputComponent
                    type={'text'}
                    name={'itemName'}
                    placeholder={''}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-success w-100'>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default NewItem;
