import { useEffect, useState } from "react";
import useItemWithCategoryName from "../../../hooks/useItemWithCategoryName.js";
import "./MostWastedItem.css";

const MostWastedItem = () => {
  // New state to toggle between showing all rows or just 10
  const [showAll, setShowAll] = useState(false);
  // Function to toggle the state
  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  const { itemWithCName, getItemWithCategoryName } = useItemWithCategoryName();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getItemWithCategoryName();
      if (itemWithCName && itemWithCName.length > 0) {
        const sortedItem = [...itemWithCName].sort(
          (a, b) => b.quantity * b.priceperunit - a.quantity * a.priceperunit
        );
        setSortedData(sortedItem);
      }
    };

    fetchData();
  }, [getItemWithCategoryName, itemWithCName]); // 添加依赖项

  return (
    <div className="table-container">
      <table>
        <caption>Most Wasted Categories</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Item ID</th>
            <th>Category</th>
            <th>Waste Quantity</th>
            <th>Waste Cost</th>
          </tr>
        </thead>
        <tbody>
          {sortedData
            .slice(0, showAll ? sortedData.length : 10) // Only show 10 if showAll is false
            .map((item) => (
              <tr key={item.itemid}>
                <td>{item.name}</td>
                <td>{item.itemid}</td>
                <td>{item.categoryname}</td>
                <td>{item.quantity}</td>
                <td>{(item.priceperunit * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Button to toggle between showing all rows or just 10 */}
      <button onClick={handleShowAllClick} className="see-all-btn">
        {showAll ? "See Less" : "See All"}
      </button>
    </div>
  );
};

export default MostWastedItem;
