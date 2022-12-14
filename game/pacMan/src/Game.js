import TileMap from "./TileMap.js";

const tileSize = 64;
const velocity = 4;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);
function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx);
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
  });
}
tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);
