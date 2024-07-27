import React, { useEffect } from 'react';

import gameOverSoundFile from '../assets/gameover.wav'; // Import the audio file

const GameOverModal = ({ score, bestScore, restartGame }) => {
  useEffect(() => {
    const gameOverSound = new Audio(gameOverSoundFile);
    gameOverSound.play();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>Better luck next time!</p> {/* Added paragraph */}
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <button onClick={restartGame} className="restart-button">Restart Game</button>
      </div>
    </div>
  );
};

export default GameOverModal;
