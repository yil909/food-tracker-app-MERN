import { useEffect, useState } from "react";
import "./EditDialogBox.css";
import useFoodCategory from "../../../hooks/useFoodCategory";
import useFoodItem from "../../../hooks/useFoodItem";
import "./EditDialogBox.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import CustomModal from "../../common/CustomModal.jsx";

const EditDialogBox = ({ foodItemDetails, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const [editedItem, setEditedItem] = useState({ ...foodItemDetails });
  const foodStatuses = [
    { value: "USE", label: "USE" },
    { value: "WASTE", label: "WASTE" },
  ];
  // Custom hook for fetching food items
  const { foodCategory, getFoodCategory } = useFoodCategory();
  const { updateFoodItem, createTransLog, getFoodItemByCategory } =
    useFoodItem();
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

      // Check if the input quantity is greater than the remaining quantity
      if (editedItem.quantity > editedItem.remainingQuantity) {
        // Show an error message or handle the error condition
        //alert("Error: Input quantity exceeds remaining quantity.");
        setShowCustomModal(true);
        return; // Exit the function without saving
      }

      createTransLog(updatedData);
      console.log("Saving edited item:", updatedData);

      // Show success message for 3 seconds and then close
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // 现在将 onClose 放在这里，确保弹窗显示3秒后再关闭。
      }, 3000);
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  // Update API request to send the updated "foodStatus" property

  // 新的状态来控制 Price 和 Expiry Date 字段的显示
  const [showDetails, setShowDetails] = useState(false);

  // 切换 showDetails 状态的函数
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="edit-modal-overlay" onClick={handleOverlayClick}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Add this conditional rendering for the CustomModal */}
        {showCustomModal && (
          <CustomModal
            message="Input quantity exceeds remaining quantity."
            onClose={() => setShowCustomModal(false)}
            className="custom-modal-message"
          />
        )}
        <div className="edit-modal-title">
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
            Quantity(kg):
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
        {/* <div>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={editedItem.unit}
              onChange={handleInputChange}
            />
          </label>
        </div> */}
        {/* 切换按钮 */}
        <button
          className={`toggle-details-button ${
            showDetails ? "show-details" : ""
          }`}
          onClick={toggleDetails}
        >
          {showDetails ? <UpCircleOutlined /> : <DownCircleOutlined />}
        </button>

        {showDetails && (
          <>
            <div>
              <label>
                Expiry Date:
                <input
                  type="date" // Change this from "text" to "date"
                  name="expirydate"
                  value={editedItem.expiryDate}
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
          </>
        )}

        {/* Add more input fields for other details */}
        {/* Save and Close buttons */}
        <div className="edit-modal-actions">
          {" "}
          {/* Updated class name */}
          <button className="edit-modal-button-save" onClick={handleSave}>
            Save
          </button>
          <button className="edit-modal-button-close" onClick={onClose}>
            Close
          </button>
          {/* <CloseCircleOutlined
            className="edit-modal-top-close"
            onClick={onClose}
          /> */}
          {showSuccess && (
            <div className="edit-success-message">Save Successful!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDialogBox;
