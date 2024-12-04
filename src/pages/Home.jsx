import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  return (
    <div 
      // className="home-container"
      style={{
        height: "80vh",
      }}
      className='d-flex flex-column justify-content-center align-items-center'
    >
      <h1>Rock Paper Scissors Battle</h1>
      <p>Welcome to the Rock Paper Scissors game! Ready to play?</p>
      <Link to="/listRoom">
        <button className="start-button">Start the Game</button>
      </Link>
    </div>
  );
};

export default Home;