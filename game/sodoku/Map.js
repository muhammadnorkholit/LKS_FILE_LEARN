class Map {
  constructor(tileSize, mapSchema) {
    this.tileSize = tileSize;
    this.mapSchema = mapSchema;
  }
  draw(ctx) {
    this.mapSchema.forEach((row, i) => {
      row.forEach((column, j) => {
        const x = j * this.tileSize;
        const y = i * this.tileSize;
        if (column === 1) {
          ctx.fillStyle = "green";
          ctx.fillRect(x, y, this.tileSize, this.tileSize);
        }
      });
    });
  }
  mapCollision(o1, o2) {
    if (o1.x >= o2.x + o2.w) return false;
    else if (o1.y >= o2.y + o2.h) return false;
    else if (o1.x + o1.w <= o2.x) return false;
    else if (o1.y + o1.h <= o2.y) return false;
    else return true;
  }
  getPlayer() {
    for (let i = 0; i < this.mapSchema.length; i++) {
      for (let j = 0; j < this.mapSchema[i].length; j++) {
        const x = j * this.tileSize;
        const y = i * this.tileSize;
        let column = this.mapSchema[i][j];
        if (column == 4) {
          this.mapSchema[i][j] = 0;
          return new Slug(x, y, this.tileSize, this);
        }
      }
    }
  }
}
