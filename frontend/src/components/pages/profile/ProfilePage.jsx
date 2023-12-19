import axios from "axios";
import { useEffect, useState } from "react";
import ProfileDisplayComponent from "./ProfileDisplayComponent.jsx";
import EditingComponent from "./EditingComponent.jsx";

const ProfilePage = () => {
    const [restInfo, setRestInfo] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [editMode, setEditMode] = useState(null);

    const [editedContent, setEditedContent] = useState({});

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

    return (
        <div>
            <ProfileDisplayComponent restInfoProp={restInfo}/>
            <EditingComponent restProp ={restInfo}/>
        </div>
    );
}

export default ProfilePage;
