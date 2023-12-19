
import React from "react";
import LeftNavBar from "../common/LeftNavBar.jsx";
import FoodItemDisplay from "../pages/FoodItemDisplay.jsx";
import OverallWaste from "../pages/report_page/OverallWaste.jsx";
import ReportPage from "../pages/report_page/ReportPage.jsx";


const Home = () => {
    return (
        <>
            {/* <LeftNavBar /> */}
            <FoodItemDisplay />
        </>
    );
}

export default Home;