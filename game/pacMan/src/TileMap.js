import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
import Pacman from "./Pacman.js";
export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
  }

  //1 wall
  //0 dot
  //4 player position
  //5 empty space
  //3 enemi
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
  wallCollision(x, y, direction) {
    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let colum = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          colum = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          colum = x / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          colum = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          colum = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;

        default:
          break;
      }
      const tile = this.map[row][colum];
      if (tile == 1) {
        return true;
      }
    }
    return false;
  }
  draw(ctx) {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        let tile = this.map[i][j];
        if (tile == 1) {
          this.#drawWall(
            ctx,
            j * this.tileSize,
            i * this.tileSize,
            this.tileSize
          );
        } else if (tile == 0) {
          this.#dot(ctx, j * this.tileSize, i * this.tileSize, this.tileSize);
        } else {
          this.#drawBlank(
            ctx,
            j * this.tileSize,
            i * this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }

  getPacman(velocity) {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        let tile = this.map[i][j];
        if (tile == 4) {
          this.map[i][j] = 0;
          return new Pacman(
            j * this.tileSize,
            i * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }
  #drawWall(ctx, x, y, size) {
    const wall = new Image();
    wall.src = "../images/wall.png";
    ctx.drawImage(wall, x, y, size, size);
  }

  getEnemies(velocity) {
    let enemies = [];

    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const tile = this.map[i][j];
        if (tile == 6) {
          this.map[i][j] = 0;
          enemies.push(
            new Enemy(
              j * this.tileSize,
              i * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  #drawBlank(ctx, x, y, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, size, size);
  }
  #dot(ctx, x, y, size) {
    const dot = new Image();
    dot.src = "../images/dot.png";
    ctx.drawImage(dot, x, y, size, size);
  }
}
