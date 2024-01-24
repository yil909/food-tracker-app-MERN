import React, { useEffect, useState } from "react";
import useFoodItem from "../../../hooks/useFoodItem";
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import "./CookMenu.css";

const CookMenu = ({ onClose }) => {
  const { cookMenu, getCookMenu, cookDish } = useFoodItem();
  const [showSuccess, setShowSuccess] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    getCookMenu();
  }, []);

  const handleDishFlip = (e, dishId) => {
    e.stopPropagation(); // Prevents click event from reaching the overlay
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [dishId]: !prevFlippedCards[dishId], // Toggle the flipped state
    }));
  };

  const handleFlipAll = (e) => {
    e.stopPropagation();
    const isAllFlipped = Object.values(flippedCards).every((state) => state);

    if (isAllFlipped) {
      // If all cards are flipped, set all to unflipped
      const resetFlipped = cookMenu.reduce((acc, dish) => {
        acc[dish.dishid] = false;
        return acc;
      }, {});
      setFlippedCards(resetFlipped);
    } else {
      // If not all cards are flipped, set all to flipped
      const allDishesFlipped = cookMenu.reduce((acc, dish) => {
        acc[dish.dishid] = true;
        return acc;
      }, {});
      setFlippedCards(allDishesFlipped);
    }
  };

  const handleCookClick = async (e, dishId) => {
    e.stopPropagation(); // Prevent click from triggering flip
    await cookDish(dishId, 1); // Assuming userid is 1
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="cook-modal-overlay" onClick={onClose}>
      <div className="cook-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Flip All button as an icon */}
        <SyncOutlined className="flip-all-icon" onClick={handleFlipAll} />
        <CloseCircleOutlined
          className="cook-modal-close-icon"
          onClick={onClose}
        />
        <h1>Menu</h1>
        {/* <button className="cook-modal-button flip-all" onClick={handleFlipAll}>
          Flip All
        </button> */}
        <div className="dish-card-container">
          {cookMenu.map((dish) => (
            <div
              key={dish.dishid}
              className={`dish-card ${
                flippedCards[dish.dishid] ? "flipped" : ""
              }`}
              onClick={(e) => handleDishFlip(e, dish.dishid)}
            >
              <div className="dish-front">
                <img
                  src={`./images/dishes/${dish.dishpic}`}
                  alt={dish.dishname}
                />
                <h5>{dish.dishname}</h5>
              </div>
              <div className="dish-back">
                {/* Render the dish name here if the card is flipped */}
                {flippedCards[dish.dishid] && (
                  <div className="dish-name-back">
                    <h5>{dish.dishname}</h5>
                  </div>
                )}
                <div className="ingredient-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Weight(KG)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dish.ingredients.map((ingredient) => (
                        <tr key={ingredient.ingredientname}>
                          <td>{ingredient.ingredientname}</td>
                          <td>{ingredient.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="cook-modal-button cook"
                    onClick={(e) => handleCookClick(e, dish.dishid)}
                  >
                    Cook This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showSuccess && (
          <div className="success-message">Cooking successful!</div>
        )}
      </div>
    </div>
  );
};

export default CookMenu;
