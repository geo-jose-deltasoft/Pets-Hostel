import React, { useState } from "react";
import "../../assets/styles/SignupPopup.css";
import LoginPopup from "./LoginPopup";
import axios from "axios";

const SignupPopup = ({ onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [name, setName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://api.orianacare.com/api/v1/auth/register",
        {
          name: name,
          email: email,
          mobile_number: mobileNum,
          user_name: username,
          password: password,
          role: "USER",
        }
      );

      const data = response.data;

      if (response.status === 201) {
        onClose();
      } else {
        console.error("Signup failed", data);
      }
    } catch (error) {
      console.error("Error during signup", error);
      alert("Signup failed: " + error.response.data.msg);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="popup2">
        <div className="popup-content2">
          <button className="close-button2" onClick={onClose}>
            ×
          </button>
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-button2" onClick={handleSignUp}>
            Sign Up
          </button>

          <button className="login-button2" onClick={handleLogin}>
            Already a user? Login
          </button>
        </div>
        {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}
      </div>
    </div>
  );
};

export default SignupPopup;
