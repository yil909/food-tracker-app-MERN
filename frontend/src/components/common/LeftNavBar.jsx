import { Link } from "react-router-dom";
import './LeftNavBar.css'; 
import logo from '../../assets/icons/logo.png';
//https://ant.design/components/icon
//npm install antd
//npm install @ant-design/icons

import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  BookOutlined,
  MessageOutlined,
  SoundOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const LeftNavBar = () => {
  return (
    <nav className="left-nav-bar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="logo-text">FOOD WASTE TRACKER</h1>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <HomeOutlined />Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inventory" className="nav-link">
            <ShoppingCartOutlined />Inventory
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reports" className="nav-link">
            <BarChartOutlined />Reports
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/notices" className="nav-link">
            <SoundOutlined />Notice
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <UserOutlined />Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/guide" className="nav-link">
            <BookOutlined/>Guide
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            <MessageOutlined/>Contact Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <SettingOutlined />Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            <LogoutOutlined />Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default LeftNavBar;