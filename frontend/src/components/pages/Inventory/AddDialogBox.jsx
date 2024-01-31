import React, { useEffect, useState } from "react";
import useFoodCategory from "../../../hooks/useFoodCategory";
import useFoodItem from "../../../hooks/useFoodItem";
import "./AddDialogBox.css";

const AddDialogBox = ({ onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("add-modal-overlay")) {
      onClose();
    }
  };

  const [foodCategoryid, setFoodCategoryid] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { createFoodItem, getFoodItemSuggestions } = useFoodItem();

  const [nameSuggestions, setNameSuggestions] = useState([]);

  useEffect(() => {
    getFoodCategory();

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [getFoodCategory]);

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

    // createFoodItem(newFoodItem);
    // onClose(); // Close modal after submission
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

  const handleQuantityChange = (newQuantity) => {
    // 确保数量不会小于0
    setQuantity(Math.max(0, newQuantity));
  };

  const handlePriceChange = (newPrice) => {
    // 更新价格，确保价格不会小于0
    setPrice(Math.max(0, newPrice));
  };

  return (
    <div className="add-modal-overlay" onClick={handleOutsideClick}>
      <div className="add-modal-box" onClick={(e) => e.stopPropagation()}>
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
            Quantity(kg):
            <div>
              {/* <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button> */}
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                style={{ textAlign: "left" }}
              />
              {/* <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button> */}
            </div>
          </label>
          {/* <label>
            Unit:
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </label> */}
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
            <div>
              {/* <button
                type="button"
                onClick={() => handlePriceChange(Math.max(0, price - 1))} 
              >
                -
              </button> */}
              <input
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
                // style={{ textAlign: "center", maxWidth: "100px" }}
              />
              {/* <button
                type="button"
                onClick={() => handlePriceChange(price + 1)} // 增加价格
              >
                +
              </button> */}
            </div>
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
        {showSuccess && (
          <div className="success-message">Item added successfully!</div>
        )}
      </div>
    </div>
  );
};
export default AddDialogBox;
