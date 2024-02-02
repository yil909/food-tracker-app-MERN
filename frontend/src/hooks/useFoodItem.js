//useFoodItem.js
import { useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../backend/config";

function useFoodItem() {
  const [foodItem, setFoodItem] = useState([]);
  const [expFoodItem, setExpFoodItem] = useState([]);
  const [foodMetric, setFoodMetric] = useState([]);
  const [wasteMetric, setWasteMetric] = useState([]);
  const [usageWasteData, setUsageWasteData] = useState([]);
  const [foodItemByCategory, setFoodItemByCategory] = useState([]);
  const [locationRanking, setLocationRanking] = useState([]);
  const [cookMenu, setCookMenu] = useState([]);
  
  const getFoodItem = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/fooditems"
      );
      setFoodItem(response.data);

    } catch (error) {
      console.error("Error fetching FoodItem data:", error);
    }
  };

  const getExpFoodItem = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/expiredfooditems"
      );
      setExpFoodItem(response.data);

    } catch (error) {
      console.error("Error fetching Expired FoodItem data:", error);
    }
  };

  const getFoodItemByCategory = async (categoryName) => {
    try {
      const response = await axios.get(`http://`+LOCAL_IP+`:`+PORT+`/fooditemssortbycategory/${categoryName}`);

      setFoodItemByCategory(response.data);
    }catch (error){
      console.error("Error fetching FoodItem data:", error)
    }
  }


  const getFoodMetric = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/foodmetrics"
      );
      setFoodMetric(response.data);
      //console.log("Hello world!");
      //console.log(JSON.stringify(foodMetric, null, 2));
    } catch (error) {
      console.error("Error fetching FoodMetric data:", error);
    }
  };

  const getWasteMetric = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/wastemetrics"
      );
      setWasteMetric(response.data);
      //console.log("Hello world!");
      //console.log(JSON.stringify(wasteMetric, null, 2));
    } catch (error) {
      console.error("Error fetching WasteMetric data:", error);
    }
  };

  const getUsageWasteData = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/usagewaste"
      );
      setUsageWasteData(response.data);
      console.log("Hello world 2!");
      console.log(JSON.stringify(usageWasteData, null, 2));
    } catch (error) {
      console.error("Error fetching usageWaste data:", error);
    }
  };

  const getLocationRanking = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/locationranking"
      );
      setLocationRanking(response.data);
      console.log("Hello world 333!");
      console.log(JSON.stringify(locationRanking, null, 2));
    } catch (error) {
      console.error("Error fetching location ranking data:", error);
    }
  };

  const getCookMenu = async () => {
    try {
      const response = await axios.get(
        "http://" + LOCAL_IP + ":" + PORT + "/cookmenu"
      );
  
      // Fetch ingredients for each dish and combine into a single JSON object
      const combinedData = await Promise.all(
        response.data.map(async (dish) => {
          const ingredientResponse = await axios.get(
            `http://${LOCAL_IP}:${PORT}/ingredientList?dishid=${dish.dishid}&userid=${dish.userid}`
          );
          const ingredients = ingredientResponse.data;
          return {
            ...dish,
            ingredients,
          };
        })
      );
      console.log("Hello world 555!");
      setCookMenu(combinedData);
      console.log("Combined Data:", JSON.stringify(combinedData, null, 2));
    } catch (error) {
      console.error("Error fetching cook menu data:", error);
    }
  };
  

  const cookDish = async (dishid, userid) => {
    try {
      const response = await axios.put(
        `http://${LOCAL_IP}:${PORT}/cookdish`,
        { dishId: dishid, userId: userid } // Pass dishid and userid in the request body
      );

      console.log("Dish cooked successfully!");
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error cooking dish:", error);
    }
  };

  const updateFoodItem = async (updatedData) => {
    try {
      const response = await axios.put(
        "http://" + LOCAL_IP + ":5555/updatefooditems",
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
        "http://" + LOCAL_IP + ":" + PORT + "/createfooditems",
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
        "http://" + LOCAL_IP + ":" + PORT + "/createtranslog",
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

  const getFoodItemSuggestions = async (categoryID, relevantString) => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:${PORT}/getnamesuggestions`, {
        params: {
          categoryID: categoryID,
          namePart: relevantString
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error fetching data:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error in getFoodItemSuggestions:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
      return null;
    }
  };




  return {
    foodItem,
    expFoodItem,
    foodItemByCategory,
    foodMetric,
    wasteMetric,
    usageWasteData,
    locationRanking,
    cookMenu,
    getFoodItem,
    getExpFoodItem,
    updateFoodItem,
    createFoodItem,
    createTransLog,
    getFoodMetric,
    getWasteMetric,
    getUsageWasteData,
    getFoodItemByCategory,
    getLocationRanking,
    getCookMenu,
    cookDish,
    getFoodItemSuggestions,
  };
}

export default useFoodItem;