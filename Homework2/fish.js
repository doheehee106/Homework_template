class Fish {
  constructor(x, y, size, fishColor, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fishColor = fishColor;
    this.speed = speed;
    this.taken = false;
    this.beingChased = false;
  }
  move() {
    this.x += this.speed;
    // 물 영역 안에서 좌우로 움직임
    if (this.x > width - this.size * 1.5 || this.x < this.size * 1.5) {
      this.speed *= -1;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    // 진행 방향에 맞춰 좌우로만 반전
    if (this.speed < 0) {
      scale(-1, 1);
    }
    fill(this.fishColor);
    ellipse(0, 0, this.size * 2, this.size * 1.3);
    triangle(
      -this.size * 0.7,
      0,
      -this.size * 1.5,
      -this.size * 0.5,
      -this.size * 1.5,
      this.size * 0.5,
    );
    fill(0);
    circle(this.size * 0.45, -this.size * 0.15, this.size * 0.22);
    pop();
  }
}
