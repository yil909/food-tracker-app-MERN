import React from "react";
import Layout from "../common/Layout";
import "./Contact.css";
import { SendOutlined } from "@ant-design/icons";

const Contact = () => {
  return (
    <Layout>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Any question or remarks? Just write us a message!</p>
        <div className="contact-form">
          <div className="input-group">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone Number" />
          </div>
          <div className="subject-group">
            <label>Select Subject?</label>
            <div className="subject-options">
              {/* Message */}
              <button className="subject-button">General Inquiry</button>
              <button className="subject-button">Technique Issue</button>
            </div>
          </div>
          <textarea placeholder="Write your message..."></textarea>
          {/* Send Message */}
          <button className="send-message">
            <SendOutlined /> Send Message
          </button>
        </div>
        <div className="contact-info">
          {/* Informaation */}
          <p>
            <strong>Reach us</strong>: +1012 3456 789
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
