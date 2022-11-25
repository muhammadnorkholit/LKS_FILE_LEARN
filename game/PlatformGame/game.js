const canvasA = document.querySelector("#arena");
const A = canvasA.getContext("2d");

const sizeBlock = 80;
const map = map1;
let projectiles = [];
let direction = { left: 0, right: 1 };
let currentDirection = direction.left;
let click = 0;
//0 ruang kosong
// 1 tembok
//2 kotak
//4 player

const arena = new Arena();

arena.setSizeArena();
const player = arena.getPlayer();
function animation() {
  A.clearRect(0, 0, canvasA.clientWidth, canvasA.height);
  arena.drawArena();
  player.draw();
  projectiles.forEach((projectile, i) => {
    projectile.draw();
    setTimeout(() => {
      if (projectile.x > canvasA.width) projectiles.splice(i, 1);
      if (projectile.x < 0) projectiles.splice(i, 1);
      if (projectile.y > canvasA.height) projectiles.splice(i, 1);
      if (projectile.y < 0) projectiles.splice(i, 1);
    }, 0);
  });

  requestAnimationFrame(animation);
}
animation();
