import React, { useEffect } from 'react';
import logo from './../assets/images/logopng.png';
import { useNavigate } from 'react-router';
const Home = ({ enterScreen, setEnterScreen }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.removeItem('enterScreen');
    const storedEnterScreen = localStorage.getItem('enterScreen');
    if (storedEnterScreen !== null) {
      setEnterScreen(JSON.parse(storedEnterScreen));
    }
  }, []);

  const handleEnterSystem = () => {
    setEnterScreen(false);
    localStorage.setItem('enterScreen', JSON.stringify(false));
    navigate('/items');
  };
  return (
    <div className='row'>
      <div className='col-md-6 home-screen mx-auto'>
        <h1 className='welcm-title'>
          Welcome to Land Information and Management Sytem
        </h1>
        <img src={logo} alt='' className='logo-img' />
        <button className='btn btn-primary' onClick={handleEnterSystem}>
          Enter to Sytem
        </button>
      </div>
    </div>
  );
};

export default Home;
