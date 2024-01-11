import React, { useState } from "react";
import Layout from "../common/Layout";
import "./Contact.css";
import { SendOutlined } from "@ant-design/icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: 'User Inquiry',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('http://localhost:5555/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setIsSending(false);

      if (response.ok) {
        alert('Email sent successfully');
        // Reset form or handle success
      } else {
        alert('Failed to send email');
        // Handle error
      }
    } catch (error) {
      setIsSending(false);
      console.error('Error:', error);
    }
  };

  return (
      <Layout>
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p className="custom-message">
            Any question or remarks? Just write us a message!
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="First Name" name="firstName" onChange={handleInputChange} />
              <input type="text" placeholder="Last Name" name="lastName" onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email" name="email" onChange={handleInputChange} />
              <input type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleInputChange} />
            </div>
            <div className="message-group">
              <textarea placeholder="Write your message..." name="message" onChange={handleInputChange}></textarea>
            </div>
            <button type="submit" className="send-message">
              <SendOutlined /> {isSending ? "Sending" : "Send Message"}
            </button>
          </form>
          <div className="contact-info">
            {/* Contact information section */}
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

export default Contact;
