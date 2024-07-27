import React from 'react';

const Scoreboard = ({ score, bestScore, timer }) => {
  return (
    <div className='header'>
      <h1>Memory Game</h1>
      <div className="scores">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <p>Time Left: {timer}s</p> {/* Display remaining time */}
      </div>
    </div>
  );
};

export default Scoreboard;
