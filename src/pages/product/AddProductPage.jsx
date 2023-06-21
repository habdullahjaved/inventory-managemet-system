import React from 'react';
import AddItem from '../../components/forms/AddItem';

const AddProductPage = () => {
  return (
    <div className='page-wrapper p-2'>
      <h2 className='page-title'>Add Item</h2>
      <AddItem />
    </div>
  );
};

export default AddProductPage;
