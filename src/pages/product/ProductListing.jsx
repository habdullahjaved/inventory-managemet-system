import React from 'react';
import ItemListing from '../../components/tableComponents/ItemListing';

const ProductListing = () => {
  return (
    <div className='page-wrapper'>
      <h2 className='page-title'>Items Listing</h2>
      <ItemListing />
    </div>
  );
};

export default ProductListing;
