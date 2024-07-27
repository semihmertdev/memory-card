import React from 'react';

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className='header'>
        <h1>Memory Game</h1>
        <div className="scores">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    </div>
  );
};

export default Scoreboard;
