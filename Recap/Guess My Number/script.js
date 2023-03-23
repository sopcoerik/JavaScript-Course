'use strict';

// Variable Declarations

let game = true;
let score = 20;
let highscore = 0;

const checkButton = document.querySelector('.check');
const guessField = document.querySelector('.guess');
const hiddenField = document.querySelector('.number');
const message = document.querySelector('.message');
const highscoreDOM = document.querySelector('.highscore');
const scoreDOM = document.querySelector('.score');
const tryAgainButton = document.querySelector('.again');
const body = document.querySelector('body');

// Functions

// Secret Number Generator
const generateRandomSecretNumber = () => Math.trunc(Math.random() * 20) + 1;
const secretNumber = generateRandomSecretNumber();

// Message change
const changeMessage = messageToShow => (message.textContent = messageToShow);

// Change Score
const decrementScore = () => {
  --score;
  scoreDOM.textContent = score;
};

// Change Hidden Field
const revealHiddenField = () => {
  hiddenField.textContent = secretNumber;
  hiddenField.style.fontSize = '8rem';
  hiddenField.style.width = '20rem';
};

// Game Logic
const PlayerWins = () => {
  revealHiddenField();
  changeMessage('Nailed it!🔨 You win!');
  if (score > highscore) {
    highscore = score;
    highscoreDOM.textContent = highscore;
  }
  body.style.backgroundColor = '#60b347';
  game = false;
  return 0;
};

const valueIsTooLow = () => {
  changeMessage('Too Low! Try Again!');
  decrementScore();
};

const valueIsTooHigh = () => {
  changeMessage('Too High! Try Again!');
  decrementScore();
};

const checkGuess = () => {
  if (score > 1) {
    if (guessField.value == secretNumber) {
      PlayerWins();
    }
    if (guessField.value < secretNumber) {
      valueIsTooLow();
    }
    if (guessField.value > secretNumber) {
      valueIsTooHigh();
    }
  } else {
    changeMessage('You Lost! 👎');
    scoreDOM.textContent = 0;
    score = 0;
    if (score == 0) game = false;
  }
};

const reset = () => {
  body.style.backgroundColor = '#222';
  hiddenField.style.fontSize = '6rem';
  hiddenField.style.width = '15rem';
  guessField.value = '';
  hiddenField.textContent = '?';
  message.textContent = 'Start Guessing...';
  score = 20;
  scoreDOM.textContent = score;
  secretNumber = generateRandomSecretNumber();
  game = true;
};

const runGame = () => {
  if (game == true) {
    checkButton.addEventListener('click', checkGuess);

    tryAgainButton.addEventListener('click', reset);
  }
};

// Running the game
runGame();
