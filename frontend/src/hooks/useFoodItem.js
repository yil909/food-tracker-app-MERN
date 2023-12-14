import { useEffect, useState } from "react";
import axios from "axios";

function useFoodItem() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodMetric, setFoodMetric] = useState([]);

  const getFoodItem = async () => {
    try {
      const response = await axios.get("http://localhost:5555/fooditems");
      setFoodItem(response.data);
    } catch (error) {
      console.error("Error fetching FoodItem data:", error);
    }
  };

  const getFoodMetric = async () => {
    try {
      const response = await axios.get("http://localhost:5555/foodmetrics");
      setFoodMetric(response.data);
      //console.log("Hello world!");
      //console.log(JSON.stringify(foodMetric, null, 2));
    } catch (error) {
      console.error("Error fetching FoodMetric data:", error);
    }
  };

  const updateFoodItem = async (updatedData) => {
    try {
      const response = await axios.put(
        "http://localhost:5555/updatefooditems",
        updatedData
      );
      //console.log(JSON.stringify(updatedData, null, 2));
      // Fetch the updated data after a successful update
      getFoodItem();
    } catch (error) {
      console.error("Error updating FoodItem data:", error);
      throw error; // Re-throw the error to handle it at the component
    }
  };

  const createFoodItem = async (newData) => {
    try {
      const response = await axios.put(
        "http://localhost:5555/createfooditems",
        newData
      );
      //console.log(JSON.stringify(updatedData, null, 2));
      // Fetch the created data after a successful update
      getFoodItem();
    } catch (error) {
      console.error("Error creating FoodItem data:", error);
      throw error; // Re-throw the error to handle it at the component
    }
  };

  const createTransLog = async (updatedData) => {
    try {
      const response = await axios.put(
        "http://localhost:5555/createtranslog",
        updatedData
      );
      //console.log(JSON.stringify(updatedData, null, 2));
      // Fetch the updated data after a successful update
      getFoodItem();
    } catch (error) {
      console.error("Error creating TransLog:", error);
      throw error; // Re-throw the error to handle it at the component
    }
  };
  return {
    foodItem,
    foodMetric,
    getFoodItem,
    updateFoodItem,
    createFoodItem,
    createTransLog,
    getFoodMetric,
  };
}

export default useFoodItem;
