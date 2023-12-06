import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/fooditems');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Food Items</h2>
      <ul>
        {foodItems.map((item) => (
          <li key={item.itemid}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItemList;
