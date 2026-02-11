import React, { useState } from "react";
// import bgImage from "../assets/car-bg.avif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../index.css";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    address: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LOCAL_URL = "http://localhost:3000";
  const PUBLIC_URL = "https://jk-automobile-9xtf.onrender.com";

  const url = location.hostname === "localhost" ? LOCAL_URL : PUBLIC_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOTP = () => {
    if (formData.email === "") {
      return;
    }
    axios
      .post(
        `${url}/api/auth/verify/user`,
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(
          "Error sending OTP:",
          error.response ? error.response.data : error.message
        );
        alert(
          error.response?.data?.message ||
            "Failed to send OTP. Please try again."
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/auth/register/user`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(
          "Error during registration:",
          error.response ? error.response.data : error.message
        );
        alert(
          error.response?.data?.message ||
            "Registration failed. Please check your details."
        );
      });
  };

  return (
    <div className="container-sign">
      <div className="card">
        <h2>Create Account</h2>
        <p className="subtitle">Join our platform and start your journey.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="row">
            <div className="field grow">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                onChange={handleChange}
                name="email"
                required
              />
            </div>

            <button type="button" onClick={handleOTP} className="verify-btn">
              Verify
            </button>
          </div>

          <div className="field">
            <label>One Time Password</label>
            <input
              type="text"
              className="otp"
              onChange={handleChange}
              name="otp"
              required
            />
          </div>

          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={handleChange}
              name="name"
              required
            />
          </div>
          <div className="field">
            <label>Complete Address</label>
            <input
              type="text"
              placeholder="Enter your Complete Address"
              onChange={handleChange}
              name="address"
              required
            />
          </div>

          {/* Password */}
          <div className="field">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onChange={handleChange}
                name="password"
                required
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="field">
            <label>Mobile Number</label>
            <input type="text" onChange={handleChange} name="number" required />
          </div>

          {/* Checkbox */}
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={handleChange}
              name="check"
              required
            />
            <span>I agree to the Terms & Conditions</span>
          </div>

          {/* Submit */}
          <button className="submit-btn" type="submit">
            Create Account
          </button>

          <p className="signin">
            Already have an account? <a href="#">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
