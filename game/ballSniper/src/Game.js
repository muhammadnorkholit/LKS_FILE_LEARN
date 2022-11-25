const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 20, "black");
const projectiles = [];
const enemies = [];
setInterval(() => {
  let x, y;
  const radius = 20;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - radius : canvas.width;
    y = Math.random() * canvas.height;
  } else {
  }

  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  enemies.push(new Enemies(x, y, radius, "red", velocity));
}, 1000);

function animation(params) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.draw();
  });
  enemies.forEach((enemi) => {
    enemi.draw();
  });
  requestAnimationFrame(animation);
}

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});
animation();
