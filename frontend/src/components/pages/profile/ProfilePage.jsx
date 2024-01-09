import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDisplayComponent from "./ProfileDisplayComponent.jsx";
import EditingComponent from "./EditingComponent.jsx";

const ProfilePage = () => {
    const [restInfo, setRestInfo] = useState([]);
    const [editMode, setEditMode] = useState(false);
    // Initialize editedRestInfo as an object
    const [editedRestInfo, setEditedRestInfo] = useState({});

    // Function to fetch restaurant information
    async function getRestInfo() {
        try {
            const response = await axios.get("http://localhost:5555/restInfo");
            setRestInfo(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    // Fetch restaurant information on component mount
    useEffect(() => {
        getRestInfo();
    }, []);

    // Handler for entering edit mode
    const handleEditClick = () => {
        setEditMode(true);
        // Initialize editedRestInfo with the current restInfo
        setEditedRestInfo(restInfo[0] || {});
    };

    // Handler for saving edited information
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

            const response = await axios.put("http://localhost:5555/updateRestInfo", dataToSend);
            console.log("Server response:", response.data);

            setEditMode(false);
            getRestInfo();
        } catch (error) {
            console.error("Error saving data:", error);
            console.log("Error details:", error.response ? error.response.data : error.message);
        }
    };

    const handleInfoChange = (updatedInfo) => {
        setEditedRestInfo(updatedInfo);
    };

    // useEffect(() => {
    //     console.log("Edited Info:", editedRestInfo);
    // }, [editedRestInfo]);

    return (
        <div>
            {editMode ? (
                <>
                    <EditingComponent
                        restProp={editedRestInfo}
                        // onInputChange={handleInputChange}
                        onInfoChange = {handleInfoChange}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <ProfileDisplayComponent restInfoProp={restInfo} />
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;
