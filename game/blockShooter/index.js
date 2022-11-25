const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 600;
let bullets = [];
let enemies = [];
let gameState = { start: 1, pause: 2, over: 3 };
const player = new Player(canvas.width / 2.1, canvas.height / 1.2, bullets);
genEnemy(6, 3);

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#d53";
  ctx.fillStyle = "black";
  ctx.lineWidth = 5;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  enemies.forEach((enemie) => {
    enemie.draw(ctx);
  });
  bullets.forEach((bullet, index) => {
    bullet.draw(ctx);
    if (bullet.h <= -bullet.h) bullets.splice(index, 1);
    enemies.forEach((enemy, i) => {
      if (bullet.collisionCheck(enemy)) {
        bullets.splice(index, 1);

        if (enemy.health < 1) {
          setTimeout(() => {
            enemies.splice(i, 1);
          }, 0);
        }
      }
    });
  });
  player.draw(ctx);
}

function genEnemy(column, row) {
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      let xOffset = 20;
      let yOffset = 20;
      let padding = 20;
      let size = canvas.width / column - padding - +xOffset;

      let x = i * (size + padding + xOffset) + xOffset;
      let y = j * (size + (padding - 20) + yOffset) + yOffset;
      let health = Math.floor(Math.random() * (20 - 1) + 1);
      enemies.push(new Enemy(x, y, size, health));
    }
  }
}

setInterval(() => {
  animation();
}, 1000 / 60);

function collision() {}
