import React, { useEffect, useState } from 'react';
import SelectComponent from './../inputComponents/SelectComponent';
import InputComponent from './../inputComponents/InputComponent';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { API_LINK } from '../../commons/Constants';
const EditReceived = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    ItemName: '',
    Quantity: 0,
    DateIn: '',
    TimeIn: '',
    ReceivingPerson: '',
    Location: '',
  });

  const { ItemName, Quantity, DateIn, TimeIn, ReceivingPerson, Location } =
    item;
  const [itemNames, setItemNames] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [purchasingPersons, setPurchasingPersons] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const getItemNames = async () => {
    try {
      await axios
        .get(`${API_LINK}itemnames`)
        .then((res) => setItemNames(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchasingPersons = async () => {
    const response = await axios.get(`${API_LINK}purchasingpersons`);
    setPurchasingPersons(response.data);
  };
  const getLocations = async () => {
    try {
      const response = await axios.get(`${API_LINK}locations`);
      setLocations(response.data);
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
  const getreceivedById = async (id) => {
    try {
      await axios
        .get(`${API_LINK}equipment-receiving/${id}`)
        .then((res) => setItem(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log(item);

    try {
      await axios
        .put(`${API_LINK}equipment-receiving/${id}`, item)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            navigate('/receivedequipment');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getreceivedById(id);
    getItemNames();
    getLocations();
    getPurchasingPersons();
    getAuthorities();
  }, []);
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Equipment Receiving</h2>
      <div className='card p-3 ipnr-card'>
        <form className='search-flight'>
          <div className='row mb-1 mt-3'>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Item</label>

              <select
                name='ItemName'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={ItemName}
              >
                <option value=''>Select Item Name</option>
                {itemNames.map((item) => (
                  <option value={item.ItemName}>{item.ItemName}</option>
                ))}
              </select>
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Quantity</label>
              <input
                type='number'
                name='Quantity'
                value={Quantity}
                placeholder='Quantity'
                className='form-control'
                onChange={handleChange}
              />
            </div>

            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Date In</label>
              <input
                type='date'
                name='DateIn'
                value={DateIn}
                placeholder='Date Out'
                className='form-control'
                onChange={handleChange}
              />
            </div>

            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='pax Name'>Time In</label>
              <input
                type='time'
                name='TimeIn'
                value={TimeIn}
                placeholder={'Time Out'}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Receiving Person</label>
              <select
                name='ReceivingPerson'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={ReceivingPerson}
              >
                <option value=''>Select Person</option>
                {purchasingPersons.map((item) => (
                  <option value={item.Name}>{item.Name}</option>
                ))}
              </select>
            </div>
            <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
              <label htmlFor='ctype'>Location</label>
              <select
                name='Location'
                id=''
                onChange={handleChange}
                className='form-select mt-1'
                value={Location}
              >
                <option value=''>Select Location</option>
                {locations?.map((item) => (
                  <option value={item.location}>{item.location}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3 mx-auto'>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={(e) => handleSubmit(e, item.id)}
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

export default EditReceived;
