const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

console.log(window);
canvas.width = innerWidth;
canvas.height = innerHeight - 3;
let keyPressed = { a: false, d: false, space: false };
let projectiles = [];
let invaderProjectiles = [];
let particles = [];
let grids = [];
let healts = 3;

// class Object
class Player {
  constructor() {
    this.w = 100;
    this.h = 80;
    this.x = canvas.width / 2 - this.w / 2;
    this.y = canvas.height - this.h;
    this.velocity = 0;
    this.rotation = 0;
    this.image = new Image();
    this.image.src = "./images/space.png";
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.x - this.w / 2, -this.y - this.h / 2);

    // ctx.fillRect(this.x, this.h, 100, 50);
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    ctx.restore();

    this.move();
  }
  move() {
    this.x += this.velocity;
    if (keyPressed.a && this.x >= 0) {
      this.velocity = -5;
      this.rotation = -0.5;
    } else if (keyPressed.d && this.x + this.w <= canvas.width) {
      this.velocity = 5;
      this.rotation = 0.5;
    } else {
      this.rotation = 0;

      this.velocity = 0;
    }
  }
}
class Invader {
  constructor(x, y) {
    this.w = 60;
    this.h = 40;
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.rotation = 0;
    this.image = new Image();
    this.image.src = "./images/space.png";
  }

  draw(velocity) {
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.x - this.w / 2, -this.y - this.h / 2);

    // ctx.fillRect(this.x, this.h, 100, 50);
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    ctx.restore();

    this.move(velocity);
  }
  move(velocity) {
    this.x += velocity.x;
    this.y += velocity.y;
  }
  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjetile(this.x + this.w / 2, this.y + this.h, 10)
    );
  }
}

class Projetile {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = 3;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.move();
  }
  move() {
    this.y += this.velocity;
  }
}
class InvaderProjetile {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = 3;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.move();
  }
  move() {
    this.y += this.velocity;
  }
}
class Grid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.velocity = { x: 3, y: 0 };
    this.invaders = [];
    this.rows = Math.floor(Math.random() * (5 - 1) + 1);
    this.cols = Math.floor(Math.random() * (10 - 4) + 4);

    this.w = this.cols * 60;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.invaders.push(new Invader(x * 60, y * 40));
      }
    }
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.y = 0;
    if (this.x + this.w >= canvas.width || this.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 40;
    }
  }
}
class Particle {
  constructor(x, y, velocity, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    this.move();
  }
  move() {
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.opacity -= 0.01;
  }
}

// delaration object classs

const player = new Player();
const grid = new Grid();
grids.push(new Grid());

let interval = Math.floor(Math.random() * 1000);
let frame = 0;
// function animation loop
function loop() {
  // clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //    draw player
  player.draw();
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(healts, 20, 200);

  particles.forEach((particle, i) => {
    if (particle.opacity <= 0) {
      particles.splice(i, 1);
    }
    particle.draw();
  });
  // draw projectile
  projectiles.forEach((projectile, index) => {
    if (projectile.y + projectile.radius <= 0) projectiles.splice(index, 1);
    projectile.draw();
  });
  invaderProjectiles.forEach((projectile, index) => {
    if (projectile.y + projectile.radius >= canvas.height)
      invaderProjectiles.splice(index, 1);
    projectile.draw();

    if (
      projectile.y + projectile.radius >= player.y + player.h &&
      projectile.x - projectile.radius >= player.x &&
      projectile.x + projectile.radius <= player.x + player.w
    ) {
      setTimeout(() => {
        healts--;

        for (let i = 0; i < 10; i++) {
          particles.push(
            new Particle(
              player.x + player.w / 2,
              player.y + player.h / 2,
              { x: Math.random() - 0.5 + 10, y: Math.random() - 0.5 } + 10,
              Math.random() * 10,
              "yellow"
            )
          );
        }
        invaderProjectiles.splice(index, 1);
      }, 0);
    }
  });
  grids.forEach((grid, gridIndex) => {
    grid.move();
    if (frame % 100 == 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      );
    }
    grid.invaders.forEach((invader, i) => {
      invader.draw(grid.velocity);
      projectiles.forEach((projectile, j) => {
        if (
          projectile.y - projectile.radius <= invader.y + invader.h &&
          projectile.x - projectile.radius >= invader.x &&
          projectile.x + projectile.radius <= invader.x + invader.w
        ) {
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              particles.push(
                new Particle(
                  invader.x + invader.w / 2,
                  invader.y + invader.h / 2,
                  { x: Math.random() - 0.5, y: Math.random() - 0.5 },
                  Math.random() * 3,
                  "gray"
                )
              );
            }
            grid.invaders.splice(i, 1);
            projectiles.splice(j, 1);

            // untuk mendapatkan widt berdasarkan invader sisa
            if (grid.invaders.length > 0) {
              let firstInvade = grid.invaders[0];
              let lastInvade = grid.invaders[grid.invaders.length - 1];

              grid.w = lastInvade.x - firstInvade.x + firstInvade.w;
              grid.x = firstInvade.x;
            } else {
              grids.splice(gridIndex, 1);
            }
          }, 0);
        }
      });
    });
  });

  frame++;
  requestAnimationFrame(loop);
}
loop();
let intervalTime = Math.floor(Math.random() * (15000 - 8000) + 8000);
setInterval(() => {
  grids.push(new Grid());
  intervalTime = Math.floor(Math.random() * (15000 - 8000) + 8000);
}, intervalTime);

// control handle

addEventListener("keydown", function ({ key }) {
  switch (key) {
    case "a":
      keyPressed.a = true;
      break;
    case "d":
      keyPressed.d = true;
      break;

    case " ":
      // if (!keyPressed.a && !keyPressed.d) {
      projectiles.push(
        new Projetile(player.x + player.w / 2, player.y + player.h / 2, -10)
      );
      // }

      break;

    default:
      break;
  }
});
addEventListener("keyup", function ({ key }) {
  switch (key) {
    case "a":
      keyPressed.a = false;
      break;
    case "d":
      keyPressed.d = false;
      break;
    default:
      break;
  }
});
