import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import StartScreen from './components/StartScreen';
import GameOverModal from './components/GameOverModal';
import gameOverSoundFile from './assets/gameover.wav';
import bgMusicFile from './assets/more-time.mp3';
import lowTimeMusicFile from './assets/low-time.mp3';

const App = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [timer, setTimer] = useState(0);
  const [bgMusic, setBgMusic] = useState(null);
  const [lowTimeMusic, setLowTimeMusic] = useState(null);
  const [lowTimeTriggered, setLowTimeTriggered] = useState(false);

  useEffect(() => {
    if (!bgMusic) {
      const bgAudio = new Audio(bgMusicFile);
      bgAudio.loop = true;
      setBgMusic(bgAudio);
    }
    if (!lowTimeMusic) {
      const lowTimeAudio = new Audio(lowTimeMusicFile);
      lowTimeAudio.loop = true;
      setLowTimeMusic(lowTimeAudio);
    }
  }, [bgMusic, lowTimeMusic]);

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
      if (difficulty === 'easy') setTimer(60);
      else if (difficulty === 'medium') setTimer(45);
      else if (difficulty === 'hard') setTimer(30);

      if (bgMusic) {
        bgMusic.play();
      }
    } else {
      if (bgMusic) bgMusic.pause();
      if (lowTimeMusic) lowTimeMusic.pause();
    }
  }, [gameStarted, difficulty, bgMusic, lowTimeMusic]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0 && gameStarted) {
      handleGameOver();
    }
  }, [timer, gameStarted]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    if (timer <= 10 && gameStarted && !lowTimeTriggered) {
      if (bgMusic) bgMusic.pause();
      if (lowTimeMusic) lowTimeMusic.play();
      setLowTimeTriggered(true);
    } else if (timer > 10 && gameStarted && lowTimeTriggered) {
      if (lowTimeMusic) lowTimeMusic.pause();
      if (bgMusic) bgMusic.play();
      setLowTimeTriggered(false);
    }
  }, [timer, gameStarted, lowTimeTriggered, bgMusic, lowTimeMusic]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setClickedCards([]);
    setLowTimeTriggered(false);
    if (selectedDifficulty === 'easy') setTimer(60);
    else if (selectedDifficulty === 'medium') setTimer(45);
    else if (selectedDifficulty === 'hard') setTimer(30);
    if (lowTimeMusic) lowTimeMusic.pause();
    if (bgMusic) bgMusic.play();
  };

  const handleGameOver = () => {
    setFinalScore(score);
    setGameOver(true);
    setGameStarted(false);
    setTimer(0);
    playGameOverSound();
    if (bgMusic) bgMusic.pause();
    if (lowTimeMusic) lowTimeMusic.pause();
  };

  const playGameOverSound = () => {
    const gameOverSound = new Audio(gameOverSoundFile);
    gameOverSound.play();
  };

  const restartGame = () => {
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setFinalScore(0);
    setDifficulty(null);
    setGameStarted(false);
    setTimer(0);
    setLowTimeTriggered(false);
    if (lowTimeMusic) lowTimeMusic.pause();
    if (bgMusic) bgMusic.pause();
  };

  return (
    <div>
      {!gameStarted && !gameOver ? (
        <StartScreen startGame={startGame} />
      ) : (
        <>
          <Scoreboard score={score} bestScore={bestScore} timer={timer} />
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
