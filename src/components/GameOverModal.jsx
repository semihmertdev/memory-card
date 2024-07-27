import React from 'react';

const GameOverModal = ({ score, bestScore, restartGame }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>Score: {score}</p> {/* Displays the final score */}
        <p>Best Score: {bestScore}</p>
        <button onClick={restartGame} className="restart-button">Restart Game</button>
      </div>
    </div>
  );
};

export default GameOverModal;
