import React, { useState } from "react";
import Layout from "../common/Layout";
import {
  CheckCircleOutlined,
  AlertOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./Guide.css";

const Guide = () => {
  const [showDetails, setShowDetails] = useState({
    newToApp: false,
    inventoryAlerts: false,
    needHelp: false,
  });

  const toggleDetails = (section) => {
    setShowDetails({ ...showDetails, [section]: !showDetails[section] });
  };

  return (
    <Layout>
      <div className="guide-content">
        <h1 className="content-title">Guide</h1>
        {/* Guide card for new users */}
        <div className="guide-card" onClick={() => toggleDetails("newToApp")}>
          <CheckCircleOutlined className="icon" />
          <div>
            <h2>New to App</h2>
            <p>
              Get started by setting up your account with these simple steps.
            </p>
            {showDetails.newToApp && (
              <div className="details-content">
                Detailed content for New to App...
              </div>
            )}
            <button className="see-all-btn">See All</button>
          </div>
        </div>
        {/* Guide card for inventory alerts */}
        <div
          className="guide-card"
          onClick={() => toggleDetails("inventoryAlerts")}
        >
          <AlertOutlined className="icon" />
          <div>
            <h2>Inventory Alerts</h2>
            <p>
              Learn how to set up alerts so you never miss an expiration date.
            </p>
            {showDetails.inventoryAlerts && (
              <div className="details-content">
                Detailed content for Inventory Alerts...
              </div>
            )}
            <button className="see-all-btn">See All</button>
          </div>
        </div>
        {/* Guide card for additional help */}
        <div className="guide-card" onClick={() => toggleDetails("needHelp")}>
          <QuestionCircleOutlined className="icon" />
          <div>
            <h2>Need Help?</h2>
            <p>Find answers to common questions about using the app.</p>
            {showDetails.needHelp && (
              <div className="details-content">
                Detailed content for Need Help...
              </div>
            )}
            <button className="see-all-btn">See All</button>
          </div>
        </div>
        {/* FAQ section */}
        <div className="faq-section">
          <h2>FAQ</h2>
          <p>Find answers to common questions about using the app.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
