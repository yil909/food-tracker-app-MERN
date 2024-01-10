import { useState, useEffect } from "react";
import useFoodItem from "../../../hooks/useFoodItem";
import "./FoodItemDisplay.css";
import Layout from "../../common/Layout";
import EditDialogBox from "./EditDialogBox.jsx";
import AddDialogBox from "./AddDialogBox.jsx";
import usePageTitleAndFavicon from "../../../hooks/usePageTitleAndFavicon.js";
import logo from "../../../assets/icons/logo.png";
import CustomModal from "../../common/CustomModal.jsx";

import {
  EditOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array, filename) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function FoodItemDisplay() {
  const [showCustomModal, setShowCustomModal] = useState(false);
  // State for tracking edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State for tracking selected items for editing
  const [selectedItemId, setSelectedItemId] = useState(null);
  // State for tracking Dialogbox open status
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // Constants for items per page in pagination
  const itemsPerPage = 10;
  // Custom hook for fetching food items
  const { foodMetric, foodItem, getFoodItem, getFoodMetric } = useFoodItem();

  useEffect(() => {
    if (!isDialogOpen) {
      getFoodMetric();
      //console.log("foodMetric: ");
      //console.log(JSON.stringify(foodMetric, null, 2));
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen) {
      setIsLoading(true); // Set loading state to true
      getFoodItem().then(() => {
        setIsLoading(false); // Set loading state to false
      });
      //console.log("foodItem2: ")
      //console.log(JSON.stringify(foodItem, null, 2));
    }
  }, [isDialogOpen]);

  // Handler for page change in pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(foodItem.length / itemsPerPage);

  // Handler for radiobutton change in edit mode
  const handleRadioChange = (event) => {
    setSelectedItemId(parseInt(event.target.value));
  };

  // const handleEditClick = () => {
  //   if (selectedItemId === null) {
  //     alert("Please select an item to edit.");
  //     return;
  //   }

  const handleEditClick = () => {
    if (selectedItemId === null) {
      setShowCustomModal(true); // 显示自定义模态框而不是使用 alert
      return;
    }

    // Open the dialog box
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    // Close the dialog box
    setIsDialogOpen(false);
  };

  const handleAddClick = () => {
    // Open the add dialog box
    setIsAddDialogOpen(true);
  };

  const handleAddItem = (newFoodItem) => {
    // Add logic to handle adding the new food item to your data source
    // For example, you can update the state or make an API call
    console.log("Adding new food item:", newFoodItem);
  };

  usePageTitleAndFavicon("Inventory - Food Waste Tracker", logo);

  const handleDownload = () => {
    const dataToDownload = foodItem.map((item) => ({
      Category: item.categoryname,
      Name: item.name,
      OriginalQty: item.quantity,
      Used: item.usedQuantity,
      Wasted: item.wastedQuantity,
      Remaining: item.remainingQuantity,
      Unit: item.unit,
      PricePerUnit: item.pricePerUnit,
      ExpiryDate: item.expiryDate,
      DaysUntilExpiry: item.daysUntilExpiry,
    }));

    downloadCSV(dataToDownload, "inventory-data.csv");
  };

  return (
    <Layout>
      {showCustomModal && (
        <CustomModal
          message="Please select an item to edit."
          onClose={() => setShowCustomModal(false)}
        />
      )}
      {/* Section for inventory statistics */}
      {!isDialogOpen && isLoading && <p>Loading...</p>}
      <h1 className="inventory-title">Inventory</h1>
      <div className="inventory-stats">
        {/* Stat boxes for different inventory metrics */}
        <div className="stat-box categories">
          <h3 style={{ fontFamily: "Arial, sans-serif" }}>Categories</h3>
          <span>{foodMetric[0]?.categories}</span>
          <div className="subtext">Last 7 days</div>
        </div>
        <div className="stat-box total-items">
          <h3 style={{ fontFamily: "Arial, sans-serif" }}>Total Items</h3>
          <span style={{ fontFamily: "Arial, sans-serif" }}>
            {foodMetric[0]?.totalItems}
            <small> kg</small>
          </span>
          <div className="subtext">Last 7 days</div>
        </div>

        <div className="stat-box used-items">
          <h3>Used</h3>
          <span style={{ fontFamily: "Arial, sans-serif" }}>
            {foodMetric[0]?.used}
            <small> kg</small>
          </span>
          <div className="subtext">Last 7 days</div>
        </div>
        <div className="stat-box wasted-items">
          <h3>Wasted</h3>
          <span style={{ fontFamily: "Arial, sans-serif" }}>
            {foodMetric[0]?.wasted}
            <small> kg</small>
          </span>
          <div className="subtext">Last 7 days</div>
        </div>
        {/* <p></p>
          <h3>Expired</h3>
          <span>{foodMetric[0]?.expired}</span>
          <div className="subtext">Last 7 days</div>
        </div> */}
        <div className="stat-box high-risk">
          <h3>High Risk of Waste</h3>
          <span style={{ fontFamily: "Arial, sans-serif" }}>
            {foodMetric[0]?.highRisk} <small> kg</small>{" "}
          </span>
          <div className="subtext">Expire in 4 weeks</div>
        </div>
      </div>

      {/* Section for food items table */}
      <div className="food-items-section">
        <div className="section-header">
          <h2>Food Items</h2>
          <div className="header-buttons">
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? <EditOutlined /> : <EditOutlined />} Edit
            </button>
            <button className="add-item-button" onClick={handleAddClick}>
              <PlusOutlined /> Add Item
            </button>
            <button className="filters-button">
              <FilterOutlined /> Filters
            </button>
            <button className="download-button" onClick={handleDownload}>
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
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Original Qty</th>
              <th>Used</th>
              <th>Wasted</th>
              <th>Remaining</th>
              <th>Unit</th>
              <th>Price/Unit</th>
              <th>Expiry Date</th>
              <th>Days Until Expiry</th>

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
                  <td>
                    <input
                      type="radio"
                      name="selectedRow"
                      value={item.itemid}
                      checked={selectedItemId === item.itemid}
                      onChange={handleRadioChange}
                    />
                  </td>
                  <td>{item.categoryname}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.usedQuantity}</td>
                  <td>{item.wastedQuantity}</td>
                  <td>{item.remainingQuantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.pricePerUnit}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.daysUntilExpiry}</td>
                  {/* Add more table cells for other columns */}
                </tr>
              ))}
          </tbody>
        </table>
        {/* Conditional rendering for 'Edit Selected' button */}
        {/* Render the dialog box if isDialogOpen is true */}
        {isDialogOpen && (
          <EditDialogBox
            foodItemDetails={foodItem.find(
              (item) => item.itemid === selectedItemId
            )}
            onClose={closeDialog}
          />
        )}
        {/* Render the Adddialog box if isAddDialogOpen is true */}
        {isAddDialogOpen && (
          <AddDialogBox onClose={() => setIsAddDialogOpen(false)} />
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
