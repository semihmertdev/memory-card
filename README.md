# Pokemon Memory Game

## Live Preview
[Play the Pokemon Memory Game](https://poke-memory-card.netlify.app/)

## Description
This is a fun and interactive memory game built with React, featuring Pokemon characters. Test your memory by clicking on Pokemon cards, but be careful not to click the same one twice!

## Technologies Used
- React
- JavaScript (ES6+)
- CSS3
- PokeAPI

## Features
- Dynamic fetching of Pokemon data from PokeAPI
- Randomized card shuffling after each click
- Score tracking with current and best score display
- Game over modal with final score and restart option
- Attractive Pokemon-themed UI
- Difficulty selection with different time limits
- Warning modal for unselected difficulty
- Background music during gameplay
- Special music track when time is running out

## Component Structure
- **App**: Main game logic and state management
- **StartScreen**: Initial game screen with difficulty selection
- **Scoreboard**: Displays current and best scores, and time left
- **CardGrid**: Manages the display and interaction of Pokemon cards
- **Card**: Individual Pokemon card component
- **GameOverModal**: Displayed when the game ends or time runs out
- **WinningModal**: Displayed when the player wins the game
- **WarningModal**: Displayed if no difficulty is selected on the start screen

## How to Play
1. Select a difficulty level on the initial screen.
2. Click the "Start Game" button to begin.
3. Click on a Pokemon card to earn a point.
4. Try to click all cards without repeating any.
5. If you click the same card twice, the game ends.
6. Aim for the highest score possible!
7. The game also ends when time runs out, depending on the selected difficulty.
8. When the game ends, a modal will appear showing your final score and the best score, with an option to restart the game.
9. If you manage to click all cards without repetition, a winning modal will appear with a different sound effect.

Enjoy and have fun testing your memory with Pokemon!
