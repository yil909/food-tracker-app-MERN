// Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import LeftNavBar from "./LeftNavBar";
import "./Layout.css";
// import logo from "../../assets/icons/logo.png";
import profilelogo from "../../assets/icons/profile.png";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <LeftNavBar />
      <div className="main-content">
        <div className="header">
          <Input
            className="search-bar"
            placeholder="Search item"
            prefix={<SearchOutlined />}
          />
          <div className="header-icons">
            <Link to="/notices">
              <BellOutlined className="bell-icon" />
            </Link>
            <Link to="/profile">
              <img
                src={profilelogo}
                alt="Restaurant Logo"
                className="user-restaurant"
              />
            </Link>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
