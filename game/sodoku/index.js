const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 700;
let tileColumn = 12;
let tileRow = 8;
const tileSize = canvas.width / tileColumn;
canvas.height = tileSize * tileRow;
let mapLevel1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const map = new Map(tileSize, mapLevel1);
const player = map.getPlayer();
let obj2 = { x: 400, y: 200, w: 200, h: 200, velocity: { x: 0, y: 0 } };

function animation() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  map.draw(c);
  player.draw(c);
  c.fillRect(obj2.x, obj2.y, obj2.w, obj2.h);
}

setInterval(() => {
  animation();
}, 1000 / 60);
function collision(o1, o2) {
  if (o1.x >= o2.x + o2.w) return false;
  else if (o1.y >= o2.y + o2.h) return false;
  else if (o1.x + o1.w <= o2.x) return false;
  else if (o1.y + o1.h <= o2.y) return false;
  else return true;
}
