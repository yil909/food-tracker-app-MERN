import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileDisplayComponent from "./ProfileDisplayComponent.jsx";
import EditingComponent from "./EditingComponent.jsx";
import Layout from "../../common/Layout.jsx";
import "./ProfilePage.css"; // Ensure you have the CSS file in the correct path
import usePageTitleAndFavicon from "../../../hooks/usePageTitleAndFavicon";
import logo from "../../../assets/icons/logo.png";

const ProfilePage = () => {
  usePageTitleAndFavicon("Profile - Food Waste Tracker", logo);
  const [restInfo, setRestInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRestInfo, setEditedRestInfo] = useState({});

  async function getRestInfo() {
    try {
      const response = await axios.get("http://localhost:5555/restInfo");
      setRestInfo(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getRestInfo();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedRestInfo(restInfo[0] || {});
  };

  const handleSaveClick = async () => {
    try {
      const dataToSend = {
        userid: restInfo[0].userid,
        restaurantname: editedRestInfo.restaurantname,
        address: editedRestInfo.address,
        username: editedRestInfo.username,
        contact: editedRestInfo.contact,
      };

      console.log("Sending data to server:", dataToSend);

      const response = await axios.put(
        "http://localhost:5555/updateRestInfo",
        dataToSend
      );

      console.log("Server response:", response.data);
      setEditMode(false);
      getRestInfo();
    } catch (error) {
      console.error("Error saving data:", error);
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleInfoChange = (updatedInfo) => {
    setEditedRestInfo(updatedInfo);
  };

  const handleBackClick = () => {
    setEditMode(false);
  };

  return (
    <Layout>
      <div className="profile-page">
        {editMode ? (
          <>
            <EditingComponent
              restProp={editedRestInfo}
              onInfoChange={handleInfoChange}
            />
            <div className="button-group">
              <button onClick={handleBackClick} className="back-button">
                Back
              </button>
              <button onClick={handleSaveClick} className="save-button">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <ProfileDisplayComponent restInfoProp={restInfo} />
            <button onClick={handleEditClick} className="edit-button2">
              Edit
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
