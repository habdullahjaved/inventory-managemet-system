import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';
import logo from './../../assets/images/logopng.png';
const Sidebar = () => {
  const [menus, setMenus] = useState([
    {
      id: 1,
      title: 'Items',
      icon: <ChevronRight />,
      isOpen: false,
      submenu: [
        { id: 1, title: 'Add Item', link: '/addItem' },
        { id: 2, title: 'List Item', link: '/' },
      ],
    },
    {
      id: 2,
      title: 'Expense',
      icon: <ChevronRight />,
      isOpen: false,
      submenu: [
        { id: 1, title: 'Add Expense', link: '/addexpense' },
        { id: 2, title: 'Expenses', link: '/expenses' },
      ],
    },
    {
      id: 3,
      title: 'Equipment Issuance',
      icon: <ChevronRight />,
      isOpen: false,
      submenu: [
        { id: 1, title: 'Issue Equipment', link: '/issueequipment' },
        { id: 2, title: 'Issued Equipments ', link: '/issuedequipments' },
      ],
    },
    {
      id: 4,
      title: 'Equipment Receiving',
      icon: <ChevronRight />,
      isOpen: false,
      submenu: [
        { id: 1, title: 'Equipment Receiving', link: '/receiveequipment' },
        { id: 2, title: 'Received Equipments', link: '/receivedequipment' },
      ],
    },
    {
      id: 5,
      title: 'New Item',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/addNewItem',
      submenu: [
        // { id: 1, title: 'Add New Item', link: '/addNewItem' },
        // { id: 2, title: 'List New Item', link: '/listnewItem' },
      ],
    },
    {
      id: 6,
      title: 'New Department',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/addNewDepartment',
      submenu: [
        // { id: 1, title: 'Add New Department', link: '/addNewDepartment' },
        // { id: 2, title: 'List New Department', link: '/listnewDepartment' },
      ],
    },
    {
      id: 7,
      title: 'New Person',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/addNewPerson',
      submenu: [
        // { id: 1, title: 'Add New Person', link: '/addNewPerson' },
        // { id: 2, title: 'List New Person', link: '/listnewPerson' },
      ],
    },
    {
      id: 8,
      title: 'New Item Type',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/addNewType',
      submenu: [
        // { id: 1, title: 'Add New Type', link: '/addNewType' },
        // { id: 2, title: 'List New Type', link: '/listnewType' },
      ],
    },
    {
      id: 9,
      title: 'Authority',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/authority',
      submenu: [],
    },
    {
      id: 10,
      title: 'Expense Type',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/expensetype',
      submenu: [],
    },
    {
      id: 11,
      title: 'Locations',
      icon: <ChevronRight />,
      isOpen: false,
      link: '/location',
      submenu: [],
    },
  ]);
  const handleOpenMenu = (id) => {
    const updatedMenus = menus.map((menu) => {
      if (menu.id === id) {
        return { ...menu, isOpen: !menu.isOpen };
      }
      return { ...menu, isOpen: false };
    });
    setMenus(updatedMenus);
  };
  return (
    <div>
      <div className='sidebar'>
        {/* <div className='logo'>
          <img src={logo} alt='' />
        </div> */}
        <h2 className='logo '>LIMS</h2>
      </div>
      <div className='sidebar-nav'>
        <nav>
          <ul>
            {menus?.map((menu) => (
              <li className='nav-item'>
                <Link
                  className={
                    menu.isOpen ? 'nav-link nav-link-active' : 'nav-link'
                  }
                  to={menu.link}
                  onClick={() => handleOpenMenu(menu.id)}
                >
                  <span className='d-flex justify-content-between'>
                    <span>{menu.title}</span>
                    {!menu.isOpen ? (
                      <span>{menu.icon}</span>
                    ) : (
                      <span>
                        <ChevronDown />
                      </span>
                    )}
                  </span>
                </Link>
                {menu.isOpen && menu?.submenu?.length > 0 && (
                  <div className='drop-down'>
                    {menu?.submenu.length > 0
                      ? menu.submenu?.map((item) => (
                          <li className='submenue-list-item'>
                            <Link className='submenue-link' to={item.link}>
                              {item.title}
                            </Link>
                          </li>
                        ))
                      : ''}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
