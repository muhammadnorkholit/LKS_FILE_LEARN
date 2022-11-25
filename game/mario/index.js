const canvas = document.querySelector("canvas");
const timer = document.querySelector(".timer");
const enemyH = document.querySelector(".enemyH");
const playerH = document.querySelector(".playerH");
const startLayer = document.querySelector(".start");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let platforms = [];
let keys = {
  player: { left: false, right: false, attact: false },
  enemy: { left: false, right: false, attact: false },
};
const direction = { left: 0, right: 1 };
let currentDirectionEnemy = direction.right;
let currentDirectionPlayer = direction.right;
let playerHealthDefault = 100;
let playerHealth = 0;
let enemyHealth = 0;
let hit = 10;
let time = 60 * 2;

let gameState = {
  startO: 0,
  start: 1,
  pause: 2,
  over: 3,
};
let state = gameState.startO;
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    c.fillStyle = "transparent";
    c.fillRect(this.x, this.y, this.w, this.h);
  }
}

const player = new Player(0, 20, 100, 250, "./images/idle.png", 2.5, 8);
const enemy = new Enemy(1205, 20, 100, 250);

const background = new Sprite({
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
  src: "./images/background.png",
});
const shop1 = new Sprite({
  x: 1100,
  y: 117,
  w: 700,
  h: 200,
  src: "./images/shop.png",
  scale: 3.75,
  frame: 6,
});
const shop2 = new Sprite({
  x: 0,
  y: 117,
  w: 700,
  h: 200,
  src: "./images/shop.png",
  scale: 3.75,
  frame: 6,
});

platforms.push(new Platform(0, innerHeight - 117, innerWidth, 50));

function animation() {
  if (enemyHealth >= 100) enemyHealth = 100;
  if (playerHealth >= 100) playerHealth = 100;

  c.clearRect(0, 0, canvas.width, canvas.height);
  background.background();
  shop1.draw();
  shop2.draw();
  c.strokeRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.draw();
  enemy.draw();

  playerEnemyAttact();
  timer.textContent = time;
  enemyH.style.width = `${100 * (enemyHealth / playerHealthDefault)}%`;
  playerH.style.width = `${100 * (playerHealth / playerHealthDefault)}%`;

  if (enemyHealth == 100) over();
  if (state == gameState.start) startLayer.style.display = "none";
  else if (state == gameState.startO) startLayer.style.display = "block";

  requestAnimationFrame(animation);
}

addEventListener("keydown", ({ key }) => {
  if (key == "Enter" && state == gameState.startO) {
    state = gameState.start;
    for (let i = 100; i >= 0; i--) {
      enemyHealth = i;
      playerHealth = i;
    }
  }
});

animation();

function over() {
  state = gameState.startO;
  startLayer.querySelector("h1").textContent = "Over";
  startLayer.querySelector("h2").textContent = "Tap Enter To Restart";
}

function checkIntersection(obj1, obj2) {
  if (obj1.x >= obj2.x + obj2.w) return false;
  else if (obj1.x + obj1.w <= obj2.x) return false;
  else if (obj1.y >= obj2.y + obj2.h) return false;
  else if (obj1.y + obj1.h <= obj2.y) return false;
  else return true;
}

function playerEnemyAttact() {
  const attacedE = {
    x: player.attactBox.x,
    y: player.attactBox.y,
    w: player.attactBox.w,
    h: player.attactBox.h,
  };
  const attacedP = {
    x: enemy.attactBox.x,
    y: enemy.attactBox.y,
    w: enemy.attactBox.w,
    h: enemy.attactBox.h,
  };

  if (checkIntersection(attacedE, enemy) && keys.player.attact) {
    keys.player.attact = false;
    enemyHealth += hit;
  }
  if (checkIntersection(attacedP, player) && keys.enemy.attact) {
    player.image.src = player.hitImage;
    player.imageFrame = 4;
    keys.enemy.attact = false;
    playerHealth += hit;
  }
}
setInterval(() => {
  //   time--;
}, 1000);
