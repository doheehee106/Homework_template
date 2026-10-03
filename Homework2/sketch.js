const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;

let engine;
let fishes = [];
let bird = null;

let margin = 20;
let floorY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  engine = Engine.create();
  engine.gravity.y = 2;
  engine.gravity.x = 0;
  engine.gravity.scale = 0.001;

  floorY = height - margin - 15;

  // 바닥 충돌체
  let ground = Bodies.rectangle(
    width / 2,
    height - margin / 2,
    width - margin * 2,
    margin,
    {
      isStatic: true,
      restitution: 1,
    },
  );
  Composite.add(engine.world, ground);

  // 세 물고기가 서로 다른 높이와 위치에서 시작
  fishes.push(new Fish(width * 0.2, height * 0.25, 18, "#e34720", 1.8));
  fishes.push(new Fish(width * 0.7, height * 0.38, 13, "#f9783d", -1.3));
  fishes.push(new Fish(width * 0.45, height * 0.5, 23, "#ff6601", 1.1));

  // 물고기를 세 마리 더 추가
  fishes.push(new Fish(width * 0.8, height * 0.2, 16, "#f4a62a", -1.6));
  fishes.push(new Fish(width * 0.3, height * 0.43, 20, "#e85d75", 1.4));
  fishes.push(new Fish(width * 0.6, height * 0.52, 11, "#ffb347", -1.1));
}

function draw() {
  // 연한 하늘색 하늘
  background("#d9f3ff");

  // 화면 아래쪽 3/5 지점까지 물
  fill("#53b9e8");
  rect(width / 2, height * 0.7, width, height * 0.6);

  Engine.update(engine);

  // 물고기 그리기 및 움직이기
  for (let f of fishes) {
    if (!f.taken) {
      f.move();
      f.display();
    }
  }

  // 새가 물고기를 잡으러 오거나 물고기와 함께 날아감
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

    // 화면 안에서 좌우로 방향을 바꿈
    if (this.x > width - this.size * 2 || this.x < this.size * 2) {
      this.speed *= -1;
    }

    // 물고기 머리가 향하는 쪽에 맞춰 좌우 반전
    if (this.speed < 0) {
      this.angle = PI;
    } else {
      this.angle = 0;
    }
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

class Bird {
  constructor(fish) {
    this.fish = fish;
    this.x = fish.x;
    this.y = -40;
    this.targetY = fish.y - 25;
    this.speed = 5;
    this.state = "down";
    this.done = false;
  }

  update() {
    if (this.state === "down") {
      this.y += this.speed;

      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.state = "up";
        this.fish.taken = true;
      }
    } else if (this.state === "up") {
      this.y -= this.speed;

      // 새가 물고기를 잡고 있으므로 물고기도 함께 이동
      this.fish.x = this.x;
      this.fish.y = this.y + 28;

      if (this.y < -60) {
        this.done = true;
      }
    }
  }

  display() {
    // 갈매기처럼 보이는 몸통과 날개
    push();
    translate(this.x, this.y);
    fill("#ffffff");

    // 몸
    ellipse(0, 0, 42, 20);

    // 날개
    triangle(-8, -3, -28, -18, -18, 2);
    triangle(5, -3, 27, -17, 17, 3);

    // 부리
    fill("#f2a900");
    triangle(18, 0, 30, 4, 18, 7);
    pop();

    // 잡힌 물고기를 새 아래에 그리기
    if (this.state === "up") {
      this.fish.display();
    }
  }
}

function mousePressed() {
  // 새가 이미 날아가는 중이면 다른 물고기를 선택하지 않음
  if (bird !== null) {
    return;
  }

  // 마우스 위치에 가까운 물고기를 찾음
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
