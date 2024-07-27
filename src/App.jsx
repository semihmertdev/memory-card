import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import StartScreen from './components/StartScreen';
import GameOverModal from './components/GameOverModal';

const App = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0); // New state for final score
  const [clickedCards, setClickedCards] = useState([]);

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
    if (gameStarted) {
      fetchCards();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setClickedCards([]);
  };

  const handleGameOver = () => {
    setFinalScore(score); // Set final score when game ends
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setClickedCards([]);
    fetchCards(); // Fetch new cards
    setGameOver(false); // Hide the modal
    setFinalScore(0); // Reset final score for the next game
  };

  return (
    <div>
      {!gameStarted ? (
        <StartScreen startGame={startGame} />
      ) : (
        <>
          <Scoreboard score={score} bestScore={bestScore} />
          <CardGrid cards={cards} shuffleCards={shuffleCards} setScore={setScore} setBestScore={setBestScore} onGameOver={handleGameOver} />
          {gameOver && (
            <GameOverModal score={finalScore} bestScore={bestScore} restartGame={restartGame} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
