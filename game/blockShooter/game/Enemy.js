class Enemy {
  constructor(x, y, size, health) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.health = health;
    this.colors = ["red", "green", "yellow"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(ctx) {
    ctx.lineWidth = 8;
    ctx.strokeStyle = this.health > 1 ? "white" : this.color;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // draw text
    ctx.fillStyle = "black  ";
    ctx.font = "30px Arial";
    ctx.fillText(
      this.health,
      this.x + this.w / 3.5,
      this.y + this.h / 1.5,
      this.w,
      this.h
    );
  }
  takeDamage(damage) {
    this.health -= damage;
  }
}
