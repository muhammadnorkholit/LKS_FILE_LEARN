class Projectile {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.graifity = 1;
  }
  draw() {
    A.beginPath();
    A.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    A.fillStyle = "white";
    A.fill();
    A.closePath();

    this.move();
  }
  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const x = j * sizeBlock;
        const y = i * sizeBlock;
        // console.log(x, this.x);

        if (this.y + sizeBlock <= y) {
          this.velocity.y = this.graifity;
        } else {
          //   this.y += -1;
        }
      }
    }
  }
}
