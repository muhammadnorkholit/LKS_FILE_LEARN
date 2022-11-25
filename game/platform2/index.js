const canvas = document.querySelector("canvas");
const C = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let keysPres = { left: false, right: false, jump: false };
// class
class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = { x: 0, y: 0 };
    this.grafity = 0.7;
  }
  draw() {
    C.fillStyle = "red";
    C.fillRect(this.x, this.y, this.w, this.h);
    this.move();
    this.action();
  }
  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x = 0;
    if (keysPres.left) this.velocity.x = -5;
    if (keysPres.right) this.velocity.x = 5;
    if (keysPres.jump) this.velocity.y = -5;

    if (this.y + this.h + this.velocity.y <= canvas.height)
      this.velocity.y += this.grafity;
    else this.velocity.y = 0;
    if (this.x + this.w + this.velocity.x >= canvas.width) this.velocity.x = 0;
    if (this.x + this.velocity.x <= 0) this.velocity.x = 0;
  }

  action() {
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "a":
          keysPres.left = true;
          break;
        case "d":
          keysPres.right = true;

          break;
        case " ":
          keysPres.jump = true;

          break;

        default:
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "a":
          keysPres.left = false;
          break;
        case "d":
          keysPres.right = false;

          break;
        case " ":
          keysPres.jump = false;

          break;

        default:
          break;
      }
    });
  }
}

class Block {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = { x: 0, y: 0 };
  }
  draw() {
    C.fillStyle = "red";
    C.fillRect(this.x, this.y, this.w, this.h);
  }
}

const player = new Player(200, innerHeight - 200, 200, 200);
const block = new Block(600, innerHeight - 200, 200, 200);
const block2 = new Block(400, innerHeight - 400, 200, 200);

function animation() {
  C.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  block.draw();
  block2.draw();

  if (player.x + player.w + player.velocity.x >= block.x) player.velocity.x = 0;
  if (
    player.x + player.w + player.velocity.x >= block2.x &&
    player.x <= block2.x + block2.w &&
    player.y + player.h + player.velocity.y >= block2.y &&
    player.y <= block2.y + block2.h
  ) {
    player.velocity.x = 0;
    player.velocity.y = 0;
  }
  requestAnimationFrame(animation);
}

animation();
