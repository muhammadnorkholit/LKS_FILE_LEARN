class Player {
  constructor(x, y, bullets) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.speed = 5;
    this.keys = {
      leftPressed: false,
      rightPressed: false,
      shootPressed: false,
    };
    this.velocity = { x: 0, y: 0 };
    this.bullets = bullets;
    this.delay = 0;
    addEventListener("keydown", this.keydown);
    addEventListener("keyup", this.keyup);
  }
  draw(ctx) {
    this.move();
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.shoot();
  }
  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (this.keys.leftPressed) this.velocity.x -= this.speed;
    if (this.keys.rightPressed) this.velocity.x += this.speed;
    if (
      this.x + this.velocity.x <= 0 ||
      this.x + this.w + this.velocity.x >= canvas.width
    )
      this.velocity.x = 0;
  }
  shoot() {
    if (this.keys.shootPressed) {
      if (this.delay <= 0) {
        const x = this.x + this.w / 2;
        const y = this.y;
        const damage = 1;
        const delay = 7;
        const speed = 5;
        this.bullets.push(new Bullet(x, y, damage, delay, speed));
        this.delay = delay;
      }
      this.delay--;
    }
  }
  keydown = ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        this.keys.leftPressed = true;
        break;
      case "d":
      case "ArrowRight":
        this.keys.rightPressed = true;
        break;
      case "Enter":
      case " ":
        this.keys.shootPressed = true;
        break;

      default:
        break;
    }
  };
  keyup = ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        this.keys.leftPressed = false;
        break;
      case "d":
      case "ArrowRight":
        this.keys.rightPressed = false;
        break;
      case "Enter":
      case " ":
        this.keys.shootPressed = false;
        break;

      default:
        break;
    }
  };
}
