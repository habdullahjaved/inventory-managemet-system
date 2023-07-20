import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { API_LINK } from '../../commons/Constants';
const EquipmentReceived = () => {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sumOfTotalCost, setSumOfTotalCost] = useState(0);
  const [sumRatePerUnit, setSumRatePerUnit] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [hideActions, setHideActions] = useState(false); //hideactions while print

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
    fetchItems(1, perPage, e.target.value); // Fetch items with search query
  };

  const fetchItems = async (page, perPage, searchQuery = '') => {
    try {
      const response = await axios.get(`${API_LINK}equipment-receiving`, {
        params: {
          page,
          per_page: perPage,
          search: searchQuery,
        },
      });

      const {
        data,
        current_page,
        last_page,
        total,
        sum_rate_per_unit,
        sum_total_cost,
      } = response.data;

      setItems(data);
      setCurrentPage(current_page);
      setLastPage(last_page);
      setTotalItems(total);
      setSumOfTotalCost(sum_total_cost);
      setSumRatePerUnit(sum_rate_per_unit);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePerPageChange = (e) => {
    const selectedPerPage = parseInt(e.target.value);
    setPerPage(selectedPerPage);
    setCurrentPage(1); // Reset current page when number of items per page changes
    fetchItems(1, selectedPerPage, searchInput); // Fetch items with updated per page value
  };
  // ItemName: '',
  //  Quantity: 0,
  //  DateOut: '',
  //  TimeOut: '',
  //  ReceivingPerson: '',
  //  Location: '',
  const searchItems = (searchInput) => (item) =>
    item.ItemName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.ReceivingPerson.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.Location.toLowerCase().includes(searchInput.toLowerCase());
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    onBeforePrint: () => {
      setHideActions(true);
    },
    content: () => {
      const tableContent = componentRef.current.cloneNode(true);
      const actionsColumnHeaders = tableContent.querySelectorAll(
        'th[data-hide-print]'
      );
      const actionsColumnCells = tableContent.querySelectorAll(
        'td[data-hide-print]'
      );
      actionsColumnHeaders.forEach((header) => {
        header.style.display = 'none';
      });
      actionsColumnCells.forEach((cell) => {
        cell.style.display = 'none';
      });

      // Hide last child th and td elements
      const lastHeader = tableContent.querySelector('th:last-child');
      const lastCell = tableContent.querySelector('td:last-child');
      if (lastHeader) {
        lastHeader.style.display = 'none';
      }
      if (lastCell) {
        lastCell.style.display = 'none';
      }

      // Add space around the print container
      tableContent.style.padding = '1rem';
      tableContent.style.margin = '1rem';

      // Add the date in the print title
      const date = new Date().toLocaleDateString();
      const title = document.createElement('p');
      title.textContent = `Equipment Received - Printed on ${date}`;
      tableContent.insertBefore(title, tableContent.firstChild);

      // Apply a better print format
      const style = document.createElement('style');
      style.textContent = `
    @media print {
      body {
        background-color: #fff;
      }
      p {
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
      }
      th, td {
        border: 1px solid #000;
        padding: 0.5rem;
        text-align: left;
         white-space: wrap !important;
      }
      th:nth-last-child(1){
        display:none;
      }
       td:nth-last-child(1){
        display:none;
      }
    }
  `;
      tableContent.insertBefore(style, tableContent.firstChild);

      return tableContent;
    },
    onAfterPrint: () => {
      setHideActions(false);
    },
  });

  console.log(hideActions);
  const handleView = (id) => {};
  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_LINK}equipment-receiving/${id}`).then((res) => {
        console.log(res.data);
        alert('Item deleted Succefully');
        fetchItems(currentPage, perPage);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Aos.init();
    fetchItems(currentPage, perPage);
  }, []);

  console.log('perpage', perPage);
  return (
    <div className='page-wrapper '>
      <h2 className='page-title ms-2'>Received Equipment</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <div className='card py-4 agent-void-card' data-aos='fade-up'>
              <div className='row ms-3'>
                <div className='col-md-6'>
                  <form
                    onSubmit={(e) => handleSearchSubmit(e)}
                    className='d-flex justify-content-start'
                  >
                    <label htmlFor='search' className='mt-2'>
                      Search:
                    </label>
                    <input
                      type='text'
                      name='searchbar'
                      placeholder='Search here...'
                      value={searchInput}
                      className='form-control ms-2 w-50'
                      onChange={(e) => handleSearch(e)}
                    />
                  </form>
                </div>
                <div className='col-md-6'>
                  <div className='d-flex justify-content-start'>
                    <label htmlFor='search' className='mt-2'>
                      No of Entries:
                    </label>
                    <select
                      name='perPage'
                      onChange={handlePerPageChange}
                      className='form-select ms-2 w-50'
                      value={perPage}
                    >
                      <option value='1'>1</option>
                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='15'>15</option>
                      <option value='20'>20</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <div className='table-responsive mt-2 '>
                    <div ref={componentRef} className='print-table-container'>
                      <table className='table table-bordered table-striped'>
                        <thead>
                          <tr>
                            <th className='text-wrap'>Name</th>
                            <th>Quantity</th>
                            <th>Date In</th>
                            <th>Time In</th>
                            <th className='text-wrap'>Receiving Person</th>
                            <th>Location</th>

                            <th
                              data-hide-print
                              className={hideActions ? 'print-hide' : ''}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items && items.length > 0 ? (
                            items
                              ?.filter(searchItems(searchInput))
                              ?.map(
                                ({
                                  id,
                                  ItemName,
                                  Quantity,
                                  DateIn,
                                  TimeIn,
                                  ReceivingPerson,
                                  Location,
                                }) => (
                                  <tr key={id}>
                                    <td>{ItemName}</td>

                                    <td>{Quantity}</td>
                                    <td>{DateIn}</td>
                                    <td>{TimeIn}</td>
                                    <td>{ReceivingPerson}</td>
                                    <td>{Location}</td>
                                    {!hideActions && (
                                      <td
                                        data-hide-print
                                        className={
                                          hideActions ? 'print-hide' : ''
                                        }
                                      >
                                        <div className='btn-group' role='group'>
                                          <Link
                                            className='btn btn-primary btn-sm'
                                            to={`/viewreceivedequipment/${id}`}
                                          >
                                            View
                                          </Link>
                                          <Link
                                            to={`/editreceivedequipment/${id}`}
                                            className='btn btn-success btn-sm'
                                          >
                                            Edit
                                          </Link>
                                          <button
                                            className='btn btn-danger btn-sm'
                                            onClick={() => handleDelete(id)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                )
                              )
                          ) : (
                            <tr>
                              <td colSpan='12'>No items found.</td>
                            </tr>
                          )}
                          {/* <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{totalItems}</td>
                            <td></td>
                            <td>{sumOfTotalCost}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {!hideActions && <td></td>}
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mx-auto'>
                <div className='col-md-6'>
                  <div className='pagination'>
                    {currentPage > 1 && (
                      <button
                        className='next-button me-1 '
                        onClick={() =>
                          fetchItems(currentPage - 1, perPage, searchInput)
                        }
                      >
                        Previous
                      </button>
                    )}
                    {currentPage < lastPage && (
                      <button
                        className='next-button ms-1'
                        onClick={() =>
                          fetchItems(currentPage + 1, perPage, searchInput)
                        }
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mx-auto mt-2'>
              <div className='col-md-6'>
                <button className='btn btn-success' onClick={handlePrint}>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentReceived;
