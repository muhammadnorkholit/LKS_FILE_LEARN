class Player extends Sprite {
  constructor(x, y, w, h, src, scale = 1, frame) {
    super({ x, y, w, h, src, scale, frame });
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = { x: 0, y: 0 };
    this.grafity = 1;
    this.attactBox = {
      x: this.x,
      y: this.y + this.h / 2 - 50,
      w: 250,
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
    c.fillStyle = "red";
    // c.fillRect(this.x, this.y, this.w, this.h);

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

    this.attactBox.x =
      currentDirectionPlayer == direction.left
        ? this.x - this.attactBox.w + 160
        : this.x + this.attactBox.w;
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
      if (keys.player.left) {
        this.spriteMove("run");
        this.velocity.x = -10;
      } else if (keys.player.right) {
        this.spriteMove("run");

        this.velocity.x = 10;
      } else {
        this.spriteMove();
        this.velocity.x = 0;
      }
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
    // if (this.velocity.x != 0 && this.velocity.y == 0 && !keys.player.attact) {
    // } else if (this.velocity.y < 0) {
    //   this.image.src = this.jumpImage;
    //   this.imageFrame = 2;
    // } else {
    //   this.image.src = this.idleImage;
    //   player.imageFrame = 8;
    // }

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

    if (state == gameState.start) {
      if (this.x + this.velocity.x < 0) this.velocity.x = 0;
      if (this.x + this.w + this.velocity.x > canvas.width) this.velocity.x = 0;

      if (this.velocity.y < 0) {
        this.spriteMove("jump");
      } else if (this.velocity.y > 0) {
        console.log(this.velocity.y);
        this.spriteMove("fall");
      }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.attactBox.x += this.velocity.x;
    this.attactBox.y += this.velocity.y;
  }
  keydown() {
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "d":
          keys.player.right = true;
          currentDirectionPlayer = direction.right;
          break;
        case "a":
          keys.player.left = true;
          currentDirectionPlayer = direction.left;

          break;
        case " ":
          if (!keys.player.attact) keys.player.attact = true;

          break;
        case "w":
          if (player.velocity.y !== 0) return;
          if (state == gameState.start) player.velocity.y = -30;
          break;

        default:
          break;
      }
    });

    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "d":
          keys.player.right = false;
          currentDirectionPlayer = direction.right;
          break;
        case "a":
          keys.player.left = false;
          currentDirectionPlayer = direction.left;

          break;
        case " ":
          keys.player.attact = false;
          break;

        default:
          break;
      }
    });
  }
  spriteMove(action) {
    switch (action) {
      case "jump":
        this.image.src = this.jumpImage;
        this.imageFrame = 2;
        console.log(this.image);
        break;
      case "run":
        this.image.src = this.runImage;
        this.imageFrame = 8;
        break;
      case "fall":
        this.image.src = this.fallImage;
        this.imageFrame = 2;
        break;
      case "attack":
        this.image.src = this.attactImage;
        this.imageFrame = 6;
        break;

      default:
        this.image.src = this.idleImage;
        this.imageFrame = 8;
        break;
    }
  }
  attact() {
    if (keys.player.attact) {
      this.image.src = this.attactImage;
      this.imageFrame = 6;
      // c.fillRect(
      //   this.attactBox.x,
      //   this.attactBox.y,
      //   this.attactBox.w,
      //   this.attactBox.h
      // );
    }
  }
}
