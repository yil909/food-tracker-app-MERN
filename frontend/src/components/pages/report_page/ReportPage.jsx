import React from "react";
import OverallWaste from "./OverallWaste.jsx";
import NearingExpiration from "./NearingExpiration.jsx";
import WasteOverTime from "./WasteOverTime.jsx";
import MostWastedItem from "./MostWastedItem.jsx";
import Layout from "../../common/Layout.jsx";
import "./ReportPage.css";
import usePageTitleAndFavicon from "../../../hooks/usePageTitleAndFavicon";
import logo from "../../../assets/icons/logo.png";

const ReportPage = () => {
  usePageTitleAndFavicon("Report - Food Waste Tracker", logo);
  return (
    <Layout>
      <div className="report-container">
        <h1 className="report-title">Report</h1>
        <div className="top-section">
          <div className="overall-waste-container">
            <div className="overall-waste-title">Overview</div>
            <div className="overall-waste-value">
              <OverallWaste /> {/* Just for the value */}
            </div>
            <div className="overall-waste-label">Total Waste</div>
          </div>
          <div className="nearing-expiration-container">
            <h3 className="NearingExpiration-title">Food Nearing Expiration</h3>
            <NearingExpiration />
          </div>
        </div>
        <div className="waste-over-time-container">
          <h3 className="wasteOT-title">Waste Over Time</h3>
          <WasteOverTime />
        </div>
        <div className="most-wasted-item-container">
          <MostWastedItem />
        </div>
      </div>
    </Layout>
  );
};


export default ReportPage;
