
//import Inventory from "../pages/Inventory.jsx";
import LeftNavBar from "../common/LeftNavBar.jsx";
import React from "react";
import FoodCategoryList from "../pages/FoodCategoryList.jsx";


const Home = () => {
    return (
        <>

            <LeftNavBar />
            <FoodCategoryList />

        </>
    );
}

export default Home;