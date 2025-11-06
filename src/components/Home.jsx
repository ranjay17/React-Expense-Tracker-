import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import ExpenseTracking from "./ExpenseTracking";
import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="header">
        <h2>Welcome to Expense Tracker</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <ExpenseTracking />
    </div>
  );
};

export default Home;
