import React, { useState, useEffect } from "react";
import axios from "axios";

function useFoodItem() {
  const [foodItem, setFoodItem] = useState([]);

  const getFoodItem = async () => {
    try {
      const response = await axios.get("http://localhost:5555/fooditems");
      setFoodItem(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFoodItem();
  }, []); // useEffect will run on mount and fetch the data

  return {
    foodItem,
    getFoodItem,
  };
}

export default useFoodItem;

