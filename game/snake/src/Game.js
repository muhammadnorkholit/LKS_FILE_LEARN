const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 760;
canvas.height = 500;
let tileSize = 64;
let movingDirection = { up: 0, down: 1, left: 2, right: 3 };
let currenMovingDirection = null;
let requestMovingDirection = null;
let colums = 18;
let rows = 10;
let score = 0;
let timedefault = 60 * 2;
let time = timedefault;
let Status = 0;
let speed = 300;
let playAudio = true;
let loading = 3;
// status 1 = play
// status 2 = popup

function play() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  document.querySelector(".time ").style.display = "block";
  document.querySelector(".score ").style.display = "block";
  const layer1 = document.querySelector(".layer1");
  const loading = document.querySelector(".loading");
  let i = 0;
  // setInterval(() => {
  //   i++;
  //   if (i > 3) {
  //     i = 0;
  //   }
  //   document.querySelector(".loading h1").textContent = i;
  // }, 1000);
  layer1.style.display = "none";
  loading.style.display = "block";
  setTimeout(() => {
    loading.style.display = "none";
    canvas.style.display = "block";
    i = 0;
    Status = 1;
  }, 1000);
}

function ranking() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  const ranking = document.querySelector(".ranking");
  document.querySelector(".over").style.display = "none";
  document.querySelector(".pause").style.display = "none";
  ranking.style.display = "flex";
  const topScore = localStorage.getItem("score");
  ranking.querySelector("h2").textContent = topScore + " poin";
}
addEventListener("keydown", continues);

function continues(key) {
  if (Status == 1) {
    if (key) {
      if (key.key == "Escape") {
        const play = new Audio();
        play.src = "../assets/click2.wav";
        play.play();
        const layerpopup = this.document.querySelector(".pause");
        Status = 2;
        layerpopup.style.display = "flex";
      }
    }
  } else if (Status == 2) {
    if (key) {
      if (key.key == "Escape") {
        const play = new Audio();
        play.src = "../assets/click2.wav";
        play.play();
        const layerpopup = this.document.querySelector(".pause");
        Status = 1;
        layerpopup.style.display = "none";
      }
    } else {
      const play = new Audio();
      play.src = "../assets/click2.wav";
      play.play();
      const layerpopup = this.document.querySelector(".pause");
      Status = 1;
      layerpopup.style.display = "none";
    }
  }
}

function quit() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  Status = 0;
  document.querySelector(".over").style.display = "none";
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".ranking").style.display = "none";
  document.querySelector(".layer1").style.display = "block";
  document.querySelector(".time ").style.display = "none";
  document.querySelector(".score ").style.display = "none";
  document.querySelector(".setting ").style.display = "none";
  document.querySelector(".nama ").style.display = "none";
  canvas.style.display = "none";

  const scorelast = localStorage.getItem("score");
  localStorage.setItem("score", Math.max(scorelast, score));
}

function over() {
  const layerOver = this.document.querySelector(".over");
  Status = 4;
  const over = new Audio();
  over.src = "../assets/over.wav";
  over.loop = false;
  if (playAudio) {
    over.play();
    playAudio = false;
    layerOver.style.display = "flex";
  }

  const scorelast = localStorage.getItem("score");
  localStorage.setItem("score", Math.max(scorelast, score));
}

function saveNama() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  const input = document.querySelector(".input1");
  const input2 = document.querySelector(".input2");
  if (input.value == "") {
    input.style.border = "1px solid red";
  } else {
    localStorage.setItem("username", input.value);
    document.querySelector(".username").style.display = "none";
    document.querySelector(".button-setting").style.display = "block";
  }
  if (input2.value == "") {
    input.style.border = "1px solid red";
  } else {
    localStorage.setItem("username", input2.value);
    document.querySelector(".setting").style.display = "block";
    document.querySelector(".usernameLayer").style.display = "none";
  }
}

if (localStorage.getItem("username")) {
  document.querySelector(".button-setting").style.display = "block";
  document.querySelector(".username").style.display = "none";
}
class Snake {
  constructor(x, y, size, food) {
    this.position = { x: x, y: y };
    this.velocity = tileSize;
    this.size = { w: size, h: size };
    this.food = food;
    this.tail = [];
    this.total = 0;
    this.x = x;
    this.y = y;

    addEventListener("keydown", this.#keyDown);
  }
  draw() {
    if (Status == 1) {
      this.eat();
      this.move();
      this.tail.push({ x: this.position.x, y: this.position.y });
    }
    console.log(Status);

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillStyle = "crimson";
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size.w, this.size.h);
      ctx.strokeStyle = "white";
      ctx.strokeRect(this.tail[i].x, this.tail[i].y, this.size.w, this.size.h);
    }

