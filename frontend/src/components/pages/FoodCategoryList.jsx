// FoodCategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodCategoryList = () => {
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/foodcategories');
        setFoodCategories(response.data.foodCat);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Food Categories</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {foodCategories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodCategoryList;
