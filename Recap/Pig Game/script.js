'use strict';

// Main game runs
let game = true;

// Main Scores
const mainScorePlayer0 = document.querySelector('#score--0');
const mainScorePlayer1 = document.querySelector('#score--1');

// Current Scores
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');

// Buttons
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// Dice
const dice = document.querySelector('.dice');

dice.classList.add('hidden');
mainScorePlayer0.textContent = '';
mainScorePlayer1.textContent = '';

let currentScore = 0;
let currentPlayer = 0;
let score = [0, 0];

//------------------------------------------------------------------------------

const switchPlayers = () => {
  if (game) {
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    currentScore = 0;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  }
};

rollButton.addEventListener('click', () => {
  // Roll and reveal dice
  if (game) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    currentScore += diceNumber;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;

    if (diceNumber === 1) {
      switchPlayers();
    }
  }
});

//-------------------------------------------------------------------------------

const assignMainScore = () => {
  score[currentPlayer] += currentScore;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    score[currentPlayer];
};

const checkIfCurrentPlayerIsWinner = () => {
  if (score[currentPlayer] >= 20) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    game = false;
  }
};

holdButton.addEventListener('click', () => {
  if (game) {
    assignMainScore();
    checkIfCurrentPlayerIsWinner();
    switchPlayers();
  }
});

// ----------------------------------------------------------------------------------------

// Reset
newButton.addEventListener('click', () => {
  dice.classList.add('hidden');
  mainScorePlayer0.textContent = '';
  mainScorePlayer1.textContent = '';
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScore = 0;
  currentPlayer = 0;
  score = [0, 0];
  game = true;
});
