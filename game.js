const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentPlayer = 1;
let round = 1;
let dice1 = 0;
let dice2 = 0;
let player1Points = 0;
let player2Points = 0;

const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const startButton = document.querySelector("#start");
const rollButton = document.querySelector("#roll");
const individualButton = document.querySelector("#individual");
const sumButton = document.querySelector("#sum");
const endTurnButton = document.querySelector("#endTurn");
const currentPlayerDisplay = document.querySelector("#currentPlayer");
const roundDisplay = document.querySelector("#round");
const diceIcons = document.querySelectorAll(".dice i");
const boxesDivs = document.querySelectorAll(".box");
const winnerSection = document.querySelector(".winner");
const playAgainButton = document.querySelector("#playAgain");
const scorecard = document.querySelector("#scorecard");

startButton.addEventListener("click", startGame);
rollButton.addEventListener("click", rollDice);
individualButton.addEventListener("click", shutIndividual);
sumButton.addEventListener("click", shutSum);
endTurnButton.addEventListener("click", endTurn);
playAgainButton.addEventListener("click", playAgain);
//startgame fucntion
function startGame() {
  if (player1Input.value.trim() && player2Input.value.trim()) {
    document.querySelector(".player").style.display = "none";
    document.querySelector(".game-board").style.display = "block";
    currentPlayerDisplay.textContent = `Turn: ${player1Input.value.trim()}`;
    rollButton.disabled = false;
  } else {
    alert("please introduce both names.");
    player1Input.focus();
  }
}
//rolldice function
function rollDice() {
  dice1 = Math.floor(Math.random() * 6) + 1;
  dice2 = Math.floor(Math.random() * 6) + 1;

  diceIcons[0].className = `bi bi-dice-${dice1}`;
  diceIcons[1].className = `bi bi-dice-${dice2}`;

  enableDisableButtons();
}

function enableDisableButtons() {
  individualButton.disabled = boxes[dice1] === "X" || boxes[dice2] === "X" || dice1 === dice2;
  sumButton.disabled = boxes[dice1 + dice2] === "X" || (dice1 + dice2) > 10;
  endTurnButton.disabled = !individualButton.disabled && !sumButton.disabled;
}

function shutIndividual() {
  shutBox(dice1);
  shutBox(dice2);

  boxes[0] += dice1 + dice2;
  disableButtons();
}

function shutSum() {
  shutBox(dice1 + dice2);
  boxes[0] += dice1 + dice2;
  disableButtons();
}

function shutBox(number) {
  const box = document.querySelector(`#box${number}`);
  box.classList.add("shut");
  box.textContent = "X";
  boxes[number] = "X";
}

function disableButtons() {
  individualButton.disabled = true;
  sumButton.disabled = true;
  rollButton.disabled = false;
}

function endTurn() {
  const pointsThisTurn = 45 - boxes[0];

  if (currentPlayer === 1) {
    player1Points += pointsThisTurn;
    addScoreRow(round, pointsThisTurn, 0);
    currentPlayerDisplay.textContent = `turno de: ${player2Input.value.trim()}`;
    currentPlayer = 2;
  } else {
    player2Points += pointsThisTurn;
    addScoreRow(round, 0, pointsThisTurn);
    currentPlayerDisplay.textContent = `turno de: ${player1Input.value.trim()}`;
    currentPlayer = 1;
    round++;
  }boxes.fill(0);
  resetBoard();
  if (round > 5) {
      gameOver();
  }
}
//
function addScoreRow(roundNum, p1Pts, p2Pts) {
  const row = document.createElement("tr");
  row.id = `round${roundNum}`;
  const th = document.createElement("th");
  th.textContent = `ronda ${roundNum}`;
  row.appendChild(th);
  const p1Td = document.createElement("td");
  p1Td.classList.add("p1Pts");
  p1Td.textContent = p1Pts;
  row.appendChild(p1Td);
  const p2Td = document.createElement("td");
  p2Td.classList.add("p2Pts");
  p2Td.textContent = p2Pts;
  row.appendChild(p2Td);

  scorecard.appendChild(row);
}

function resetBoard() {
  boxesDivs.forEach((box, index) => {
    box.classList.remove("shut");
    box.textContent = index + 1;
  });
}

function gameOver() {
  winnerSection.style.display = "block";
  document.querySelector(".game-board").style.display = "none";

  if (player1Points < player2Points) {
    document.querySelector("#winnerMessage").textContent = `${player1Input.value.trim()} won!`;
  } else {
    document.querySelector("#winnerMessage").textContent = `${player2Input.value.trim()} won!`;
  }
}
//playagain fucntion
function playAgain() {
  player1Points = 0;
  player2Points = 0;
  round = 1;
  boxes.fill(0);
  resetBoard();
  currentPlayer = 1;
  currentPlayerDisplay.textContent = `Turno de: ${player1Input.value.trim()}`;
  winnerSection.style.display = "none";
  document.querySelector(".player").style.display = "block";
  document.querySelector(".game-board").style.display = "none";
  scorecard.innerHTML = "";
}
