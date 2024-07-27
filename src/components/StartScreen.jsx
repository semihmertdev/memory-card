import React from 'react';

const StartScreen = ({ startGame }) => {
  return (
    <div className="start-screen">
      <button onClick={startGame} className="start-button">Start Game</button>
    </div>
  );
};

export default StartScreen;
