import React from 'react';
import { useNavigate } from 'react-router';

const Topbar = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem('enterScreen');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='top-bar row'>
      <div className='col-md-6'></div>
      <div className='col-md-6 text-end'>
        <button className='btn btn-secondary' onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Topbar;
