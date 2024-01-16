import { useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../backend/config";

function useFoodItem() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodMetric, setFoodMetric] = useState([]);
  const [wasteMetric, setWasteMetric] = useState([]);
  const [usageWasteData, setUsageWasteData] = useState([]);
  const [locationRanking, setLocationRanking] = useState([]);
  const [cookMenu, setCookMenu] = useState([]);
  const [ingredientList, setIngrdList] = useState([]);

  const getFoodItem = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/fooditems');
      setFoodItem(response.data);
    } catch (error) {
      console.error("Error fetching FoodItem data:", error);
    }
  };

  const getFoodMetric = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/foodmetrics');
      setFoodMetric(response.data);
      //console.log("Hello world!");
      //console.log(JSON.stringify(foodMetric, null, 2));
    } catch (error) {
      console.error("Error fetching FoodMetric data:", error);
    }
  };

  const getWasteMetric = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/wastemetrics');
      setWasteMetric(response.data);
      //console.log("Hello world!");
      //console.log(JSON.stringify(wasteMetric, null, 2));
    } catch (error) {
      console.error("Error fetching WasteMetric data:", error);
    }
  };

  const getUsageWasteData = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/usagewaste');
      setUsageWasteData(response.data);
      console.log("Hello world 2!");
      console.log(JSON.stringify(usageWasteData, null, 2));
    } catch (error) {
      console.error("Error fetching usageWaste data:", error);
    }
  };

  const getLocationRanking = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/locationranking');
      setLocationRanking(response.data);
      console.log("Hello world 333!");
      console.log(JSON.stringify(locationRanking, null, 2));
    } catch (error) {
      console.error("Error fetching location ranking data:", error);
    }
  };

  const getCookMenu = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/cookmenu');
      setCookMenu(response.data);
      console.log("Hello world 444!");
      console.log(JSON.stringify(cookMenu, null, 2));
    } catch (error) {
      console.error("Error fetching cook menu data:", error);
    }
  };

  const getIngredientList = async (dishid, userid) => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${PORT}/ingredientList?dishid=${dishid}&userid=${userid}`);
      setIngrdList(response.data);
      console.log("Hello world 555!");
      console.log(JSON.stringify(response.data, null, 2)); // Use response.data instead of ingrdList
    } catch (error) {
      console.error("Error fetching ingredient list:", error);
    }
  };
  

  const updateFoodItem = async (updatedData) => {
    try {
      const response = await axios.put(
        'http://'+LOCAL_IP+':5555/updatefooditems',
        updatedData
      );
      console.log(JSON.stringify(updatedData, null, 2));
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
        'http://'+LOCAL_IP+':'+PORT+'/createfooditems',
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
        'http://'+LOCAL_IP+':'+PORT+'/createtranslog',
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
    wasteMetric,
    usageWasteData,
    locationRanking,
    cookMenu,
    ingredientList,
    getFoodItem,
    updateFoodItem,
    createFoodItem,
    createTransLog,
    getFoodMetric,
    getWasteMetric,
    getUsageWasteData,
    getLocationRanking,
    getCookMenu,
    getIngredientList,
  };
}

export default useFoodItem;
