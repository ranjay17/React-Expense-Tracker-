import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Welcome to Expense Tracker!!</h1>
      <Link to='/update'>
        <button className='complete-btn'>Your Profile is incomplete. complete now</button>
      </Link>
    </div>
  );
}

export default Home
