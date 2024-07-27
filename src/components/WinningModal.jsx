// WinningModal.jsx
import React from 'react';

const WinningModal = ({ score, bestScore, restartGame }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Win!</h2>
        <p>Your Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <button onClick={restartGame} className='win-button'>Play Again</button>
      </div>
    </div>
  );
};

export default WinningModal;
