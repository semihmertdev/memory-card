import React from 'react';

const DifficultySelector = ({ startGame }) => {
  return (
    <div className="difficulty-selector">
      <h2>Select Difficulty</h2>
      <button onClick={() => startGame('easy')}>Easy (60s)</button>
      <button onClick={() => startGame('medium')}>Medium (45s)</button>
      <button onClick={() => startGame('hard')}>Hard (30s)</button>
    </div>
  );
};

export default DifficultySelector;
