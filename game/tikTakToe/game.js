const boxs = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restartBtn");
const playerText = document.querySelector(".player-text");

const X_Text = "X";
const O_Text = "O";
let currentText = O_Text;
let spaces = [];
let random = Math.floor(Math.random() * 8);
let schemaWon = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [6, 7, 8],
  [3, 4, 5],
  [2, 5, 8],
];
let randomChoose = false;

restartBtn.addEventListener("click", function () {
  boxs.forEach((box, id) => {
    box.querySelector("h1").textContent = "";
    box.classList.remove("won");
  });
  randomChoose = false;

  spaces = [];
  playerText.textContent = "TIC TAC TOE";
});

function randomHandle() {
  if (playerWon()) return;
  if (!spaces[random]) {
    randomChoose = false;
    let text = currentText == O_Text ? X_Text : O_Text;

    boxs[random].querySelector("h1").textContent = text;
    currentText = text;
    spaces[random] = text;
    if (playerWon() !== undefined) {
      const winningBlock = playerWon();
      winningBlock.map((box) => {
        boxs[box].classList.add("won");
      });
    }

    random = Math.floor(Math.random() * 8);
  } else {
    random = Math.floor(Math.random() * 8);
    randomHandle();
  }
}

boxs.forEach((box, id) => {
  box.addEventListener("click", function () {
    if (playerWon()) return;
    const text = currentText == O_Text ? X_Text : O_Text;
    const textH1 = box.querySelector("h1");
    if (textH1.textContent == "" && !randomChoose) {
      spaces[id] = text;
      currentText = text;
      textH1.textContent = text;
      randomChoose = true;
      setTimeout(() => {
        randomHandle();
      }, 1000);

      if (playerWon() !== undefined) {
        const winningBlock = playerWon();
        winningBlock.map((box) => {
          boxs[box].classList.add("won");
        });
      }
    }
  });
});

function playerWon() {
  for (const condition of schemaWon) {
    let [a, b, c] = condition;
    if (spaces[a] && (spaces[a] == spaces[b]) & (spaces[a] == spaces[c])) {
      playerText.textContent = "player " + currentText + " won";
      return [a, b, c];
    }
  }
}
