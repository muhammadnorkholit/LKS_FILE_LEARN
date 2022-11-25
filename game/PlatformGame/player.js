class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = sizeBlock;
    this.h = sizeBlock;
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.8;
    this.keyAction();
    this.pressed = { right: false, left: false, jump: false, shoot: false };
    this.img = new Image();
    this.img.src = "./img/king/idle.png";
  }
  draw() {
    A.fillStyle = "red";
    A.fillRect(this.x, this.y, this.w, this.h);
    // A.drawImage(this.img, 200, 0, 200, 100, 10, 30, 200, 50);

    this.move();
    this.keyAction();
  }
  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x = 0;

    if (this.pressed.left) {
      this.velocity.x = -10;
    }
    if (this.pressed.right) {
      this.velocity.x = 10;
    }
    if (this.pressed.jump && this.velocity.y == 0) {
      this.velocity.y = -15;
    }

    if (!arena.arenaCollision(this.x, this.y, this.velocity)) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  keyAction() {
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "a":
        case "ArrowLeft":
          this.pressed.left = true;
          currentDirection = direction.left;
          break;
        case "d":
        case "ArrowRight":
          this.pressed.right = true;
          currentDirection = direction.right;

          break;
        case " ":
        case "ArrowUp":
          if (this.velocity.y != 0) return;
          this.pressed.jump = true;
          break;
        case "Enter":
          click++;

          if (click == 1) {
            if (currentDirection == direction.right) {
              projectiles.push(
                new Projectile(this.x + this.w / 2, this.y, { x: 10, y: 1 })
              );
            }
            if (currentDirection == direction.left) {
              projectiles.push(
                new Projectile(this.x + this.w / 2, this.y, { x: -10, y: 1 })
              );
            }
          }

          break;

        default:
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "a":
        case "ArrowLeft":
          this.pressed.left = false;
          break;
        case "d":
        case "ArrowRight":
          this.pressed.right = false;
          break;
        case " ":
        case "ArrowUp":
          this.pressed.jump = false;
          break;
        case "Enter":
          this.pressed.shoot = false;
          click = 0;
          break;
        default:
          break;
      }
    });
  }
}
