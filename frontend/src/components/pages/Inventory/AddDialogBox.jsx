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

  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { createFoodItem } = useFoodItem();

  const [nameSuggestions, setNameSuggestions] = useState([]);

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

    createFoodItem(newFoodItem);
    onClose(); // Close modal after submission
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!foodCategoryid || !name.trim()) {
        // If either categoryID or name is empty, do not fetch suggestions
        return;
      }

      try {
        const suggestions = await getFoodItemSuggestions(foodCategoryid, name);
        const suggestionNames = suggestions.map(
          (suggestion) => suggestion.itemname
        );
        setNameSuggestions(suggestionNames);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [foodCategoryid, name]);

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion); // Set the name input field with the selected suggestion
    setNameSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-box">
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
              onBlur={() => {
                // Delay hiding suggestions to allow click event to register
                setTimeout(() => setNameSuggestions([]), 200);
              }}
            />
            {nameSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {nameSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
          <div className="add-modal-actions">
            <button type="submit" className="add-modal-button add">
              Add Item
            </button>
            <button
              type="button"
              className="add-modal-button cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDialogBox;
