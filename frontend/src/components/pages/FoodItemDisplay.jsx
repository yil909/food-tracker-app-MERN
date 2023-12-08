import useFoodItem from "../../hooks/useFoodItem.js";
import "./FoodItemDisplay.css";

function FoodItemDisplay() {
  const { foodItem, getFoodItem } = useFoodItem();
  getFoodItem();
  return (
    <div>
      {/* Overall Inventory Section */}
      <div className="overall-inventory">
        <h2>Overall Inventory</h2>
        <div className="boxes-container">
          <div className="box">
            <h3>Categories</h3>
            <span>{/* Placeholder for number of categories */}</span>
          </div>
          <div className="box">
            <h3>Total Items</h3>
            <span>{/* Placeholder for total number of items */}</span>
          </div>
          <div className="box">
            <h3>Used Items</h3>
            <span>{/* Placeholder for number of used items */}</span>
          </div>
          <div className="box">
            <h3>High Risk of Waste</h3>
            <span>
              {/* Placeholder for number of items at high risk of waste */}
            </span>
          </div>
        </div>
      </div>

      {/* Food Items Section */}
      <div className="overall-iinventory">
        <h2>Food Items</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Batch Number</th>
              <th>Expiry Date</th>
              <th>Price/Unit</th>
              {/* Add more table headers for other columns 
            name, quantity, unit, timestamp, batchnumber, expirydate, pricePerUnit*/}
            </tr>
          </thead>
          <tbody>
            {foodItem.map((item) => (
              <tr key={item.itemid}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.batchnumber}</td>
                <td>{item.expirydate}</td>
                <td>{item.pricePerUnit}</td>
                {/* Add more table cells for other columns */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodItemDisplay;
