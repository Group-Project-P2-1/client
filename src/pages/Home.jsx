import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Batu Gunting Kertas</h1>
      <p>Selamat datang di permainan Batu Gunting Kertas! Siap untuk bermain?</p>
      <Link to="/game">
        <button className="start-button">Mulai Permainan</button>
      </Link>
    </div>
  );
};

export default Home;
