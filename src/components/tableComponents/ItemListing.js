import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { API_LINK } from '../../commons/Constants';
const ItemListing = () => {
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
      const response = await axios.get(`${API_LINK}items`, {
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
  const searchItems = (searchInput) => (item) =>
    item.ItemName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.ItemType.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.purchasing_person.Name.toLowerCase().includes(
      searchInput.toLowerCase()
    ) ||
    item.department.DepartmentName.toLowerCase().includes(
      searchInput.toLowerCase()
    );
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  const componentRef = useRef(null);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () => {
      setHideActions(true);
    },
    onAfterPrint: () => {
      setHideActions(false);
    },
  });
  const handleView = (id) => {};
  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_LINK}items/${id}`).then((res) => {
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
                          <th>Type</th>
                          <th>Description</th>
                          <th>MinuteSheet Number</th>
                          <th className='text-wrap'>Date of Purchase</th>
                          <th>Quantity</th>
                          <th className='text-wrap'>Rate Per Unit</th>
                          <th>Total Cost</th>
                          <th>Department</th>
                          <th>Purchasing Person</th>
                          <th>On Charge Of</th>
                          {!hideActions && <th>Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {items && items.length > 0 ? (
                          items
                            ?.filter(searchItems(searchInput))
                            ?.map(
                              ({
                                ItemID,
                                ItemName,
                                ItemType,
                                Description,
                                Quantity,
                                DateOfPurchase,
                                RatePerUnit,
                                TotalCost,
                                minuteSheetNumber,
                                DepartmentID,
                                PurchasingPersonID,
                                authorityname,
                                purchasing_person,
                                department,
                              }) => (
                                <>
                                  <tr key={ItemID}>
                                    <td>{ItemName}</td>
                                    <td>{ItemType}</td>
                                    <td>{Description}</td>
                                    <td>{minuteSheetNumber}</td>
                                    <td>{DateOfPurchase}</td>
                                    <td>{Quantity}</td>
                                    <td>{RatePerUnit}</td>
                                    <td>{TotalCost}</td>
                                    <td>{department.DepartmentName}</td>
                                    <td>{purchasing_person.Name}</td>
                                    <td>{authorityname}</td>
                                    {!hideActions && (
                                      <td>
                                        <div className='btn-group' role='group'>
                                          <Link
                                            className='btn btn-primary btn-sm'
                                            to={`/viewitem/${ItemID}`}
                                          >
                                            View
                                          </Link>
                                          <Link
                                            to={`/edititem/${ItemID}`}
                                            className='btn btn-success btn-sm'
                                          >
                                            Edit
                                          </Link>
                                          <button
                                            className='btn btn-danger btn-sm'
                                            onClick={() => handleDelete(ItemID)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                </>
                              )
                            )
                        ) : (
                          <tr>
                            <td colSpan='12'>No items found.</td>
                          </tr>
                        )}
                        <tr>
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
                          <td></td>
                        </tr>
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
          <div className='row mx-auto'>
            <div className='col-md-6'>
              <button className='btn btn-success' onClick={handlePrint}>
                Print Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemListing;
