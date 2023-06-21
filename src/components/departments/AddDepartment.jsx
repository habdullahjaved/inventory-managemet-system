import React, { useEffect, useState } from 'react';
import InputComponent from '../inputComponents/InputComponent';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const AddDepartment = () => {
  const [Department, setDepartment] = useState({
    DepartmentName: '',
  });
  // Get From api
  const [Departments, setDepartments] = useState([]);
  const [DepartmentById, setDepartmentById] = useState({
    DepartmentName: '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (type, value) => {
    setDepartment({ ...Department, DepartmentName: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:8000/api/departments', Department)
        .then((res) => console.log(res.data));
      setDepartment();
    } catch (err) {
      console.log(err);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/departments');
      setDepartments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getDepartmentById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/departments/${id}`
      );
      setDepartmentById(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditChange = (type, value) => {
    setDepartmentById({ ...DepartmentById, DepartmentName: value });
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    console.log(DepartmentById);
    const data = {
      DepartmentName: DepartmentById.DepartmentName,
    };
    console.log(data);
    console.log(id);
    try {
      await axios
        .put(`http://localhost:8000/api/departments/${id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => console.log(res.data));
      setShow(false);
      getDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/departments/${id}`)
        .then((res) => alert('Department deleted Successfully'));
      getDepartments();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);

  const handleEdit = (id) => {
    setShow(true);
    getDepartmentById(id);
  };
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Department</h2>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight' onSubmit={handleSubmit}>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Department Name</label>
                  <InputComponent
                    type={'text'}
                    name={'DepartmentName'}
                    placeholder={'Department Name'}
                    className='form-control'
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <button type='submit' className='btn btn-primary w-100'>
                    Add Department
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='col-sm-12 col-md-12  col-lg-6 card-margin-top'>
          <div className='card table-card'>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Departments?.map((deprtment, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{deprtment.DepartmentName}</td>
                    <td>
                      <div
                        className='btn-group d-flex justify-content-center'
                        role='group'
                      >
                        {/* <Link className='btn btn-primary btn-sm'>View</Link> */}
                        <button
                          className='btn btn-success btn-sm'
                          onClick={() => handleEdit(deprtment.DepartmentID)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDelete(deprtment.DepartmentID)}
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
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='card p-3 ipnr-card'>
            <form className='search-flight'>
              <div className='row mb-1 mt-3'>
                <div className='col-sm-12 col-md-12 col-lg-12 mt-1 mb-4 '>
                  <label htmlFor='ctype'>Update Department</label>
                  <InputComponent
                    type={'text'}
                    name={'DepartmentName'}
                    value={DepartmentById?.DepartmentName}
                    placeholder={'Department Name'}
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
                      handleUpdate(e, DepartmentById.DepartmentID)
                    }
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

export default AddDepartment;
