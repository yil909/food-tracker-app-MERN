import React from "react";
import Layout from "../common/Layout";
import "./Notice.css";
import usePageTitleAndFavicon from "../../hooks/usePageTitleAndFavicon";
import logo from "../../assets/icons/logo.png";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const Notice = () => {
  usePageTitleAndFavicon("Notice - Food Waste Tracker", logo);
  return (
    <Layout>
      <div className="notice-container">
        <h1>Notice</h1>
        <div className="alerts">
          <div className="alert expiration-warning">
            <ExclamationCircleOutlined className="icon" />
            <div className="alert-content">
              <h2>Expiration Warnings</h2>
              <p>
                The batch of milk purchased on [Date] is set to expire in 2
                days. Please use or dispose of it appropriately.
              </p>
              <a href="#">Learn more</a>
            </div>
          </div>
          <div className="alert inventory-alert">
            <InfoCircleOutlined className="icon" />
            <div className="alert-content">
              <h2>Inventory Alerts</h2>
              <p>
                Tomato inventory has dropped below the threshold level. Only 5
                kg remaining. Consider reordering soon.
              </p>
              <a href="#">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
