const Score = document.querySelector("#score");
const canvasB = document.querySelector("#background");
const B = canvasB.getContext("2d");
const canvasC = document.querySelector("#piano");
const C = canvasC.getContext("2d");
const canvasD = document.querySelector("#key");
const D = canvasD.getContext("2d");

const blocks = [];
const keys = [];
const eachState = [false, false, false, false, false];
const numOfTiles = 4;
const widthBlock = canvasB.width / numOfTiles;
const widthKey = widthBlock;
const heightKey = 10;
let score = 0;
let state = { start: false, over: false };
let music = new Audio();
music.src = "./sounds/music1.mp3";
let timeSpeed = 100;
let time = Math.floor(Math.random() * (1000 - 500) + 500);
let frame = 0;
function painWindow() {
  for (let i = 1; i < numOfTiles; i++) {
    B.beginPath();
    B.moveTo((i * canvasB.width) / numOfTiles, 0);
    B.lineTo((i * canvasB.width) / numOfTiles, 600);
    B.strokeStyle = "white";
    B.stroke();
  }
}

class Block {
  constructor(x) {
    this.x = x;
    this.y = -100;
    this.w = widthBlock;
    this.h = 10;
    this.velocity = 1;
    this.color = "black";
  }
  draw() {
    C.fillStyle = this.color;
    C.fillRect(this.x, this.y, this.w, this.h);
    this.move();
  }
  move() {
    if (!state.start) return;

    this.y += this.velocity;
  }
}
class Key {
  constructor(x, y, w, h, color, keydown) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.keydown = keydown;
    this.clicked = false;
    this.timeClicked = 0;
  }
  draw() {
    this.border();
    this.keyDown();
    D.fillStyle = this.color;
    D.fillRect(this.x, this.y, this.w, this.h);
  }
  border() {
    D.beginPath();
    D.moveTo(this.x, this.y);
    D.lineTo(this.x, this.y + this.h);
    D.strokeStyle = "black";
    D.stroke();
  }

  keyDown() {
    if (!state.start) return;
    // this.color = "white";
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "d":
          this.timeClicked++;

          if (this.timeClicked > 1) return;
          if (key == this.keydown) (this.color = "red"), (this.clicked = true);
          break;
        case "f":
          this.timeClicked++;
          if (this.timeClicked > 1) return;
          if (key == this.keydown) (this.color = "red"), (this.clicked = true);

          break;
        case "j":
          this.timeClicked++;
          if (this.timeClicked > 1) return;
          if (key == this.keydown) (this.color = "red"), (this.clicked = true);

          break;
        case "k":
          this.timeClicked++;
          if (this.timeClicked > 1) return;
          if (key == this.keydown) (this.color = "red"), (this.clicked = true);
          break;

        default:
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "d":
          if (key == this.keydown)
            (this.color = "white"), (this.clicked = false);
          this.timeClicked = 0;

          break;
        case "f":
          if (key == this.keydown)
            (this.color = "white"), (this.clicked = false);
          this.timeClicked = 0;

          break;
        case "j":
          if (key == this.keydown)
            (this.color = "white"), (this.clicked = false);
          this.timeClicked = 0;

          break;
        case "k":
          if (key == this.keydown)
            (this.color = "white"), (this.clicked = false);
          this.timeClicked = 0;

          break;

        default:
          break;
      }
    });
  }
}

setInterval(() => {
  if (!state.start) return;
  for (let i = 0; i < 1; i++) {
    blocks.push(new Block(Math.floor(Math.random() * 4) * widthBlock));
  }
  time = Math.floor(Math.random() * (1000 - 500) + 500);
}, time);

function loop() {
  if (state.start) {
    music.loop = true;
    music.play();
    frame++;
    if (frame % 1000 == 0) timeSpeed += 100;
  } else {
    music.pause();
  }
  C.clearRect(0, 0, canvasC.width, canvasC.height);
  blocks.forEach((block, index) => {
    block.draw();
    setTimeout(() => {
      if (block.y >= canvasB.height + 200) {
        blocks.splice(index, 1);
      }
    }, 0);
  });

  keys.forEach((key) => {
    key.draw();
    blocks.forEach((block) => {
      if (
        key.y <= block.y + block.h &&
        key.y >= block.y &&
        block.x == key.x &&
        key.clicked
      ) {
        setTimeout(() => {
          block.color = "red";
          score++;
          Score.textContent = score;
        }, 0);
      }
    });
  });
  painWindow();

  // requestAnimationFrame(loop);
  setTimeout(() => {
    loop();
  }, 1000 / timeSpeed);
}
loop();

for (let i = 0; i < numOfTiles; i++) {
  let color = "white";
  let keyDown = i == 0 ? "d" : i == 1 ? "f" : i == 2 ? "j" : "k";
  keys.push(
    new Key(
      widthBlock * i,
      canvasB.height - heightKey,
      widthKey,
      heightKey,
      color,
      keyDown
    )
  );
}
function setup() {
  state.start = !state.start;
  if (state.start) {
    start.textContent = "Pause";
  } else {
    start.textContent = "Start";
  }
}
let start = document.querySelector("#start");
start.addEventListener("click", setup);

addEventListener("keydown", function ({ key }) {
  switch (key) {
    case " ":
      setup();
      break;

    default:
      break;
  }
});
