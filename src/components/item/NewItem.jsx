import React, { useEffect, useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { API_LINK } from '../../commons/Constants';

const NewItem = () => {
  const [item, setItem] = useState({
    ItemName: '',
  });
  const { ItemName } = item;
  const [items, setItems] = useState([]);
  const [itemById, setItemById] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setItem({ ...item, ItemName: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_LINK}itemnames`, item).then((res) => {
        setItem('');
        console.log(res.data);
      });

      getItems();
    } catch (error) {
      console.log(error);
    }
    console.log(item);
  };

  const getItems = async () => {
    try {
      await axios.get(`${API_LINK}itemnames`).then((res) => setItems(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getItemById = async (id) => {
    try {
      const response = await axios.get(`${API_LINK}itemnames/${id}`);
      setItemById(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditChange = (type, value) => {
    setItemById({ ...itemById, ItemName: value });
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const data = {
      ItemName: itemById.ItemName,
    };
    console.log(data);
    console.log(id);
    try {
      await axios
        .put(`${API_LINK}itemnames/${id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => console.log(res.data));
      setShow(false);
      getItems();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (id) => {
    setShow(true);
    getItemById(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${API_LINK}itemnames/${id}`)
        .then((res) => alert('Item deleted Successfully'));
      getItems();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Item</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Item Name</label>
                  <InputComponent
                    type={'text'}
                    name={'ItemName'}
                    placeholder={'Item Name'}
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
          <div className='card table-card'>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Item Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((itemN, index) => (
                  <tr key={itemN.id}>
                    <td>{index + 1}</td>
                    <td>{itemN.ItemName}</td>
                    <td>
                      <div
                        className='btn-group d-flex justify-content-center'
                        role='group'
                      >
                        {/* <Link className='btn btn-primary btn-sm'>View</Link> */}
                        <Link
                          className='btn btn-success btn-sm'
                          onClick={() => handleEdit(itemN.id)}
                        >
                          Edit
                        </Link>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDelete(itemN.id)}
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
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight'>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Item Name</label>
                  <InputComponent
                    type={'text'}
                    name={'ItemName'}
                    placeholder={''}
                    value={itemById?.ItemName}
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
                    onClick={(e) => handleUpdate(e, itemById?.id)}
                  >
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
