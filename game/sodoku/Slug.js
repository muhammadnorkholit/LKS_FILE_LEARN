class Slug {
  constructor(x, y, size, map) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.velocity = { x: 0, y: 0 };
    this.speed = 10;
    this.keys = { left: false, right: false, up: false, down: false };
    this.map = map;
  }
  draw(c) {
    this.move();
    this.keyAction();
    c.fillStyle = " blue";
    c.fillRect(this.x, this.y, this.w, this.h);
  }
  move() {
    if (this.keys.left) {
      this.velocity.x = -this.speed;
    } else if (this.keys.right) {
      this.velocity.x = this.speed;
    } else if (this.keys.up) {
      this.velocity.y = -this.speed;
    } else if (this.keys.down) {
      this.velocity.y = this.speed;
    } else {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    const horisontal = {
      x: this.x + this.velocity.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
    const vertikal = {
      x: this.x,
      y: this.y + this.velocity.y,
      w: this.w,
      h: this.h,
    };
    for (let i = 0; i < this.map.mapSchema.length; i++) {
      for (let j = 0; j < this.map.mapSchema[i].length; j++) {
        const obj2 = {
          x: j * this.w,
          y: i * this.h,
          w: this.w,
          h: this.h,
        };
        const tile = this.map.mapSchema[i][j];
        if (tile == 1) {
          if (this.map.mapCollision(horisontal, obj2)) {
            this.velocity.x = 0;
          }
          if (this.map.mapCollision(vertikal, obj2)) {
            this.velocity.y = 0;
          }
        }
      }
    }
    const hori = {
      x: this.x + this.velocity.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
    if (collision(hori, obj2)) {
      console.log(this);
      this.velocity.x = 0;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  keyAction() {
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "a":
          this.keys.left = true;
          break;
        case "d":
          this.keys.right = true;
          break;
        case "w":
          this.keys.up = true;
          break;
        case "s":
          this.keys.down = true;
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "a":
          this.keys.left = false;
          break;
        case "d":
          this.keys.right = false;
          break;
        case "w":
          this.keys.up = false;
          break;
        case "s":
          this.keys.down = false;
          break;
      }
    });
  }
}
