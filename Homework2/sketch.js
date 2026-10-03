let fishes = [];
let birds = [];

function setup() {
  createCanvas(1000, 800);
  rectMode(CENTER);
  noStroke();

  fishes = [];
  birds = [];
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

  for (let f of fishes) {
    if (!f.taken) {
      f.move();
      f.display();
    }
  }

  // 새들을 업데이트하고 그림
  for (let i = birds.length - 1; i >= 0; i--) {
    let b = birds[i];

    b.update();
    b.display();

    if (b.done) {
      let fishIndex = fishes.indexOf(b.fish);

      if (fishIndex !== -1) {
        fishes.splice(fishIndex, 1);
      }

      birds.splice(i, 1);
    }
  }

  // 모든 물고기와 새가 사라지면 물고기 무리를 다시 만듦
  if (fishes.length === 0 && birds.length === 0) {
    createFishGroup();
  }
}

function mousePressed() {
  for (let i = fishes.length - 1; i >= 0; i--) {
    let f = fishes[i];
    let dx = mouseX - f.x;
    let dy = mouseY - f.y;

    if (!f.taken && !f.beingChased && dx * dx + dy * dy < f.size * f.size * 2) {
      f.beingChased = true;
      birds.push(new Bird(f));
      break;
    }
  }
}

function drawSeaweed() {
  // 왼쪽 다시마
  drawOneSeaweed(75, 800, "#078f4a");

  // 그 옆의 다시마
  drawOneSeaweed(150, 800, "#2caf72");
}

function drawOneSeaweed(x, bottomY, kelpColor) {
  push();
  translate(x, bottomY);

  noStroke();
  fill(kelpColor);

  // 겹친 타원들로 길고 굽은 잎을 만듦
  ellipse(-8, -45, 48, 100);
  ellipse(-18, -115, 52, 120);
  ellipse(-8, -195, 55, 125);
  ellipse(8, -270, 58, 130);
  ellipse(16, -340, 58, 110);

  // 잎 끝
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