    if (this.tail.length > this.total) {
      this.tail.shift();
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }
  move() {
    // this.tail[this.total - 1] = { x: this.position.x, y: this.position.y };
    if (currenMovingDirection !== requestMovingDirection) {
      if (
        Number.isInteger(this.position.x / tileSize) &&
        Number.isInteger(this.position.y / tileSize)
      ) {
        currenMovingDirection = requestMovingDirection;
      }
    }

    // if (this.position.x + this.size.w > canvas.width) {
    //   this.position.x = -tileSize;
    // } else if (this.position.x < 0) {
    //   this.position.x = canvas.width;
    // } else if (this.position.y + this.size.h > canvas.height) {
    //   this.position.y = -tileSize;
    // } else if (this.position.y < 0) {
    //   this.position.y = canvas.height;
    // }

    if (
      this.position.x + this.size.w >= canvas.width + 1 ||
      this.position.x <= -1 ||
      this.position.y + this.size.h > canvas.height + 1 ||
      this.position.y < -1
    ) {
      Status = 4;
      over();
    }
    for (let i = 0; i < this.tail.length - 1; i++) {
      let tile = this.tail[i];
      if (tile.x == this.position.x && tile.y == this.position.y) {
        over();
        break;
      }
    }
    switch (currenMovingDirection) {
      case movingDirection.left:
        this.position.x -= this.velocity;
        break;
      case movingDirection.right:
        this.position.x += this.velocity;
        break;
      case movingDirection.up:
        this.position.y -= this.velocity;
        break;
      case movingDirection.down:
        this.position.y += this.velocity;
        break;

      default:
        break;
    }
  }
  #keyDown = ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        if (currenMovingDirection !== movingDirection.right)
          requestMovingDirection = movingDirection.left;
        break;
      case "w":
      case "ArrowUp":
        if (currenMovingDirection !== movingDirection.down)
          requestMovingDirection = movingDirection.up;
        break;
      case "d":
      case "ArrowRight":
        if (currenMovingDirection !== movingDirection.left)
          requestMovingDirection = movingDirection.right;
        break;
      case "s":
      case "ArrowDown":
        if (currenMovingDirection !== movingDirection.up)
          requestMovingDirection = movingDirection.down;
        break;

      default:
        break;
    }
  };

  eat() {
    if (
      this.food.x + this.food.w > this.position.x &&
      this.food.x < this.position.x + this.size.w &&
      this.food.y < this.position.y + this.size.h &&
      this.food.y + this.food.h > this.position.y
    ) {
      return true;
    }

    return false;
  }

  reset() {
    this.position.x = this.x;
    this.position.y = this.y;
    this.total = 0;
    score = 0;
    time = timedefault;
    currenMovingDirection = null;
    requestMovingDirection = null;
    playAudio = true;
    this.tail = [];
  }
}

class TileMap {
  constructor() {}

  setCanvasSize() {
    canvas.width = tileSize * colums;
    canvas.height = tileSize * rows;
  }

  draw() {
    for (let i = 0; i < canvas.height / tileSize; i++) {
      for (let j = 0; j < canvas.width / tileSize; j++) {
        ctx.fillStyle = "black";
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  }

  setting() {
    document.querySelector(".score ").style.display = "flex";
    document.querySelector(".score h1").textContent = `score : ${score}`;

    document.querySelector(".time ").style.display = "flex";
    document.querySelector(".time h1").textContent = `time : ${time}s`;

    document.querySelector(".nama ").style.display = "flex";
    const nama = localStorage.getItem("username");
    document.querySelector(".nama h1").textContent = `${nama}`;
  }
}

class Food {
  constructor(size) {
    this.x;
    this.y;
    this.w = size;
    this.h = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "red  ";
    ctx.arc(this.x + this.w, this.y + this.w, this.w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  randomLocation() {
    this.x = Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
    this.y = Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize;
  }
}

function setting() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  document.querySelector(".layer1").style.display = "none";
  document.querySelector(".setting").style.display = "block";
}

function resetUsername() {
  const play = new Audio();
  play.src = "../assets/click2.wav";
  play.play();
  const layer = document.querySelector(".usernameLayer");
  document.querySelector(".setting").style.display = "none";
  const nama = localStorage.getItem("username");
  layer.querySelector("input").value = nama;
  layer.style.display = "block";
}
const food = new Food(tileSize / 2);
const tileMap = new TileMap();
const snake = new Snake(0, tileSize * 5, tileSize, food);

food.randomLocation();
tileMap.setCanvasSize();
function animation(params) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();
  food.draw();
  snake.draw();
  if (snake.eat()) {
    snake.total++;
    food.randomLocation();
    score += 5;
    const eatSong = new Audio();
    eatSong.src = "../assets/eatSong.ogg";
    eatSong.play();
  }

  if (Status == 1) {
    tileMap.setting();
  }
  if (Status == 0) {
    snake.reset();
  }
}

setInterval(() => {
  animation();
}, 500 - speed);
setInterval(() => {
  if (time == 0) {
    over();
  }
  if (Status == 1) {
    if (
      currenMovingDirection == movingDirection.up ||
      currenMovingDirection == movingDirection.down ||
      currenMovingDirection == movingDirection.left ||
      currenMovingDirection == movingDirection.right
    ) {
      time--;
    }
  }
}, 1000);
