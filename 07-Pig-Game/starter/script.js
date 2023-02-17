'use strict';

//Game Initialization
let game = true;

//Player 1
const finalScorePlayer1 = document.getElementById('score--0');
const currentScorePlayer1 = document.getElementById('current--0');
const player1 = document.querySelector('.player--0');

//Player 2
const finalScorePlayer2 = document.getElementById('score--1');
const currentScorePlayer2 = document.getElementById('current--1');
const player2 = document.querySelector('.player--1');

//Global Items
const dice = document.querySelector('.dice');

let currentScore = 0;
let activePlayer = 0;
let finalScore = [0, 0];

//Buttons
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdCurrentScore = document.querySelector('.btn--hold');

//Value Initialization
finalScorePlayer1.textContent = 0;
finalScorePlayer2.textContent = 0;
dice.classList.add('hidden');

//endgame
const endgame = function () {
  if (finalScore[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    game = false;
    currentScorePlayer1.textContent = 0;
    currentScorePlayer2.textContent = 0;
  }
};

//New Game
newGame.addEventListener('click', function () {
  document.querySelector(`.player--winner`).classList.remove('player--winner');
  currentScore = 0;
  finalScore = [0, 0];
  finalScorePlayer1.textContent = 0;
  finalScorePlayer2.textContent = 0;
  dice.classList.add('hidden');
  game = true;
});

//Roll the dice
rollDice.addEventListener('click', function () {
  if (game) {
    endgame();
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    //Check if it's more than 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (diceNumber === 1) {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
    }
  }
});

holdCurrentScore.addEventListener('click', function () {
  if (game) {
    finalScore[activePlayer] += currentScore;
    console.log(finalScore);
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScore[activePlayer];
    endgame();
    if (game) {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
    }
  }
});
