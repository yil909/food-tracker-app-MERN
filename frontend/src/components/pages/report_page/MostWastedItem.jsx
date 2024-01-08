import { useEffect, useState } from "react";
import useItemWithCategoryName from "../../../hooks/useItemWithCategoryName.js";
import "./MostWastedItem.css";

const MostWastedItem = () => {
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
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.itemid}</td>
            <td>{item.categoryname}</td>
            <td>{item.quantity}</td>
            <td>{item.priceperunit * item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MostWastedItem;
