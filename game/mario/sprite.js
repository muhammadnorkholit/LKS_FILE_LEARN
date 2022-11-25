class Sprite {
  constructor({ x, y, w, h, src, scale = 1, frame }) {
    this.image = new Image();
    this.image.src = src;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.frames = 0;
    this.frame = frame;
    this.frameElapsed = 0;
    this.frameHold = 10;
  }
  draw() {
    c.drawImage(
      this.image,
      (this.image.width / this.frame) * this.frames,
      0,
      this.image.width / this.frame,
      this.image.height,
      this.x,
      this.y,
      (this.image.width / this.frame) * this.scale,
      this.image.height * this.scale
    );
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold == 0) {
      this.frames++;
    }
    if (this.frames >= this.frame) this.frames = 0;
  }
  background() {
    c.drawImage(
      this.image,
      this.x,
      this.y,
      this.w * this.scale,
      this.h * this.scale
    );
  }
}
