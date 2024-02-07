import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../../backend/config.js";
import "./LeftNavBar.css";
import logo from "../../assets/icons/logo.png";
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
} from "@ant-design/icons";
// import * as console from "console";

const LeftNavBar = ({ children, isVisible }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navBarClass = isVisible ? "left-nav-bar" : "left-nav-bar hidden";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    axios.get(`http://${LOCAL_IP}:${PORT}/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
        .then(res => {
          setIsAdmin(res.data.user.is_admin ? true : false);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
  }, []);

  useEffect(() => {
    console.log(isAdmin);
  }, [isAdmin]);

  return (
      <nav className={navBarClass}>
        {children}
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-image" />
          <h1 className="logo-text">FOOD WASTE TRACKER</h1>
        </div>
        <ul className="nav-list">
          {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <HomeOutlined />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/guide" className="nav-link">
                    <BookOutlined />
                    Guide
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    <MessageOutlined />
                    Contact Us
                  </Link>
                </li>
              </>
          )}
          {!isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/inventory" className="nav-link">
                    <ShoppingCartOutlined />
                    Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reports" className="nav-link">
                    <BarChartOutlined />
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/notices" className="nav-link">
                    <SoundOutlined />
                    Notice
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <UserOutlined />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/guide" className="nav-link">
                    <BookOutlined />
                    Guide
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    <MessageOutlined />
                    Contact Us
                  </Link>
                </li>
              </>
          )}
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <SettingOutlined />
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <LogoutOutlined />
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
  );
};

export default LeftNavBar;

// import { Link } from "react-router-dom";
// import "./LeftNavBar.css";
// import logo from "../../assets/icons/logo.png";
// import {
//   HomeOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
//   BarChartOutlined,
//   BookOutlined,
//   MessageOutlined,
//   SoundOutlined,
//   SettingOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
//
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {LOCAL_IP, PORT} from "../../../../backend/config.js";
//
//
// const LeftNavBar = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//
//
//   useEffect(() => {
//     // 假设 JWT 存储在 localStorage 中
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('No token found');
//       return;
//     }
//
//     axios.get(`http://${LOCAL_IP}:${PORT}/getUser`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//         .then(res => {
//           setIsAdmin(res.data.user.is_admin ? true : false);
//         })
//         .catch(err => {
//           console.log('Error fetching user data:', err);
//         });
//   }, []);
//
//
//   useEffect(() => {
//     console.log(isAdmin)
//   }, [isAdmin]);
//
//   return (
//       <nav className="left-nav-bar">
//         <div className="logo-section">
//           <img src={logo} alt="Logo" className="logo-image" />
//           <h1 className="logo-text">FOOD WASTE TRACKER</h1>
//         </div>
//         <ul className="nav-list">
//           {/*管理员*/}
//           {isAdmin && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/" className="nav-link">
//                     <HomeOutlined />
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/guide" className="nav-link">
//                     <BookOutlined />
//                     Guide
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/contact" className="nav-link">
//                     <MessageOutlined />
//                     Contact Us
//                   </Link>
//                 </li>
//               </>
//           )}
//           {/*非管理员显示*/}
//           {!isAdmin && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/inventory" className="nav-link">
//                     <ShoppingCartOutlined />
//                     Inventory
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/reports" className="nav-link">
//                     <BarChartOutlined />
//                     Reports
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/notices" className="nav-link">
//                     <SoundOutlined />
//                     Notice
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/profile" className="nav-link">
//                     <UserOutlined />
//                     Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/guide" className="nav-link">
//                     <BookOutlined />
//                     Guide
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/contact" className="nav-link">
//                     <MessageOutlined />
//                     Contact Us
//                   </Link>
//                 </li>
//               </>
//           )}
//           {/*不控制的*/}
//           <li className="nav-item">
//             <Link to="/settings" className="nav-link">
//               <SettingOutlined />
//               Settings
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/login" className="nav-link">
//               <LogoutOutlined />
//               Log Out
//             </Link>
//           </li>
//         </ul>
//       </nav>
//
//   );
// };
//
// export default LeftNavBar;

