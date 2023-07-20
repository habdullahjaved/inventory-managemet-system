import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  Link,
} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import ProductListing from './pages/product/ProductListing';
import AddProductPage from './pages/product/AddProductPage';
import EditProduct from './pages/product/EditProduct';
import './App.css';
import './assets/sass/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/topbar/Topbar';
import ViewProduct from './pages/product/ViewProduct';
import NewItem from './components/item/NewItem';
import ListNewItem from './components/item/ListNewItem';
import EditNewItem from './components/item/EditINewtem';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import ListDepartment from './components/departments/ListDepartment';
import AddPerson from './components/purchasingperson/AddPerson';
import ListPerson from './components/purchasingperson/ListPerson';
import EditPerson from './components/purchasingperson/EditPerson';
import NewItemType from './components/itemtype/NewItemType';
import ListItemType from './components/itemtype/ListItemType';
import EditItemType from './components/itemtype/EditItemType';
import Authority from './components/authority/Authority';
import AddExpense from './components/expenses/AddExpense';
import ListExpense from './components/expenses/ListExpense';
import EditExpense from './components/expenses/EditExpense';
import ViewExpense from './components/expenses/ViewExpense';
import ExpenseType from './components/expensetype/ExpenseType';
import Home from './components/Home';
import logo from './assets/images/logopng.png';
import Location from './components/location/Location';
import EquipmentIssue from './components/itemissuance/EquipmentIssue';
import EquipmentReceiving from './components/equipmentreceiving/EquipmentReceiving';
import IssuedEquipment from './components/itemissuance/IssuedEquipment';
import EquipmentReceived from './components/equipmentreceiving/EquipmentReceived';
import EditIssued from './components/itemissuance/EditIssued';
import ViewIssued from './components/itemissuance/ViewIssued';
import EditReceived from './components/equipmentreceiving/EditReceived';
import ViewReceived from './components/equipmentreceiving/ViewReceived';
const App = () => {
  const [enterScreen, setEnterScreen] = useState(true);

  useEffect(() => {
    const storedEnterScreen = localStorage.getItem('enterScreen');
    if (storedEnterScreen !== null) {
      setEnterScreen(JSON.parse(storedEnterScreen));
    }
  }, []);

  const handleEnterSystem = () => {
    setEnterScreen(false);
    localStorage.setItem('enterScreen', JSON.stringify(false));
    // window.location.href('/items');
  };

  return (
    <>
      <HashRouter>
        {enterScreen ? (
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
        ) : (
          // <Routes>
          //   <Route
          //     path='/'
          //     element={
          //       <Home
          //         enterScreen={enterScreen}
          //         setEnterScreen={setEnterScreen}
          //       />
          //     }
          //   />
          // </Routes>
          //
          // <div className='enter-screen'>
          //   <h1>Welcome to the System</h1>
          //   <button onClick={handleEnterSystem}>Enter</button>
          // </div>
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
                <Route path='/addnewitem' element={<NewItem />} />
                <Route path='/listnewitem' element={<ListNewItem />} />
                <Route path='/editnewitem/:id' element={<EditNewItem />} />
                <Route path='/addNewDepartment' element={<AddDepartment />} />
                <Route path='/listnewDepartment' element={<ListDepartment />} />
                <Route
                  path='/editdepartment/:id'
                  element={<EditDepartment />}
                />
                <Route path='/addNewPerson' element={<AddPerson />} />
                <Route path='/listnewPerson' element={<ListPerson />} />
                <Route path='/editPerson/:id' element={<EditPerson />} />
                <Route path='/addNewType' element={<NewItemType />} />
                <Route path='/listnewType' element={<ListItemType />} />
                <Route path='/edititemtype/:id' element={<EditItemType />} />
                <Route path='/addexpense' element={<AddExpense />} />
                <Route path='/expenses' element={<ListExpense />} />
                <Route path='/editexpense/:id' element={<EditExpense />} />
                <Route path='/viewexpense/:id' element={<ViewExpense />} />
                <Route path='/authority' element={<Authority />} />
                <Route path='/expensetype' element={<ExpenseType />} />
                <Route path='/location' element={<Location />} />
                <Route path='/issueequipment' element={<EquipmentIssue />} />
                <Route path='/issuedequipments' element={<IssuedEquipment />} />
                <Route path='/editissued/:id' element={<EditIssued />} />
                <Route
                  path='/viewissuedequipments/:id'
                  element={<ViewIssued />}
                />

                <Route
                  path='/receiveequipment'
                  element={<EquipmentReceiving />}
                />
                <Route
                  path='/receivedequipment'
                  element={<EquipmentReceived />}
                />
                <Route
                  path='/editreceivedequipment/:id'
                  element={<EditReceived />}
                />
                <Route
                  path='/viewreceivedequipment/:id'
                  element={<ViewReceived />}
                />
              </Routes>
            </div>
          </div>
        )}
      </HashRouter>
    </>
  );
};

export default App;
