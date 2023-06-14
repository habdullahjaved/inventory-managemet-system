import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import ProductListing from './pages/product/ProductListing';
import AddProductPage from './pages/product/AddProductPage';
import EditProduct from './pages/product/EditProduct';
import './App.css';
import './assets/sass/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/topbar/Topbar';
import ViewProduct from './pages/product/ViewProduct';
function App() {
  return (
    <>
      <Router>
        <div className='container-wrapper'>
          <div className='sidebar-wrapper'>
            <Sidebar />
          </div>
          <div className='content-wrapper'>
            <Topbar />
            <Routes>
              <Route path='/' element={<ProductListing />} />
              <Route path='/addItem' element={<AddProductPage />} />
              <Route path='/edititem/:id' element={<EditProduct />} />
              <Route path='/viewitem/:id' element={<ViewProduct />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
