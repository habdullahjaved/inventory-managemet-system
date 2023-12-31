import React, { useEffect, useState } from 'react';
import SelectComponent from './../inputComponents/SelectComponent';
import InputComponent from './../inputComponents/InputComponent';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { API_LINK } from '../../commons/Constants';
const EditExpense = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    ItemName: '',
    ItemType: '',
    Description: '',
    Quantity: 0,
    DateOfPurchase: '',
    RatePerUnit: 0,
    TotalCost: 0,
    minuteSheetNumber: '',
    DepartmentID: '',
    PurchasingPersonID: '',
    authorityname: '',
    expense_type: '',
    expense_ammount: '',
  });

  const {
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
    authorityname,
    expense_type,
    expense_ammount,
  } = item;
  const [itemNames, setItemNames] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [purchasingPersons, setPurchasingPersons] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [itemById, setItemById] = useState({
    ItemName: '',
    ItemType: '',
    Description: '',
    Quantity: 0,
    DateOfPurchase: '',
    RatePerUnit: 0,
    TotalCost: 0,
    minuteSheetNumber: '',
    DepartmentID: '',
    PurchasingPersonID: '',
    authorityname: '',
    expense_type: '',
    expense_ammount: '',
    department: {},
    purchasing_person: {},
  });
  const navigate = useNavigate();
  const [expenses, setexpenses] = useState([]);
  const getItemNames = async () => {
    try {
      await axios
        .get(`${API_LINK}itemnames`)
        .then((res) => setItemNames(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getItemTypes = async () => {
    try {
      await axios
        .get(`${API_LINK}itemtypes`)
        .then((res) => setItemTypes(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getPurchasingPersons = async () => {
    const response = await axios.get(`${API_LINK}purchasingpersons`);
    setPurchasingPersons(response.data);
  };
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${API_LINK}departments`);
      setDepartments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAuthorities = async () => {
    try {
      await axios
        .get(`${API_LINK}authorities`)
        .then((res) => setAuthorities(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    // setItemById({ ...itemById, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    if (name === 'Quantity' || name === 'RatePerUnit') {
      const updatedTotalCost =
        name === 'Quantity'
          ? value * itemById.RatePerUnit
          : value * itemById.Quantity;
      setItemById({ ...itemById, [name]: value, TotalCost: updatedTotalCost });
    } else {
      setItemById({ ...itemById, [name]: value });
    }
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log(item);
    try {
      await axios.put(`${API_LINK}expenses/${id}`, itemById).then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate('/expenses');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getExpenses = async () => {
    try {
      await axios
        .get(`${API_LINK}expensetypes`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => setexpenses(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getItembyid = async (id) => {
    try {
      await axios.get(`${API_LINK}expenses/${id}`).then((res) => {
        setItemById(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemNames();
    getItemTypes();
    getDepartments();
    getPurchasingPersons();
    getAuthorities();
    getExpenses();
    getItembyid(id);
  }, []);
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Expense</h2>
      <div className='card p-3 ipnr-card'>
        <form className='search-flight'>
          <div className='row mb-1 mt-3'>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Expense</label>
              <input
                type='text'
                name='expense_ammount'
                placeholder='Expense'
                value={itemById?.expense_ammount}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Expense Type</label>
              <select
                name='expense_type'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={itemById?.expense_type}
              >
                <option value=''>Select Expense Type</option>
                {expenses?.map((item) => (
                  <option value={item.expense_type}>{item.expense_type}</option>
                ))}
              </select>
            </div>
            <div className='col-lg-6  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Description</label>
              <input
                type='text'
                name='Description'
                value={itemById?.Description}
                placeholder='Description'
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Minute Sheet Number</label>
              <input
                type='text'
                name='minuteSheetNumber'
                value={itemById?.minuteSheetNumber}
                placeholder='Minute Sheet Number'
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Date of Purchase</label>
              <input
                type='date'
                name='DateOfPurchase'
                value={itemById?.DateOfPurchase}
                placeholder='Date of Purchase'
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Quantity</label>
              <input
                type='number'
                name='Quantity'
                value={itemById?.Quantity}
                placeholder='Quantity'
                className='form-control'
                onChange={handleChange}
              />
            </div>

            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Rate per Unit</label>
              <input
                type='number'
                name='RatePerUnit'
                value={itemById?.RatePerUnit}
                placeholder={'Rate per Unit'}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Total Cost</label>
              <input
                type='number'
                name='TotalCost'
                value={itemById?.TotalCost}
                placeholder='Total Cost'
                className='form-control'
                onChange={handleChange}
              />
            </div>

            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Department</label>
              <select
                name='DepartmentID'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={itemById?.DepartmentID}
              >
                <option value=''>Select Department</option>
                {departments.map((item) => (
                  <option value={item.DepartmentID}>
                    {item.DepartmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Purchasing Person</label>
              <select
                name='PurchasingPersonID'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={itemById?.PurchasingPersonID}
              >
                <option value=''>Select Person</option>
                {purchasingPersons.map((item) => (
                  <option value={item.PurchasingPersonID}>{item.Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3 mx-auto'>
              <button
                type='submit'
                className='btn btn-primary btn-lg w-100 p-2'
                onClick={(e) => handleSubmit(e, itemById?.id)}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
