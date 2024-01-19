import { useEffect, useState } from "react";
import "./EditDialogBox.css";
import useFoodCategory from "../../../hooks/useFoodCategory";
import useFoodItem from "../../../hooks/useFoodItem";

const EditDialogBox = ({ foodItemDetails, onClose }) => {
  const [editedItem, setEditedItem] = useState({ ...foodItemDetails });
  const foodStatuses = [
    { value: "USE", label: "USE" },
    { value: "WASTE", label: "WASTE" },
  ];
  // Custom hook for fetching food items
  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { updateFoodItem, createTransLog, getFoodItemByCategory } = useFoodItem();
  const [foodStatus, setFoodStatus] = useState("USE"); // Initial value is "USE"

  useEffect(() => {
    getFoodCategory();
  }, []); // useEffect will run on mount and fetch the data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...editedItem, foodstatus: foodStatus };
      // Call the updateFoodItem function
      createTransLog(updatedData);
      console.log("Saving edited item:", updatedData);
      onClose();
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  // Update API request to send the updated "foodStatus" property

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">
          <h2>Edit Food Item</h2>
        </div>

        {/* Editable input fields for all fields */}
        <div>
          <label>
            Category:
            <select
              name="foodCategoryid"
              value={editedItem.foodCategoryid}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a category
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
              name="name"
              value={editedItem.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={editedItem.quantity}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={editedItem.unit}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="pricePerUnit"
              value={editedItem.pricePerUnit}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <div>
            <label>
              Expiry Date:
              <input
                type="date" // Change this from "text" to "date"
                name="expirydate"
                value={editedItem.expirydate}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label>
            Food Status:
            <select
              name="foodstatus"
              value={foodStatus}
              onChange={(e) => setFoodStatus(e.target.value)}
            >
              {foodStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Add more input fields for other details */}
        {/* Save and Close buttons */}
        <div className="edit-modal-actions">
          {" "}
          {/* Updated class name */}
          <button className="edit-modal-button save" onClick={handleSave}>
            Save
          </button>
          <button className="edit-modal-button close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialogBox;
