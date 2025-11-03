import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const handleVerifyEmail = async () => {
    try {
      const idToken = localStorage.getItem("token");

      if (!idToken) {
        alert("Please login again. No valid token found.");
        return;
      }

      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Verification email sent successfully! Check your inbox.");
        console.log("Response:", data);
      } else {
        // Firebase error codes handle
        switch (data.error.message) {
          case "INVALID_ID_TOKEN":
            alert("Your session expired. Please login again.");
            break;
          case "USER_NOT_FOUND":
            alert("User not found. Please register again.");
            break;
          default:
            alert(`Error: ${data.error.message}`);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Expense Tracker!!</h1>
      <Link to="/update">
        <button className="complete-btn">
          Your Profile is incomplete. Complete now
        </button>
      </Link>
      <div>
        <button className="verify-btn" onClick={handleVerifyEmail}>
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Home;
