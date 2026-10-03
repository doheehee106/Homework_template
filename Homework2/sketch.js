let fishes = [];
let bird = null;

function setup() {
  createCanvas(1000, 800);
  rectMode(CENTER);
  noStroke();

  // 물은 화면 아래쪽 3/5
  fishes = [];

  let fishSettings = [
    { size: 54 - 10, color: "#e34720", speed: 5.4 },
    { size: 39 - 10, color: "#f9783d", speed: 2.3 },
    { size: 69 - 10, color: "#ff6601", speed: 4.1 },
    { size: 48 - 10, color: "#f4a62a", speed: 2.6 },
    { size: 60 - 10, color: "#e85d75", speed: 2.4 },
    { size: 33 - 10, color: "#ffb347", speed: 3.1 },
  ];

  for (let setting of fishSettings) {
    // 물 안에서만 생성: 물의 윗선부터 바닥 가까이까지
    let waterTop = height * 0.4;
    let x = random(setting.size * 1.5, width - setting.size * 1.5);
    let y = random(waterTop + setting.size, height - setting.size);

    fishes.push(new Fish(x, y, setting.size, setting.color, setting.speed));
  }
}

function draw() {
  // 하늘색 배경
  background("#d9f3ff");

  // 화면 아래쪽 3/5를 파란 물로 채움
  fill("#53b9e8");
  rect(width / 2, height * 0.7, width, height * 0.6);

  for (let f of fishes) {
    if (!f.taken) {
      f.move();
      f.display();
    }
  }

  if (bird !== null) {
    bird.update();
    bird.display();

    if (bird.done) {
      let index = fishes.indexOf(bird.fish);
      if (index !== -1) {
        fishes.splice(index, 1);
      }
      bird = null;
    }
  }
}

class Fish {
  constructor(x, y, size, fishColor, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fishColor = fishColor;
    this.speed = speed;
    this.angle = 0;
    this.taken = false;
  }

  move() {
    this.x += this.speed;

    // 물 영역 안에서 좌우로 움직임
    if (this.x > width - this.size * 1.5 || this.x < this.size * 1.5) {
      this.speed *= -1;
    }

    this.angle = this.speed < 0 ? PI : 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

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
//새 생성자
class Bird {
  constructor(fish) {
    this.fish = fish;
    this.x = random(width);
    this.y = -60;
    this.speed = 9;
    this.state = "chasing";
    this.done = false;
    this.wingAngle = 0;
    this.wingDirection = 1;
  }

  update() {
    this.wingAngle += 0.12 * this.wingDirection;

    if (this.wingAngle > 0.5 || this.wingAngle < -0.5) {
      this.wingDirection *= -1;
    }
    if (this.state === "chasing") {
      // 매 프레임 물고기의 현재 위치를 따라감
      let dx = this.fish.x - this.x;
      let dy = this.fish.y - this.y;

      let distance = sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }

      // 물고기 가까이에 도착하면 잡음
      if (distance < this.fish.size * 0.7) {
        this.state = "flyingAway";
        this.fish.taken = true;
      }
    } else if (this.state === "flyingAway") {
      // 물고기를 잡은 채 함께 위로 날아감
      this.y -= this.speed;
      this.fish.x = this.x;
      this.fish.y = this.y + 55;

      if (this.y < -80) {
        this.done = true;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    // 갈매기 몸과 날개
    fill("#ffffff");
    ellipse(0, 0, 90, 42);
    // 왼쪽 날개
    push();
    rotate(this.wingAngle);
    triangle(-15, -5, -65, -38, -42, 8);
    pop();

    // 오른쪽 날개
    push();
    rotate(-this.wingAngle);
    triangle(15, -5, 65, -38, 42, 8);
    pop();
    // 부리
    fill("#f2a900");
    triangle(38, 0, 62, 8, 38, 14);
    pop();

    // 잡힌 물고기를 새 아래에 그리기
    if (this.state === "flyingAway") {
      this.fish.display();
    }
  }
}

function mousePressed() {
  if (bird !== null) {
    return;
  }

  for (let i = fishes.length - 1; i >= 0; i--) {
    let f = fishes[i];
    let dx = mouseX - f.x;
    let dy = mouseY - f.y;

    if (dx * dx + dy * dy < f.size * f.size * 2) {
      bird = new Bird(f);
      break;
    }
  }
}
