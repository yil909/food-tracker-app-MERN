// AddDialogBox.jsx
import { useEffect, useState } from "react";
import "./AddDialogBox.css";
import useFoodCategory from "../../../hooks/useFoodCategory";
import useFoodItem from "../../../hooks/useFoodItem";

const AddDialogBox = ({ onClose }) => {
  // State for form inputs
  const [foodCategoryid, setFoodCategoryid] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState("");
  // Custom hook for fetching food items
  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { createFoodItem, createTransLog } = useFoodItem();

  useEffect(() => {
    getFoodCategory();
  }, []); // useEffect will run on mount and fetch the data

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs (add your validation logic here)

    // Create a new food item object
    const newFoodItem = {
      userid: 1,  
      foodCategoryid: parseInt(foodCategoryid), // convert to integer
      name,
      quantity: parseFloat(quantity), // convert to float if necessary
      unit,
      expiryDate,
      price: parseFloat(price), // convert to float if necessary
    };

    try {
      // Call the createFoodItem function
      createFoodItem(newFoodItem);
      //createTransLog(newFoodItem);
      console.log("Adding new item:", newFoodItem);
      onClose();
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Food Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Food Category:
              <select
                value={foodCategoryid}
                onChange={(e) => setFoodCategoryid(e.target.value)}
              >
                <option value="" disabled>
                  Select Food Category
                </option>
                {foodCategory.map((category) => (
                  <option key={category.categoryid} value={category.categoryid}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Unit:
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Expiry Date:
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Add Item</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddDialogBox;
