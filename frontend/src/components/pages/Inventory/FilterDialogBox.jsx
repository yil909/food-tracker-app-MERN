import PropTypes from "prop-types";
import { useState } from "react";
import "./FilterDialogBox.css";

const FilterDialogBox = ({
  allCategories,
  onClose,
  onCategorySelect,
  filterClickChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleFilterClick() {
    onCategorySelect(selectedCategory);
    filterClickChange(true);
    onClose();
  }

  function handleSeeAllClick() {
    onCategorySelect(""); // Reset filter
    filterClickChange(false);
    onClose();
  }

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal-box">
        <h2 style={{ fontFamily: "Arial, sans-serif" }}>Filter by Category</h2>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {allCategories.map((category) => (
            <option key={category.categoryname} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
        </select>
        <div className="filter-modal-actions">
          <button className="filter-modal-button" onClick={handleFilterClick}>
            Apply Filter
          </button>
          <button className="filter-modal-button" onClick={handleSeeAllClick}>
            See All
          </button>
          <button className="filter-modal-button cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

FilterDialogBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  allCategories: PropTypes.array.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  filterClickChange: PropTypes.func.isRequired,
};

export default FilterDialogBox;
