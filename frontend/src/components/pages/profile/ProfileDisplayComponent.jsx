import React from "react";
import "./ProfileDisplayComponent.css";
import Layout from "antd/es/layout/layout";

const ProfileDisplayComponent = ({ restInfoProp }) => {
  const info = restInfoProp[0] || {};

  return (
    <div className="profile-container">
      <h1 className="content-title">Profile</h1>
      <div className="section">
        <div className="section-header">
          <h2>Restaurant Details</h2>
          {/* Assuming edit functionality is handled elsewhere */}
        </div>
        <div className="section-content">
          <div className="info-row">
            <strong className="info-label">Restaurant name</strong>
            <span className="info-value">{info.restaurantname}</span>
          </div>
          <div className="info-row">
            <strong className="info-label">Restaurant ID</strong>
            <span className="info-value">{info.restaurantId}</span>
          </div>
          <div className="info-row">
            <strong className="info-label">Restaurant Address</strong>
            <span className="info-value">{info.address}</span>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <h2>User Details</h2>
          {/* Assuming edit functionality is handled elsewhere */}
        </div>
        <div className="section-content">
          <div className="info-row">
            <strong className="info-label">User name</strong>
            <span className="info-value">{info.username}</span>
          </div>
          <div className="info-row">
            <strong className="info-label">Email Address</strong>
            <span className="info-value">{info.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplayComponent;
