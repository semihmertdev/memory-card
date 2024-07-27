import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';

const App = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchCards = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
      const data = await response.json();
      const fetchedCards = await Promise.all(data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url);
        const pokemonDetails = await pokemonData.json();
        return {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
        };
      }));
      setCards(fetchedCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  return (
    <div>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} shuffleCards={shuffleCards} setScore={setScore} setBestScore={setBestScore} />
    </div>
  );
};

export default App;
