// import React, { useState } from 'react';
// import logoIcon from '../../../assets/icons/logo.png';
// import './Register.css';
//
// function Register() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [restaurantName, setRestaurantName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [contact, setContact] = useState('');
//
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // 处理注册逻辑
//   };
//
//   return (
//     <div className="register-container">
//       <div className="logo-pic">
//         <img src={logoIcon} alt="Logo" />
//       </div>
//       <div className="register-content">
//         <div className="small-icon-and-welcome">
//           <img src={logoIcon} alt="Small Icon" />
//           <h2>Join Us! </h2>
//         </div>
//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength="8"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="restaurantName">Restaurant Name</label>
//             <input
//               type="text"
//               id="restaurantName"
//               value={restaurantName}
//               onChange={(e) => setRestaurantName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="address">Address</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="city">City</label>
//             <input
//               type="text"
//               id="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="contact">Contact</label>
//             <input
//               type="text"
//               id="contact"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="register-button">Register</button>
//           <p className="login-link">
//             Already have an account? <a href="/login">Login here</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
//
// export default Register;
import React, { useState } from "react";
import axios from "axios";
import logoIcon from "../../../assets/icons/logo.png";
import "./Register.css";
import { LOCAL_IP, PORT } from "../../../../../backend/config.js";
import { useNavigate } from "react-router-dom";
import usePageTitleAndFavicon from "../../../hooks/usePageTitleAndFavicon.js";
import logo from "../../../assets/icons/logo.png";

function Register() {
  usePageTitleAndFavicon("Register - Food Waste Tracker", logo);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username: name,
      password,
      restaurantName,
      address,
      city,
      contact,
    };

    try {
      const response = await axios.post(
        `http://${LOCAL_IP}:${PORT}/register`,
        userData
      );
      // Assuming your backend sends a JSON response with a message on successful registration
      console.log(response.data.message); // Or handle redirection/success message here
      // Redirect the user or show a success message
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Failed to register:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to communicate with the server"
      );
    }
  };

  return (
    <div className="register-container">
      <div className="logo-pic">
        <img src={logoIcon} alt="Logo" />
        <div className="logo-text-food">Food Waste Tracker</div>
      </div>
      <div className="register-content">
        <div className="small-icon-and-welcome-r">
          <img src={logoIcon} alt="small-icon-and-welcome-r" />
          <h2>Join Us!</h2>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              placeholder="Create a password(at least 8 characters)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Restaurant's location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City where your restaurant is"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder="Your contact email"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
