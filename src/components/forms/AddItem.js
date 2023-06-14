import React, { useState } from 'react';
import SelectComponent from './../inputComponents/SelectComponent';
import InputComponent from './../inputComponents/InputComponent';
const AddItem = () => {
  const [item, setItem] = useState({
    itemName: '',
    itemType: '',
    description: '',
    quantity: 0,
    dateOfPurchase: '',
    ratePerUnit: 0,
    totalCost: 0,
    minuteSheetNumber: '',
    department: '',
    purchasingPerson: '',
    onChargeOf: '',
  });

  const {
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
  } = item;
  const items = [
    { id: 1, value: 'Chair', label: 'Chair' },
    { id: 2, value: 'Table', label: 'Table' },
    { id: 3, value: 'Pen', label: 'Pen' },
  ];
  const itemTypes = [
    { id: 1, value: 'Furniture', label: 'Furniture' },
    { id: 2, value: 'Stationary', label: 'Stationary' },
  ];

  const departments = [
    { id: 1, value: 'Mech', label: 'Mech' },
    { id: 2, value: 'ICT', label: 'ICT' },
  ];

  const purchasingPersons = [
    { id: 1, value: 'Kashif', label: 'Kashif' },
    { id: 2, value: 'Zohaib', label: 'Zohaib' },
  ];
  const Authorities = [
    { id: 1, value: 'GSO-II', label: 'GSO-II' },
    { id: 2, value: 'Admin Officer', label: 'Admin Officer' },
  ];
  const handleChange = (type, value) => {
    switch (type) {
      case 'itemName':
        setItem({ ...item, itemName: value });
        break;
      case 'itemType':
        setItem({ ...item, itemType: value });
        break;
      case 'description':
        setItem({ ...item, description: value });
        break;
      case 'quantity':
        setItem({ ...item, quantity: value });
        break;
      case 'dateOfPurchase':
        setItem({ ...item, dateOfPurchase: value });
        break;
      case 'ratePerUnit':
        setItem({ ...item, ratePerUnit: value });
        break;
      case 'totalCost':
        setItem({ ...item, totalCost: value });
        break;
      case 'minuteSheetNumber':
        setItem({ ...item, minuteSheetNumber: value });
        break;
      case 'department':
        setItem({ ...item, department: value });
        break;
      case 'purchasingPerson':
        setItem({ ...item, purchasingPerson: value });
        break;
      case 'onChargeOf':
        setItem({ ...item, onChargeOf: value });
        break;
      default:
        return;
    }
  };

  // const [validationErrors, setValidationErrors] = useState({});

  // const validate = () => {
  //   const requiredFields = [
  //     'itemName',
  //     'itemType',
  //     'dateOfPurchase',
  //     'department',
  //     'minuteSheetNumber',
  //     'purchasingPerson',
  //     'quantity',
  //     'ratePerUnit',
  //     'totalCost',
  //     'onChargeOf',
  //   ];
  //   const errors = {};

  //   requiredFields.forEach((field) => {
  //     if (item[field] === '') {
  //       errors[field] = `Please fill in the ${field} field`;
  //     }
  //   });

  //   setValidationErrors(errors);
  //   return errors;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item);
    const items = [];

    if (
      item.itemName !== '' &&
      item.itemType !== '' &&
      item.dateOfPurchase !== '' &&
      item.department !== '' &&
      item.minuteSheetNumber !== '' &&
      item.purchasingPerson !== '' &&
      item.quantity !== 0 &&
      item.ratePerUnit !== 0 &&
      item.totalCost !== 0 &&
      item.onChargeOf !== ''
    ) {
      const items = JSON.parse(localStorage.getItem('items')) || [];
      const newItem = {
        ...item,
        id: generateUniqueId(),
      };

      items.push(newItem);
      console.log(items);

      localStorage.setItem('items', JSON.stringify(items));
    }
    if (item.itemName === '')
      setItem({
        itemName: '',
        itemType: '',
        description: '',
        quantity: 0,
        dateOfPurchase: '',
        ratePerUnit: 0,
        totalCost: 0,
        minuteSheetNumber: '',
        department: '',
        purchasingPerson: '',
        onChargeOf: '',
      });
  };
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className='card p-3 ipnr-card'>
      <form className='search-flight' onSubmit={handleSubmit}>
        <div className='row mb-1 mt-3'>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='ctype'>Item</label>
            <SelectComponent
              options={items}
              name={'itemName'}
              value={itemName}
              id='item'
              handleChange={handleChange}
              label={'Select  Item'}
              required
            />
            {/* <span className='text-danger'>
              {itemName === '' && 'Name Is Required'}
            </span> */}
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='ctype'>Item Type</label>
            <SelectComponent
              options={itemTypes}
              name={'itemType'}
              value={itemType}
              id='itemtype'
              handleChange={handleChange}
              label={'Select  Item Type'}
            />
          </div>
          <div className='col-lg-6  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Description</label>
            <InputComponent
              type={'text'}
              name={'description'}
              value={description}
              placeholder={'Description'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Quantity</label>
            <InputComponent
              type={'number'}
              name={'quantity'}
              value={quantity}
              placeholder={'Quantity'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Date of Purchase</label>
            <InputComponent
              type={'date'}
              name={'dateOfPurchase'}
              value={dateOfPurchase}
              placeholder={'Date of Purchase'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Rate per Unit</label>
            <InputComponent
              type={'number'}
              name={'ratePerUnit'}
              value={ratePerUnit}
              placeholder={'Rate per Unit'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Total Cost</label>
            <InputComponent
              type={'number'}
              name={'totalCost'}
              value={totalCost}
              placeholder={'Total Cost'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='pax Name'>Minute Sheet Number</label>
            <InputComponent
              type={'number'}
              name={'minuteSheetNumber'}
              value={minuteSheetNumber}
              placeholder={'Minute Sheet Number'}
              className='form-control'
              handleChange={handleChange}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='ctype'>Department</label>
            <SelectComponent
              options={departments}
              name={'department'}
              value={department}
              id='department'
              handleChange={handleChange}
              label={'Select  Department'}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='ctype'>Purchasing Person</label>
            <SelectComponent
              options={purchasingPersons}
              name={'purchasingPerson'}
              value={purchasingPerson}
              id='pPerson'
              handleChange={handleChange}
              label={'Select  Purchasing Person'}
            />
          </div>
          <div className='col-lg-3  col-md-6 mt-1 mb-4 '>
            <label htmlFor='ctype'>On Charge of</label>
            <SelectComponent
              options={Authorities}
              name={'onChargeOf'}
              value={onChargeOf}
              id='OnChargeOf'
              handleChange={handleChange}
              label={'Select  On Charge of'}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 mx-auto'>
            <button type='submit' className='btn btn-primary btn-lg w-100 p-2'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
