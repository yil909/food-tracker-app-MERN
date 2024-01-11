import React from "react";
import Layout from "../common/Layout";
import useFoodItemWithAllColumn from "../../hooks/useFoodItemWithAllColumn.js";
import { useEffect, useState } from "react";
import "./Notice.css";
import usePageTitleAndFavicon from "../../hooks/usePageTitleAndFavicon";
import logo from "../../assets/icons/logo.png";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const Notice = () => {
  const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
  const [itemNearExp, setItemNearExp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getFoodItem();

      // Filter items expiring within the next 2 days
      const twoDaysFromNow = new Date();
      twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

      const expiringItems = foodItem.filter(
        (item) => new Date(item.expirydate) <= twoDaysFromNow
      );

      // Sort expiring items based on expiry date
      const sortedItems = expiringItems.sort(
        (a, b) => new Date(a.expirydate) - new Date(b.expirydate)
      );

      setItemNearExp(sortedItems);
    };

    fetchData();
  }, [getFoodItem, foodItem]);

  // Now, itemNearExp contains food items expiring within the next 2 days, sorted by expiry date.

  usePageTitleAndFavicon("Notice - Food Waste Tracker", logo);
  return (
    <Layout>
      <div className="notice-container">
        <h1>Notice</h1>
        <div className="alerts">
          {itemNearExp.map((item, index) => (
            <div className="alert expiration-warning" key={index}>
              <ExclamationCircleOutlined className="icon" />
              <div className="alert-content">
                <h2>Expiration Warnings</h2>
                <p>
                  The batch of {item.name} purchased on {item.timestamp} is set to
                  expire in 2 days. Please use or dispose of it appropriately.
                </p>
                <a href="#">Learn more</a>
              </div>
            </div>
          ))}
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
