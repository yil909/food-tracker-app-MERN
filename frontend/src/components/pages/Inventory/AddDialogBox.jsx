// AddDialogBox.jsx
import React, { useEffect, useState } from "react";
import useFoodCategory from "../../../hooks/useFoodCategory";
import useFoodItem from "../../../hooks/useFoodItem";
import "./AddDialogBox.css";

const AddDialogBox = ({ onClose }) => {
  const [foodCategoryid, setFoodCategoryid] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { createFoodItem } = useFoodItem();

  useEffect(() => {
    getFoodCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFoodItem = {
      userid: 1,
      foodCategoryid: parseInt(foodCategoryid),
      name,
      quantity: parseFloat(quantity),
      unit,
      expiryDate,
      price: parseFloat(price),
    };

    try {
      createFoodItem(newFoodItem);
      setShowSuccess(true);

      // Display success message for 3 seconds and then close
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Close modal after submission
      }, 3000);
    } catch (error) {
      console.error("Error creating food item:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add New Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Food Category:
            <select
              value={foodCategoryid}
              onChange={(e) => setFoodCategoryid(e.target.value)}
            >
              <option value="">Select Food Category</option>
              {foodCategory.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </label>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date" // Changed to date type for proper date picking
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="modal-button add">
              Add Item
            </button>
            <button
              type="button"
              className="modal-button cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
        {showSuccess && (
          <div className="success-message">Item added successfully!</div>
        )}
      </div>
    </div>
  );
};

export default AddDialogBox;
