class Bullet {
  constructor(x, y, damage, delay, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = 2;
    this.h = 5;
    this.damage = damage;
  }
  draw(ctx) {
    this.move();
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
  move() {
    this.y -= this.speed;
  }
  collisionCheck(enemy) {

    if (
      this.y <= enemy.y + enemy.h &&
      this.y + this.h >= enemy.y &&
      this.x + this.w >= enemy.x - 10 &&
      this.x <= enemy.x + enemy.w + 10
    ) {
      enemy.takeDamage(this.damage);
      return true;
    }
    return false;
  }
}
