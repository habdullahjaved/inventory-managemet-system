import React, { useEffect, useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { API_LINK } from '../../commons/Constants';

const Location = () => {
  const [itemType, setItemType] = useState({
    location: '',
  });
  const { ItemType } = itemType;
  const [itemTypes, setItemTypes] = useState([]);
  const [ItemById, setItemById] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setItemType({ ...itemType, location: value });
  };
  const handleEditChange = (type, value) => {
    setItemById({ ...ItemById, location: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_LINK}locations`, itemType).then((res) => {
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
        .delete(`${API_LINK}locations/${id}`)
        .then((res) => alert('Item Type deleted Successfully'));
      getItemTypes();
    } catch (err) {
      console.log(err);
    }
  };
  const getItemTypes = async () => {
    try {
      await axios
        .get(`${API_LINK}locations`)
        .then((res) => setItemTypes(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getItemTypeById = async (id) => {
    try {
      const response = await axios.get(`${API_LINK}locations/${id}`);
      setItemById(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const data = {
      location: ItemById.location,
    };
    console.log(data);
    console.log(id);
    try {
      await axios
        .put(`${API_LINK}locations/${id}`, data, {
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
      <h2 className='page-title'>Add Location</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Location</label>
                  <InputComponent
                    type={'text'}
                    name={'location'}
                    placeholder={'Location'}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-primary w-100'>
                    Add Location
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
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemTypes?.map((itmType, index) => (
                  <tr key={itmType.id}>
                    <td>{index + 1}</td>
                    <td>{itmType.location}</td>
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
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight'>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Title</label>
                  <InputComponent
                    type={'text'}
                    name={'location'}
                    placeholder={''}
                    value={ItemById?.location}
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

export default Location;
