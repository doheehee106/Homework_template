let fishes = [];
let firstX = 0;

function setup() {
  createCanvas(1000, 800);
  rectMode(CENTER);
  noStroke();

  fishes = [];
  createFishGroup();
}

function createFishGroup() {
  let fishSettings = [
    { size: 54 - 10, color: "#e34720", speed: 5.4 },
    { size: 39 - 10, color: "#f9783d", speed: 2.3 },
    { size: 69 - 10, color: "#ff6601", speed: 4.1 },
    { size: 48 - 10, color: "#f4a62a", speed: 2.6 },
    { size: 60 - 10, color: "#e85d75", speed: 2.4 },
    { size: 33 - 10, color: "#ffb347", speed: 3.1 },
  ];

  for (let setting of fishSettings) {
    let waterTop = height * 0.4;
    let x = random(setting.size * 1.5, width - setting.size * 1.5);
    let y = random(waterTop + setting.size, height - setting.size);

    fishes.push(new Fish(x, y, setting.size, setting.color, setting.speed));
  }
}

function draw() {
  background("#d9f3ff");

  // 화면 아래쪽 3/5를 물로 채움
  fill("#53b9e8");
  rect(width / 2, height * 0.7, width, height * 0.6);

  drawSeaweed();

  // 물고기 움직이기, 그리고 화면 밖에 나간 물고기 삭제하기
  for (let i = fishes.length - 1; i >= 0; i--) {
    let f = fishes[i];

    if (!f.taken && !f.death) {
      f.move();
      f.display();
    }

    if (f.death) {
      fishes.splice(i, 1);
    }
  }
}

function mousePressed() {
  // 쓸기 시작한 가로 위치 저장
  firstX = mouseX;
}

function mouseReleased() {
  let dx = mouseX - firstX;

  // 짧게 누른 동작은 쓸기로 처리하지 않음
  if (dx > -25 && dx < 25) {
    return;
  }

  // 쓸기 거리가 길수록 물살이 강해짐
  let currentSpeed = map(abs(dx), 25, width, 4, 18);
  let direction = dx > 0 ? 1 : -1;

  for (let f of fishes) {
    f.swept = true;
    f.currentSpeed = currentSpeed * direction;
    f.speed = f.currentSpeed;
  }
}

function drawSeaweed() {
  drawOneSeaweed(75, 800, "#078f4a");
  drawOneSeaweed(150, 800, "#2caf72");
}

function drawOneSeaweed(x, bottomY, kelpColor) {
  push();
  translate(x, bottomY);

  noStroke();
  fill(kelpColor);

  // 겹친 타원으로 만든 다시마
  ellipse(-8, -45, 48, 100);
  ellipse(-18, -115, 52, 120);
  ellipse(-8, -195, 55, 125);
  ellipse(8, -270, 58, 130);
  ellipse(16, -340, 58, 110);
  ellipse(15, -390, 55, 65);

  // 가운데 잎맥
  stroke("#087c43");
  strokeWeight(7);

  line(-8, -5, -8, -80);
  line(-8, -80, -18, -150);
  line(-18, -150, -8, -225);
  line(-8, -225, 8, -300);
  line(8, -300, 15, -375);

  pop();
}
