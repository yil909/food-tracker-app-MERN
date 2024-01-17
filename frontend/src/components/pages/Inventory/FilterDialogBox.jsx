import PropTypes from "prop-types";
import {useState} from "react";
const FilterDialogBox = ({allCategories, onClose, onCategorySelect, filterClickChange}) => {

    const [selectedCategory, setSelectedCategory] = useState("");
    function handleCategoryChange (e) {
        setSelectedCategory(e.target.value);
    }
    function handleFilterClick () {
        onCategorySelect(selectedCategory);
        filterClickChange(true);
        onClose();
    }

    function handleSeeAllClick (){
        filterClickChange(false);
    }

    return (
        <div>
            <h2>Filter by</h2>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {allCategories.map(category => (
                    <option key={category.categoryname} value={category.categoryname}>
                        {category.categoryname}
                    </option>
                ))}
            </select>
            <button onClick={handleFilterClick}>Filter</button>
            <button onClick={handleSeeAllClick}>See all</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

FilterDialogBox.propTypes = {
    onClose: PropTypes.func.isRequired,
    allCategories: PropTypes.array.isRequired,
    onCategorySelect: PropTypes.func.isRequired,
    filterClickChange: PropTypes.func.isRequired,
};


export default FilterDialogBox;

