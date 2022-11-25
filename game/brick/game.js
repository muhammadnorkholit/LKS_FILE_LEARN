const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = (canvas.width = innerWidth);
const HEIGHT = (canvas.height = innerHeight);
let WidthPesawat = WIDTH / 12 - 9.4;
let HeightPesawat = 20;
let WidthBullet = 8;
let HeightBullet = 7;
let enemies = [],
  bulletLength = 0,
  bullets = [],
  velocity = 2,
  interval,
  pressed = { left: false, right: false },
  padding = 10,
  enemiesPosition = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  ];

function Pesawat() {
  this.w = WidthPesawat;
  this.h = HeightPesawat;
  this.x = WIDTH / 2 - this.w / 2;
  this.y = HEIGHT - (this.h + 10);
  this.velocity = 0;

  this.draw = () => {
    this.move();
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.move = () => {
    this.x += this.velocity;

    if (this.x <= 0) {
      this.velocity = 0;
    }
    if (pressed.left) {
      this.velocity = -2;
    } else if (pressed.right) {
      this.velocity = 2;
    } else {
      this.velocity = 0;
    }

    console.log(this.x, this.velocity);
  };
}

function Enemie(x, y, color) {
  this.x = x;
  this.y = y;
  this.w = WidthPesawat;
  this.h = HeightPesawat;
  this.color = color;

  this.draw = () => {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
}

function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.w = WidthBullet;
  this.h = HeightBullet;

  this.draw = (index) => {
    this.move(index);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
  this.move = (index1) => {
    this.y -= velocity;

    bullets.forEach((bullet, index) => {
      if (bullet.y <= 0) {
        bullets.splice(index, 1);
      }
    });

    enemies.forEach((enemie, index) => {
      // console.log(this.y, enemie.y);
      // console.log();
      bullets.forEach((bullet, index2) => {
        const row = enemie.y / (HeightPesawat + padding);
        const col = enemie.x / (WidthPesawat + padding);
        if (
          bullet.y <= enemie.y + enemie.h &&
          bullet.x + bullet.w >= enemie.x &&
          bullet.x <= enemie.x + enemie.w
        ) {
          if (enemiesPosition[row][col] == 2) {
            // enemies.splice(index, 1);
            enemiesPosition[row][col] = 1;
            bullets.splice(index2, 1);
          } else if (enemiesPosition[row][col] == 1) {
            enemies.splice(index, 1);
            bullets.splice(index2, 1);
          }
        }
      });
    });
  };
}
const pesawat = new Pesawat();
function setup() {
  for (let row = 0; row < enemiesPosition.length; row++) {
    for (let colum = 0; colum < enemiesPosition[0].length; colum++) {
      const color =
        enemiesPosition[row][colum] == 2
          ? "blue"
          : enemiesPosition[row][colum] == 1
          ? "red"
          : "transparent";
      enemies.push(
        new Enemie(
          colum * (WidthPesawat + padding),
          row * (HeightPesawat + padding),
          color
        )
      );
    }
  }

  interval = setInterval(() => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    pesawat.draw();
    enemies.forEach((enemie) => {
      enemie.draw();
    });

    bullets.forEach((bullet, index) => {
      bullet.draw(index);
    });
  }, 5);
}
setup();

let clicked = true;
addEventListener("keydown", function ({ key }) {
  switch (key) {
    case "a":
      pressed.left = true;
      break;
    case "w":
      break;
    case "d":
      pressed.right = true;
      break;
    case "Enter":
      bullets.push(new Bullet(pesawat.x + pesawat.w / 2, pesawat.y));

      break;
    default:
      break;
  }
});
addEventListener("keyup", function ({ key }) {
  switch (key) {
    case "a":
      pressed.left = false;
      break;
    case "w":
      break;
    case "d":
      pressed.right = false;
      break;
    case "Enter":
      pressed.shot = false;

      break;
    default:
      break;
  }
});
