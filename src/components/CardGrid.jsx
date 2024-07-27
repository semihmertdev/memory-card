// CardGrid.jsx
import React, { useState } from 'react';
import Card from './Card';

const CardGrid = ({ cards, shuffleCards, setScore, setBestScore, onGameOver, onGameWon }) => {
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (card) => {
    if (clickedCards.includes(card.id)) {
      setScore(0);
      setClickedCards([]);
      onGameOver(); // Call onGameOver when a card is clicked twice
    } else {
      const newScore = clickedCards.length + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, card.id]);
      if (newScore > setBestScore) {
        setBestScore(newScore);
      }
      if (newScore === cards.length) { // Check if all cards have been clicked
        onGameWon(); // Call onGameWon when the game is won
      }
    }
    shuffleCards();
  };

  return (
    <div className='main'>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
