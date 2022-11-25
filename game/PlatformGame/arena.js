class Arena {
  constructor() {
    this.image1 = new Image();
    this.image1.src = "./img/box.png";
  }

  setSizeArena() {
    const colums = map[0].length;
    const rows = map.length;
    canvasA.width = sizeBlock * colums;
    canvasA.height = sizeBlock * rows;
  }
  drawArena() {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const num = map[i][j];
        if (num == 1) {
          A.strokeStyle = "white";
          A.drawImage(
            this.image1,
            j * sizeBlock,
            i * sizeBlock,
            sizeBlock,
            sizeBlock
          );
          A.strokeRect(j * sizeBlock, i * sizeBlock, sizeBlock, sizeBlock);
        } else if (num == 2) {
          A.fillStyle = "white";
          A.fillRect(j * sizeBlock, i * sizeBlock, sizeBlock, sizeBlock);
        }
      }
    }
  }

  getPlayer() {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const num = map[i][j];
        if (num == 4) {
          return new Player(j * sizeBlock, i * sizeBlock);
        }
      }
    }
  }

  arenaCollision(x, y, velocity) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const num = map[i][j];
        if (num == 1 || num == 2) {
          const xTile = j * sizeBlock;
          const yTile = i * sizeBlock;

          if (
            xTile <= x + sizeBlock + velocity.x &&
            xTile + sizeBlock >= x + velocity.x &&
            yTile <= y + sizeBlock + velocity.y &&
            yTile + sizeBlock >= y + velocity.y
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
