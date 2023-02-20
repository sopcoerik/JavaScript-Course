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
const scoreX = document.querySelector("score--X");
const scoreO = document.querySelector("score--O");

cells = document.querySelectorAll(".cell");

const handleCellClicked = (cellElement) => {
  if (playerX.classList.contains("active--player")) {
    cellElement.textContent = "X";
    cellElement = 1;
  } else if (playerO.classList.contains("active--player")) {
    cellElement.textContent = "O";
    cellElement = 1;
  }
};

if (game) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      handleCellClicked(cells[i]);
      playerO.classList.toggle("active--player");
      playerX.classList.toggle("active--player");
    });
  }

  restart.addEventListener("click", function () {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = "";
    }
  });
}
