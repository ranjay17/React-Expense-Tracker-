import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import ExpenseTracking from "./ExpenseTracking";

const Home = () => {
  const navigate = useNavigate();

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
        const msg = data.error?.message?.replace(/_/g, " ") || "Unknown error";
        alert(`Error: ${msg}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    alert("Logout successfully!");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1>Welcome to Expense Tracker!!</h1>

        <Link to="/update">
          <button className="complete-btn">
            Your Profile is incomplete. Complete now
          </button>
        </Link>

        <button className="verify-btn" onClick={handleVerifyEmail}>
          Verify Email
        </button>
      </div>
      <div>
        <hr className="divider" />
      </div>
      <div className="expense-section">
        <ExpenseTracking />
      </div>
    </div>
  );
};

export default Home;
