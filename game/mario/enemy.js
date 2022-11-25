class Enemy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = { x: 0, y: 0 };
    this.grafity = 1;
    this.attactBox = {
      x: this.x,
      y: this.y,
      w: 200,
      h: 100,
    };
    this.image = new Image();
    this.idleImage = "./images/idle.png";
    this.runImage = "./images/run.png";
    this.jumpImage = "./images/jump.png";
    this.hitImage = "./images/hit.png";
    this.attactImage = "./images/Attack1.png";
    this.fallImage = "./images/fall.png";
    this.image.src = this.idleImage;
    this.frames = 0;
    this.imageFrame = 8;
    this.frameElapsed = 0;
    this.frameHold = 5;
  }
  draw() {
    c.save();
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, this.w, this.h);
    // c.scale(-1, 1);

    c.drawImage(
      this.image,
      (this.image.width / this.imageFrame) * this.frames,
      0,
      this.image.width / this.imageFrame,
      this.h,
      this.x - 345,
      this.y - 330,
      this.w * 8,
      this.h * 4.75
    );

    c.restore();
    this.attactBox.x =
      currentDirectionEnemy == direction.left
        ? this.x - this.attactBox.w + 20
        : this.x + this.w - 20;
    this.move();
    if (state == gameState.start) {
      this.keydown();
      this.attact();
    }
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold == 0) {
      this.frames++;
    }
    if (this.frames >= this.imageFrame) this.frames = 0;
  }
  move() {
    if (state == gameState.start) {
      if (keys.enemy.left) this.velocity.x = -5;
      else if (keys.enemy.right) this.velocity.x = 5;
      else this.velocity.x = 0;
    }

    this.velocity.y += this.grafity;
    let horizontalCollision = {
      x: this.x + this.velocity.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
    let vertikalCollision = {
      x: this.x,
      y: this.y + this.velocity.y,
      w: this.w,
      h: this.h,
    };

    //   check collision horisontal
    for (let i = 0; i < platforms.length; i++) {
      let platformCollision = {
        x: platforms[i].x,
        y: platforms[i].y,
        w: platforms[i].w,
        h: platforms[i].h,
      };

      if (checkIntersection(horizontalCollision, platformCollision))
        this.velocity.x = 0;
      if (checkIntersection(vertikalCollision, platformCollision))
        this.velocity.y = 0;
    }

    if (this.x + this.velocity.x < 0) this.velocity.x = 0;
    if (this.x + this.w + this.velocity.x > canvas.width) this.velocity.x = 0;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.attactBox.x += this.velocity.x;
    this.attactBox.y += this.velocity.y;
  }
  attact() {
    if (keys.enemy.attact) {
      c.fillRect(
        this.attactBox.x,
        this.attactBox.y,
        this.attactBox.w,
        this.attactBox.h
      );
    }
  }
  keydown() {
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "ArrowRight":
          keys.enemy.right = true;
          currentDirectionEnemy = direction.right;
          break;
        case "ArrowLeft":
          keys.enemy.left = true;
          currentDirectionEnemy = direction.left;

          break;
        case "Enter":
          keys.enemy.attact = true;
          break;
        case "ArrowUp":
          if (enemy.velocity.y !== 0) return;
          if (state == gameState.start) enemy.velocity.y = -20;

          break;

        default:
          break;
      }
    });

    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "ArrowRight":
          keys.enemy.right = false;
          break;
        case "ArrowLeft":
          keys.enemy.left = false;

          break;
        case "Enter":
          keys.enemy.attact = false;
          break;

        default:
          break;
      }
    });
  }
}
