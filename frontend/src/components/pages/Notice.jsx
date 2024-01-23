import React from "react";
import Layout from "../common/Layout";
import useFoodItemWithAllColumn from "../../hooks/useFoodItemWithAllColumn.js";
import useFoodItem from "../../hooks/useFoodItem.js";
import { useEffect, useState } from "react";
import "./Notice.css";
import usePageTitleAndFavicon from "../../hooks/usePageTitleAndFavicon";
import logo from "../../assets/icons/logo.png";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNotification } from "../../hooks/useNotification.jsx";

const Notice = () => {
  const { incrementNotificationCount, decreaseNotificationCount } =
    useNotification();
  const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
  const { updateFoodItem } = useFoodItem();
  const [itemNearExp, setItemNearExp] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [readStatus, setReadStatus] = useState(
    Array(itemNearExp.length).fill(false)
  );
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleMarkAsRead = async (index, editItem) => {
    // Update FoodItem table with read status
    try {
      const updatedData = { ...editItem, readstatus: "Y" };
      // Call the updateFoodItem function
      await updateFoodItem(updatedData);
      console.log("Saving read status", updatedData);

      // Update the readStatus state
      const newReadStatus = [...readStatus];
      newReadStatus[index] = true;
      setReadStatus(newReadStatus);
      // Decrease the notification count
      decreaseNotificationCount();
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFoodItem();

      // Filter items expiring within the next 2 days
      const twoDaysFromNow = new Date();
      twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

      const expiringItems = foodItem.filter(
        (item) =>
          new Date(item.expirydate) <= twoDaysFromNow && item.readstatus !== "Y"
      );
      // Sort expiring items based on expiry date
      const sortedItems = expiringItems.sort(
        (a, b) => new Date(a.expirydate) - new Date(b.expirydate)
      );

      // Calculate the count of new items
      const newItemsCount = sortedItems.filter(
        (item) =>
          !itemNearExp.some((existingItem) => existingItem.id === item.id)
      ).length;

      setItemNearExp(sortedItems);

      // Increment the notification count by the count of new items
      incrementNotificationCount(newItemsCount);
    };

    fetchData();
  }, [getFoodItem, foodItem, itemNearExp]);

  // Now, itemNearExp contains food items expiring within the next 2 days, sorted by expiry date.

  usePageTitleAndFavicon("Notice - Food Waste Tracker", logo);
  return (
    <Layout>
      <div className="notice-container">
        <h1>Notice</h1>
        <div className="alerts">
          <div
            className={`alert expiration-warning ${
              showDetails ? "expanded" : ""
            }`}
          >
            <ExclamationCircleOutlined className="icon" />
            <div className="alert-content">
              <h2>Expiration Warnings</h2>
              <p>
                The batch of food items are set to expire in 2 days. Please use
                or dispose of it appropriately.
              </p>
              <a href="#" onClick={toggleDetails}>
                Read Details
              </a>
              {showDetails && (
                <div className="additional-details">
                  {itemNearExp.map((item, index) => (
                    <div className="alert-content" key={index}>
                      <p>
                        <button onClick={() => handleMarkAsRead(index, item)}>
                          Mark as Read
                        </button>
                        <span> </span>
                        {item.name} purchased on {item.timestamp} is set to
                        expire on {item.expirydate}.
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
              <a href="#">Read Details</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
