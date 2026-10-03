let fishes = [];
let birds = [];
let waterOffset = 0;
let waterFlow = 1;

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
    { size: 54 - 10, speed: 5.4 },
    { size: 39 - 10, speed: 2.3 },
    { size: 69 - 10, speed: 4.1 },
    { size: 48 - 10, speed: 2.6 },
    { size: 60 - 10, speed: 2.4 },
    { size: 33 - 10, speed: 3.1 },
  ];

  let fishColors = [
    "#e34720",
    "#f9783d",
    "#ff6601",
    "#f4a62a",
    "#e85d75",
    "#ffb347",
    "#8a5bd1",
    "#37a6a0",
    "#ef476f",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#073b4c",
    "#9b5de5",
    "#f15bb5",
    "#00f5d4",
    "#ff70a6",
    "#70d6ff",
    "#e9ff70",
    "#ff9770",
    "#845ec2",
    "#4d96ff",
    "#c34a36",
    "#6bcb77",
    "#f9f871",
  ];

  for (let setting of fishSettings) {
    // 물결의 가장 낮은 지점보다 아래에 물고기 생성
    let waterTop = height * 0.4 + 48;
    let x = random(setting.size * 1.5, width - setting.size * 1.5);
    let y = random(waterTop + setting.size, height - setting.size);

    let colorIndex = Math.floor(random(fishColors.length));
    let fishColor = fishColors.splice(colorIndex, 1)[0];

    fishes.push(new Fish(x, y, setting.size, fishColor, setting.speed));
  }
}
for (let setting of fishSettings) {
  let waterTop = height * 0.4;
  let x = random(setting.size * 1.5, width - setting.size * 1.5);
  let y = random(waterTop + setting.size, height - setting.size);

  fishes.push(new Fish(x, y, setting.size, setting.color, setting.speed));
}

function draw() {
  background("#d9f3ff");

  // 물결 모양의 물을 그림
  drawWater();

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

function drawWater() {
  let surfaceY = height * 0.4;
  let waveHeight = 48;
  let waveLength = 320;

  // 물결을 오른쪽으로 계속 이동
  waterOffset += waterFlow;

  if (waterOffset > waveLength) {
    waterOffset -= waveLength;
  }

  noStroke();
  fill("#53b9e8");

  beginShape();
  vertex(0, height);

  // 물의 윗 경계를 물결 모양으로 그림
  for (let x = 0; x <= width; x += 10) {
    let y =
      surfaceY + sin(((x - waterOffset) / waveLength) * TWO_PI) * waveHeight;

    vertex(x, y);
  }

  vertex(width, height);
  endShape(CLOSE);
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
  drawOneSeaweed(75, 800, "#078f4a");
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
