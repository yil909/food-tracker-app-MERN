// CustomModal.jsx
import React from "react";
import "./CustomModal.css";

const CustomModal = ({ message, onClose }) => {
  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal-content">
        <p className="custom-modal-message">{message}</p>
        <button className="custom-modal-close" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
