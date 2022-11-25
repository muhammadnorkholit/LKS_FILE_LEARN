import MovingDirection from "./MovingDirection.js";
export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );
    this.directionTimerDefault = this.#random(1, 10);
    this.directionTimer = this.directionTimerDefault;
    this.#loadPacmanImage();
  }

  draw(ctx) {
    this.#move();
    this.#changeDirection();
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #move() {
    if (!this.tileMap.wallCollision(this.x, this.y, this.movingDirection)) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;

        default:
          break;
      }
    }
  }

  #changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }

    if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (!this.tileMap.wallCollision(this.x, this.y, newMoveDirection)) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }
  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #loadPacmanImage() {
    this.img1 = new Image();
    this.img1.src = "../images/ghost.png";

    this.img2 = new Image();
    this.img2.src = "../images/greenGhost.png";

    this.img3 = new Image();
    this.img3.src = "../images/orangeGhost.png";
    this.image = this.img1;
  }
}
