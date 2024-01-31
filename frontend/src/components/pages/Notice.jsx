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
  const { incrementNotificationCount, decrementNotificationCount } =
    useNotification();
  const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
  const { expFoodItem, getExpFoodItem } = useFoodItem();
  const { updateFoodItem } = useFoodItem();
  const [notificationCount, setNotificationCount] = useState(0);
  const [itemNearExp, setItemNearExp] = useState([]);
  const [itemExpired, setItemExpired] = useState([]);
  const [showDetailsNearExp, setShowDetailsNearExp] = useState(false);
  const [showDetailsExpired, setShowDetailsExpired] = useState(false);

  const toggleDetailsNearExp = () => {
    setShowDetailsNearExp(!showDetailsNearExp);
  };

  const toggleDetailsExpired = () => {
    setShowDetailsExpired(!showDetailsExpired);
  };
  const [readStatus, setReadStatus] = useState(
    Array(itemNearExp.length).fill(false)
  );

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
      decrementNotificationCount();
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
      const newItems = sortedItems.filter(
        (item) =>
          !itemNearExp.some((existingItem) => existingItem.id === item.id)
      );
      //Increment the notification count by the count of new items
      //incrementNotificationCount(newItems.length);
      setNotificationCount(newItems.length);
      setItemNearExp(sortedItems);
    };

    fetchData();
  }, [getFoodItem, foodItem, itemNearExp]);

  useEffect(() => {
    const fetchData = async () => {
      await getExpFoodItem();
      const expiredItems = expFoodItem.filter(
        (item) => item.readstatus !== "Y"
      );
      //console.log("expiredItems count: ", expiredItems.length);
      //console.log("notificationCount:  ", notificationCount);
      const oldCount = notificationCount;
      const updateCount = oldCount + expiredItems.length;
      setNotificationCount(updateCount);
      setItemExpired(expiredItems);
      incrementNotificationCount(updateCount);
      
    };
    fetchData();
  }, [getExpFoodItem, expFoodItem, itemExpired]);

  usePageTitleAndFavicon("Notice - Food Waste Tracker", logo);
  return (
    <Layout>
      <div className="notice-container">
        <h1>Notice</h1>
        <div className="alerts">
          <div
            className={`alert expiration-warning ${
              showDetailsNearExp ? "expanded" : ""
            }`}
          >
            <ExclamationCircleOutlined className="icon" />
            <div className="alert-content">
              <h2>Expiration Warnings</h2>
              <p>
                The below batch of food items are set to expire in 2 days.
                Please use or dispose of it appropriately.
              </p>
              <a href="#" onClick={toggleDetailsNearExp}>
                Learn more
              </a>
              {showDetailsNearExp && (
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
              <h2>Expired Food Alerts</h2>
              <p>
                The below batch of food items have been expired. Please update
                them as food waste and dispose accordingly.
              </p>
              <a href="#" onClick={toggleDetailsExpired}>
                Learn more
              </a>
              {showDetailsExpired && (
                <div className="additional-details">
                  {itemExpired.map((item, index) => (
                    <div className="alert-content" key={index}>
                      <p>
                        <button onClick={() => handleMarkAsRead(index, item)}>
                          Mark as Read
                        </button>
                        <span> </span>
                        {item.name} purchased on {item.timestamp} has been
                        expired on {item.expirydate}.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
