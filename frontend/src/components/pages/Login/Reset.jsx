import React, { useState } from 'react';
import logoIcon from '../../../assets/icons/logo.png'; 
import './Reset.css';

function Reset() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [doubleCheck, setDoubleCheck] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);  

    const handleSubmit = (event) => {
      event.preventDefault();
      if (newPassword !== doubleCheck) {
        setPasswordMismatch(true);  // 如果密码不匹配，设置状态为 true
        return;
      }
      setPasswordMismatch(false);  // 如果密码匹配，设置状态为 false
      // 在这里处理重置密码逻辑
    };

    const handleSendVerificationCode = (event) => {
      event.preventDefault();
      // 在这里处理发送验证码逻辑
      // 通常需要调用后端API发送验证码至用户的联系方式
    };

    return (
      <div className="reset-container">
        <div className="logo-pic">
          <img src={logoIcon} alt="Logo" />
        </div>
        <div className="reset-content">
          <div className="small-icon-and-welcome">
            <img src={logoIcon} alt="Small Icon" />
            <h2>Retrieve Your Account!  </h2>
          </div>
          <form className="reset-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              />
            </div>
            <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="doublecheck">New Password Confirmation</label>
            <input
              type="password"
              id="doublecheck"
              value={doubleCheck}
              onChange={(e) => setDoubleCheck(e.target.value)}
              required
            />
            {passwordMismatch && <p className="password-mismatch">Passwords do not match.</p>}
          </div>

          <div className="form-group">
            <label htmlFor="verificationCode" className="verification-label">Verification Code</label>
            <div className="verification-input-group">
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="sendVerificationCode-button"
                onClick={handleSendVerificationCode}
              >
                Send
              </button>
            </div>
          </div>

          <p className="verification-info">Verification code is valid for 5 minutes.</p>

          <button type="submit" className="reset-button">Reset</button>
        </form>
        </div>
      </div>
    );
}

export default Reset;