import React, { useEffect, useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { API_LINK } from '../../commons/Constants';
const AddPerson = () => {
  const [pPerson, setPPerson] = useState({
    Name: '',
  });

  const { Name } = pPerson;
  const [purchasingPersons, setPurchasingPersons] = useState([]);
  const [purPersonById, setPurPersonById] = useState({});
  // Get From api
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setPPerson({ ...pPerson, Name: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_LINK}purchasingpersons`, pPerson).then((res) => {
        console.log(res.data);
      });
      getPurchasingPersons();
    } catch (error) {
      console.log(error);
    }
    console.log(pPerson);
  };

  const getPurchasingPersons = async () => {
    const response = await axios.get(`${API_LINK}purchasingpersons`);
    setPurchasingPersons(response.data);
  };
  const getPPersonById = async (id) => {
    try {
      const response = await axios.get(`${API_LINK}purchasingpersons/${id}`);
      setPurPersonById(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditChange = (type, value) => {
    setPurPersonById({ ...purPersonById, Name: value });
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const data = {
      Name: purPersonById.Name,
    };
    console.log(data);
    console.log(id);
    try {
      await axios
        .put(`${API_LINK}purchasingpersons/${id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => console.log(res.data));
      setShow(false);
      getPurchasingPersons();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${API_LINK}purchasingpersons/${id}`)
        .then((res) => alert('Person deleted Successfully'));
      getPurchasingPersons();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (id) => {
    setShow(true);
    getPPersonById(id);
  };
  useEffect(() => {
    getPurchasingPersons();
  }, []);

  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Person</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Person Name</label>
                  <InputComponent
                    type={'text'}
                    name={'Name'}
                    placeholder={'Person Name'}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-primary w-100'>
                    Add Person
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
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchasingPersons?.map((p_person, index) => (
                  <tr key={p_person.PurchasingPersonID}>
                    <td>{index + 1}</td>
                    <td>{p_person?.Name}</td>
                    <td>
                      <div
                        className='btn-group d-flex justify-content-center'
                        role='group'
                      >
                        {/* <Link className='btn btn-primary btn-sm'>View</Link> */}
                        <Link
                          className='btn btn-success btn-sm'
                          onClick={() =>
                            handleEdit(p_person.PurchasingPersonID)
                          }
                        >
                          Edit
                        </Link>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() =>
                            handleDelete(p_person.PurchasingPersonID)
                          }
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
          <Modal.Title>Edit Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight'>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Person Name</label>
                  <InputComponent
                    type={'text'}
                    name={'Name'}
                    placeholder={'Person Name'}
                    value={purPersonById?.Name}
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
                    onClick={(e) =>
                      handleUpdate(e, purPersonById.PurchasingPersonID)
                    }
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

export default AddPerson;
