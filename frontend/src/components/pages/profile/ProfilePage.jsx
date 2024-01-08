import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDisplayComponent from "./ProfileDisplayComponent.jsx";
import EditingComponent from "./EditingComponent.jsx";

const ProfilePage = () => {
    const [restInfo, setRestInfo] = useState([]);
    const [editMode, setEditMode] = useState(false); // 初始化为false表示不处于编辑模式
    const [editedRestInfo, setEditedRestInfo] = useState([]); // 用于存储编辑后的数据

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
        setEditMode(true); // 点击"Edit"按钮后，将编辑模式设置为true，隐藏ProfileDisplayComponent
    };

    const handleSaveClick = async () => {
        // 在这里处理保存到数据库的逻辑，使用axios或其他方法
        // 完成后，你可以再次调用getRestInfo来刷新数据
        // 然后将编辑模式设置为false，显示ProfileDisplayComponent
        try {
            await axios.put("http://localhost:5555/updateRestInfo", editedRestInfo);
            setEditMode(false);
            getRestInfo();
        } catch (error) {
            console.log("Error saving data:", error);
        }
    };

    const handleInputChange = (index, field, value) => {
        // 处理EditingComponent中的输入字段更改，并将更改保存到editedRestInfo中
        const updatedEditedRestInfo = [...editedRestInfo];
        updatedEditedRestInfo[index][field] = value;
        setEditedRestInfo(updatedEditedRestInfo);
    };

    return (
        <div>
            {editMode ? (
                <>
                    <EditingComponent
                        restProp={restInfo}
                        onInputChange={handleInputChange}
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
