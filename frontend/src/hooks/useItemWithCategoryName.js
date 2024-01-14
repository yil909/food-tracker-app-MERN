import React, { useState, useEffect } from "react";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../backend/config";

function useItemWithCategoryName() {
    const [itemWithCName, setItemWithCName] = useState([]);

    const getItemWithCategoryName = async () => {
        try {
            const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/itemWithCategoryName');
            setItemWithCName(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getItemWithCategoryName();
    }, []); // useEffect will run on mount and fetch the data

    return {
        itemWithCName,
        getItemWithCategoryName,
    };
}

export default useItemWithCategoryName;
