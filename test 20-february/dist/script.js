"strict mode";

WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let game = true;

const restart = document.getElementById("restart");
restart.classList.add("hidden");

const playerX = document.querySelector(".player--X");
const playerO = document.querySelector(".player--O");
const scoreX = document.querySelector(".score--X");
const scoreO = document.querySelector(".score--O");
const winner = document.querySelector(".winner");

const score = {
  X: 0,
  O: 0,
};

const moves = {
  X: [],
  O: [],
};

var activePlayer = "X";

const cells = document.querySelectorAll(".cell");

const getNextActivePlayer = () => (activePlayer == "X" ? "O" : "X");

const goToNextPlayer = () => {
  playerX.classList.toggle("active--player");
  playerO.classList.toggle("active--player");
  activePlayer = getNextActivePlayer();
};

const addMove = (cellElement) => {
  // let cellIndex = cells.findIndex(({ c }) => c == cellElement); // todo: check what it returns. (should be ok)
  let cellIndex = [...cells].indexOf(cellElement); // todo: check what it returns. (should be ok)
  moves[activePlayer].push(cellIndex);
};
const handleCellClicked = (cellElement) => {
  if (game) {
    addMove(cellElement);

    cellElement.textContent = activePlayer;

    if (isWinner(moves[activePlayer], WINNING_COMBINATIONS)) {
      winner.textContent = activePlayer;
      score[activePlayer]++;
      document.querySelector(`.score--${activePlayer}`).textContent =
        score[activePlayer];
      restart.classList.remove("hidden");

      game = false;
    } else if (moves.O.length === 5 || moves.X.length === 5) {
      // Todo: handle draw case next
      restart.textContent = "Draw";
    } else {
      goToNextPlayer();
    }
  }
};

//caut sa vad daca vreuna din combinatiile castigatoare se regaseste in miscarile jucatorului activ

const checkIfWMPresent = function (moves, winningMoves) {
  let isCurrentWinningMovePresent;
  if (moves.length < winningMoves.length) {
    return false;
  }
  for (let i = 0; i < winningMoves.length; i++) {
    isCurrentWinningMovePresent = false;
    for (let j = 0; j < moves.length; j++) {
      if (moves[j] === winningMoves[i]) {
        isCurrentWinningMovePresent = true;
      }
    }
    if (isCurrentWinningMovePresent === false) {
      return false;
    }
  }
  return true;
};

const isWinner = (moves, winningMoves) => {
  for (let i = 0; i < winningMoves.length; i++) {
    if (checkIfWMPresent(moves, winningMoves[i])) {
      return true;
    }
  }
  return false;
};
const handleResetClicked = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  game = true;
  winner.textContent = "";
  moves.X = [];
  moves.O = [];
  cells.textContent = "";
  restart.classList.add("hidden");
};
const addCellsHandler = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function (event) {
      handleCellClicked(event.target);
    });
  }
};
const addResetListener = () => {
  restart.addEventListener("click", function () {
    handleResetClicked();
  });
};

addCellsHandler();
addResetListener();
