import React, { useState } from 'react';
import Card from './Card';

const CardGrid = ({ cards, shuffleCards, setScore, setBestScore, onGameOver }) => {
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (card) => {
    if (clickedCards.includes(card.id)) {
      setScore(0);
      setClickedCards([]);
      onGameOver();
    } else {
      const newScore = clickedCards.length + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, card.id]);
      if (newScore > setBestScore) {
        setBestScore(newScore);
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
      <div className="btn">
        <button onClick={shuffleCards}><i className="fas fa-random"></i></button>
      </div>
    </div>
  );
};

export default CardGrid;
