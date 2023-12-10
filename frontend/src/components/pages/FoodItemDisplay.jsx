import React, { useState, useEffect } from "react";
import useFoodItem from "../../hooks/useFoodItem";
import "./FoodItemDisplay.css";
import Layout from "../common/Layout";
import {
  EditOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

function FoodItemDisplay() {
  // State for tracking edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State for tracking selected items for editing
  const [selectedItems, setSelectedItems] = useState({});
  // Constants for items per page in pagination
  const itemsPerPage = 10;

  // Custom hook for fetching food items
  const { foodItem, getFoodItem } = useFoodItem();

  // Fetch food items on component mount
  useEffect(() => {
    getFoodItem();
  }, [getFoodItem]);

  // Handler for page change in pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(foodItem.length / itemsPerPage);

  // Handler for checkbox change in edit mode
  const handleCheckboxChange = (itemid) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemid]: !prevSelectedItems[itemid],
    }));
  };

  // Toggle edit mode and clear selections on exit
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setSelectedItems({});
    }
  };

  // Handle edit action for selected items
  const handleEditSelected = () => {
    const itemsToEdit = foodItem.filter((item) => selectedItems[item.itemid]);
    // Implement the logic to edit the selected items
  };

  // Mock data for statistics
  const categories = 14;
  const totalItems = 868;
  const usedItems = 672;
  const highRisk = 12;
  const expired = 2;

  return (
    <Layout>
      {/* Section for inventory statistics */}
      <h1 className="inventory-title">Inventory</h1>
      <div className="inventory-stats">
        {/* Stat boxes for different inventory metrics */}
        <div className="stat-box categories">
          <h3>Categories</h3>
          <span>{categories}</span>
          <div className="subtext">Last 7 days</div>
        </div>
        <div className="stat-box total-items">
          <h3>Total Items</h3>
          <span>{totalItems}</span>
          <div className="subtext">Last 7 days</div>
        </div>
        <div className="stat-box used-items">
          <h3>Used Items</h3>
          <span>{usedItems}</span>
        </div>
        <div className="stat-box high-risk">
          <h3>High Risk of Waste</h3>
          <span>{highRisk}</span>
          <div className="subtext">{expired} Expired</div>
        </div>
      </div>

      {/* Section for food items table */}
      <div className="food-items-section">
        <div className="section-header">
          <h2>Food Items</h2>
          <div className="header-buttons">
            <button className="edit-button" onClick={toggleEdit}>
              {isEditing ? <EditOutlined /> : <EditOutlined />} Edit
            </button>
            <button className="add-item-button">
              <PlusOutlined /> Add Item
            </button>
            <button className="filters-button">
              <FilterOutlined /> Filters
            </button>
            <button className="download-button">
              <DownloadOutlined /> Download all
            </button>
          </div>
        </div>
        <table className="food-items-table">
          <thead>
            <tr>
              {/* Conditional rendering for edit mode */}
              {isEditing && <th className="checkbox-header"></th>}
              {/* Table headers */}
              <th>Items</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Used</th>
              <th>Expiry Date</th>
              <th>Expire Time</th>
              <th className={`checkbox-header ${!isEditing && "hidden"}`}></th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping food items to table rows */}
            {foodItem
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item) => (
                <tr key={item.itemid}>
                  {isEditing && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems[item.itemid] || false}
                        onChange={() => handleCheckboxChange(item.itemid)}
                      />
                    </td>
                  )}
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.batchnumber}</td>
                  <td>{item.expirydate}</td>
                  <td>{item.pricePerUnit}</td>
                  {/* Add more table cells for other columns */}
                </tr>
              ))}
          </tbody>
        </table>
        {/* Conditional rendering for 'Edit Selected' button */}
        {isEditing && (
          <button className="edit-selected-button" onClick={handleEditSelected}>
            Edit Selected
          </button>
        )}
        {/* Pagination controls */}
        <div className="pagination">
          <button
            className="previous-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="next-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default FoodItemDisplay;
