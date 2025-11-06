import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import ExpenseTracking from "./ExpenseTracking";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    navigate("/update");
  };

  return (
    <div className="home-container">
      <div className="header">
        <h2>Welcome to Expense Tracker</h2>
        <div className="header-buttons">
          <button onClick={handleUpdateProfile} className="update-btn">
            Update Profile
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <ExpenseTracking />
    </div>
  );
};

export default Home;
