import React, { useState } from "react";
import Layout from "../common/Layout";
import "./Contact.css";
import { SendOutlined } from "@ant-design/icons";

const Contact = () => {
  // Track the active button
  const [activeSubject, setActiveSubject] = useState("General Inquiry");

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
  };
  return (
    <Layout>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="custom-message">
          Any question or remarks? Just write us a message!
        </p>
        <div className="contact-form">
          {/* Input group for name fields */}
          <div className="input-group">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          {/* Input group for email and phone number */}
          <div className="input-group">
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone Number" />
          </div>
          {/* Subject selection group */}
          <div className="subject-group">
            <label>Select Subject?</label>
            <div className="subject-options">
              <button
                className={`subject-button ${
                  activeSubject === "General Inquiry" ? "active" : ""
                }`}
                onClick={() => handleSubjectClick("General Inquiry")}
              >
                General Inquiry
              </button>
              <button
                className={`subject-button ${
                  activeSubject === "Technique Issue" ? "active" : ""
                }`}
                onClick={() => handleSubjectClick("Technique Issue")}
              >
                Technique Issue
              </button>
            </div>
          </div>
          {/* Message input group */}
          <div className="message-group">
            <textarea placeholder="Write your message..."></textarea>
          </div>
          {/* Send message button */}
          <button className="send-message">
            <SendOutlined /> Send Message
          </button>
        </div>
        {/* Contact information section */}
        <div className="contact-info">
          <p>
            <strong>Reach us:</strong> +1012 3456 789
          </p>
          <p>demo@gmail.com</p> {/* Add email address */}
          <p>Unleash Space 20 Symonds Street</p> {/* Add address */}
          <p>Auckland CBD, Auckland 1010</p>{" "}
        </div>
      </div>
    </Layout>
  );
};

// Exporting the component
export default Contact;
