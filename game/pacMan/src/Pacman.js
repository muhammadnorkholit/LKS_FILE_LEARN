import MovingDirection from "./MovingDirection.js";
export default class Pacman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.pacmanAnimateTimerDefault = 10;
    this.pacmanAnimateTimer = null;
    this.rotation = { up: 3, down: 1, left: 2, right: 0 };
    addEventListener("keydown", this.#keydown);
    this.#loadPacmanImage();
    this.currentMovingDirection = null;
    this.requestMovingDirection = null;
    this.pacmanRotation = this.rotation.right;
  }

  draw(ctx) {
    this.#move();
    this.#animate();
    this.#eatDot(this.x, this.y);
    const size = this.tileSize / 2;

    ctx.save();
    ctx.translate(this.x + size, this.y + size);
    ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
    ctx.drawImage(
      this.images[this.indexImage],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );
    ctx.restore();
  }

  #loadPacmanImage() {
    const img1 = new Image();
    img1.src = "../images/pac0.png";

    const img2 = new Image();
    img2.src = "../images/pac1.png";

    const img3 = new Image();
    img3.src = "../images/pac2.png";

    const img4 = new Image();
    img4.src = "../images/pac1.png";

    this.images = [img1, img2, img3, img4];
    this.indexImage = 0;
  }

  #keydown = ({ key }) => {
    switch (key) {
      case "a":
        // left
        if (this.currentMovingDirection == MovingDirection.right)
          this.currentMovingDirection = MovingDirection.left;
        this.requestMovingDirection = MovingDirection.left;
        break;
      case "w":
        // up
        if (this.currentMovingDirection == MovingDirection.down)
          this.currentMovingDirection = MovingDirection.up;
        this.requestMovingDirection = MovingDirection.up;
        break;
      case "d":
        // right
        if (this.currentMovingDirection == MovingDirection.left)
          this.currentMovingDirection = MovingDirection.right;
        this.requestMovingDirection = MovingDirection.right;
        break;
      case "s":
        // bottom
        if (this.currentMovingDirection == MovingDirection.top)
          this.currentMovingDirection = MovingDirection.down;
        this.requestMovingDirection = MovingDirection.down;
        break;

      default:
        break;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          this.tileMap.wallCollision(
            this.x,
            this.y,
            this.requestMovingDirection
          )
        ) {
        }
        this.currentMovingDirection = this.requestMovingDirection;
      }
    }

    if (
      this.tileMap.wallCollision(this.x, this.y, this.currentMovingDirection)
    ) {
      this.indexImage = 1;
      this.pacmanAnimateTimer = null;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.pacmanAnimateTimer == null
    ) {
      this.pacmanAnimateTimer = this.pacmanAnimateTimerDefault;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.pacmanRotation = this.rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.pacmanRotation = this.rotation.down;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        this.pacmanRotation = this.rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.pacmanRotation = this.rotation.right;
        break;

      default:
        break;
    }
  }
  #animate() {
    if (this.pacmanAnimateTimer == null) {
      return;
    }

    this.pacmanAnimateTimer--;
    if (this.pacmanAnimateTimer == 0) {
      this.pacmanAnimateTimer = this.pacmanAnimateTimerDefault;
      this.indexImage++;
      if (this.indexImage == this.images.length) {
        this.indexImage = 0;
      }
    }
  }

  #eatDot(x, y) {
    const row = y / this.tileSize;
    const colum = x / this.tileSize;

    if (Number.isInteger(row) && Number.isInteger(colum)) {
      if (this.tileMap.map[row][colum] === 0) {
        this.tileMap.map[row][colum] = 5;
        const audio = new Audio();
        audio.src = "../sounds/waka.wav";
        audio.play();
      }
    }
  }
}
