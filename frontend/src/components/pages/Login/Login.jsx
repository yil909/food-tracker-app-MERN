import React, { useState } from 'react';
import logoIcon from '../../../assets/icons/logo.png';
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理登录逻辑
  };

  return (
    <div className="login-container">
      <div className="icon">
      <img src={logoIcon} alt="icon" />
      </div>
      <div className="login-content">
        <div className="small-icon-and-welcome">
        <img src={logoIcon} alt="small-icon-and-welcome" />
          <h2>Welcome to Food Waste Tracker! </h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
            />
          </div>
          <div className="forgot-password">
            <button>Forgot Password?</button>
          </div>
          <button type="submit" className="login-button">Login</button>
          <a href="/register" className="register-link">Don't have an account? Register</a>
        </form>
      </div>
    </div>
  );
}

export default Login;