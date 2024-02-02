import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子
import logoIcon from '../../../assets/icons/logo.png';
import './Login.css';
import { LOCAL_IP, PORT } from "../../../../../backend/config.js";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // 重置错误信息

    try {
      const response = await axios.post(`http://${LOCAL_IP}:${PORT}/login`, {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token); // 将 token 保存到 localStorage

      // 根据用户角色决定重定向的页面
      if (response.data.isAdmin === 1) {
        navigate('/');
      } else {
        navigate('/inventory');
      }
    } catch (error) {
      // 处理错误
      if (error.response) {
        setError(error.response.data.error || '发生错误，请再试一次。');
      } else if (error.request) {
        setError('服务器无响应，请稍后再试。');
      } else {
        setError('错误：' + error.message);
      }
    }
  };



  return (
      <div className="login-container">
        <div className="logo-pic">
          <img src={logoIcon} alt="Logo" />
        </div>
        <div className="login-content">
          <div className="small-icon-and-welcome">
            <img src={logoIcon} alt="small-icon-and-welcome" />
            <h2>Welcome to Food Waste Tracker!</h2>
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
            {error && <div className="login-error">{error}</div>}
            <div className="forgot-password">
              <a href="/reset" className="forgot-password-link">Forgot password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
            <a href="/register" className="register-link">Don't have an account? Register</a>
          </form>
        </div>
      </div>
  );
}

export default Login;

