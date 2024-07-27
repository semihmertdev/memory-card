import React, { useState } from 'react';
import WarningModal from './WarningModal';

const StartScreen = ({ startGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleStartClick = () => {
    if (selectedDifficulty) {
      startGame(selectedDifficulty);
    } else {
      setShowWarning(true);
    }
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <div className="difficulty-selector">
        <div className={`color ${selectedDifficulty === 'easy' ? 'selected' : ''}`}>
          <label>
            <input
              type="radio"
              value="easy"
              checked={selectedDifficulty === 'easy'}
              onChange={handleDifficultyChange}
            />
            Easy
          </label>
        </div>

        <div className={`color ${selectedDifficulty === 'medium' ? 'selected' : ''}`}>
          <label>
            <input
              type="radio"
              value="medium"
              checked={selectedDifficulty === 'medium'}
              onChange={handleDifficultyChange}
            />
            Medium
          </label>
        </div>

        <div className={`color ${selectedDifficulty === 'hard' ? 'selected' : ''}`}>
          <label>
            <input
              type="radio"
              value="hard"
              checked={selectedDifficulty === 'hard'}
              onChange={handleDifficultyChange}
            />
            Hard
          </label>
        </div>
      </div>
      <button onClick={handleStartClick} className="start-game">Start Game</button>
      {showWarning && <WarningModal onClose={handleCloseWarning} />}
    </div>
  );
};

export default StartScreen;
