import React, { useState, useEffect } from "react";
import "./EditingComponent.css"; // Make sure this CSS file contains the styles you need

const EditingComponent = (props) => {
  // Initialize info as an object
  const [info, setInfo] = useState({});

  // Update local state when props.restProp changes
  useEffect(() => {
    setInfo(props.restProp || {});
  }, [props.restProp]);

  // Handle input field changes
  const inputChangeHandler = (e, field) => {
    const updatedInfo = {
      ...info,
      [field]: e.target.value,
    };

    setInfo(updatedInfo);

    // Pass the updated info directly
    props.onInfoChange(updatedInfo);
  };

  return (
    <div className="editing-container">
      {" "}
      {/* Use the same container class name */}
      <h2>Restaurant Detail</h2>
      <div className="input-group">
        {" "}
        {/* Use the same class name for grouping */}
        <label htmlFor="restaurantName">
          <strong>Restaurant Name:</strong>
        </label>
        <input
          type="text"
          id="restaurantName"
          className="input-field" // Apply the same input field class name
          value={info.restaurantname || ""}
          onChange={(e) => inputChangeHandler(e, "restaurantname")}
        />
      </div>
      <div className="input-group">
        <label htmlFor="restaurantAddress">
          <strong>Restaurant Address:</strong>
        </label>
        <input
          type="text"
          id="restaurantAddress"
          className="input-field" // Apply the same input field class name
          value={info.address || ""}
          onChange={(e) => inputChangeHandler(e, "address")}
        />
      </div>
      <h2>User Detail </h2>
      <div className="input-group">
        <label htmlFor="username">
          <strong>Username:</strong>
        </label>
        <input
          type="text"
          id="username"
          className="input-field" // Apply the same input field class name
          value={info.username || ""}
          onChange={(e) => inputChangeHandler(e, "username")}
        />
      </div>
      <div className="input-group">
        <label htmlFor="contact">
          <strong>Contact:</strong>
        </label>
        <input
          type="text"
          id="contact"
          className="input-field" // Apply the same input field class name
          value={info.contact || ""}
          onChange={(e) => inputChangeHandler(e, "contact")}
        />
      </div>
    </div>
  );
};

export default EditingComponent;
