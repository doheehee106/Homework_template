const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;

let sizeScale = 1.3;
let engine;
let fish;
let fish2;
let ground;
let fish3;
let leftWall, rightWall, topWall;
let drop1, drop2, drop3, drop4, drop5, drop6, drop7, drop8;

let fishX, fishY;
let fish2X, fish2Y;
let fish3X, fish3Y;
let floorY = 0;
let fishSize = 24;
let margin = 30;
let moveRight = 50;

function setup() {
  createCanvas(560, 960);

  rectMode(CENTER);
  noStroke();

  engine = Engine.create();
  engine.gravity.y = 2;
  //와이축으로 떨어지는 속도. 0.1로 했더니 우주같으
  //1로하니까 평범.
  engine.gravity.x = 0;
  engine.gravity.scale = 0.001;

  floorY = height - margin - 15;

  // 바닥과 화면 가장자리 충돌체
  ground = Bodies.rectangle(
    width / 2,
    height - margin / 2,
    width - margin * 2,
    margin,
    {
      isStatic: true,
      restitution: 1,
    },
  );

  leftWall = Bodies.rectangle(margin / 2, height / 2, margin, height, {
    isStatic: true,
  });

  rightWall = Bodies.rectangle(width - margin / 2, height / 2, margin, height, {
    isStatic: true,
  });

  topWall = Bodies.rectangle(width / 2, margin / 2, width, margin, {
    isStatic: true,
  });

  // 어항에서 튀어나오는 물고기 두 마리
  fish = Bodies.circle(
    width * 0.25 + moveRight,
    height * 0.6,
    fishSize * sizeScale,
    {
      restitution: 0.95,
      friction: 0.001,
      frictionAir: 0,
    },
  );

  fish2 = Bodies.circle(
    width * 0.3 + moveRight,
    height * 0.4,
    fishSize * sizeScale,
    {
      restitution: 0.89,
      friction: 0.001,
      frictionAir: 0,
    },
  );

  fish3 = Bodies.circle(
    width * 0.22 + moveRight,
    height * 0.5,
    fishSize * sizeScale,
    {
      restitution: 0.99,
      friction: 0.001,
      frictionAir: 0.00001,
    },
  );

  drop1 = Bodies.circle(width * 0.15 - 12 + moveRight, height * 0.445, 5, {
    restitution: 0.2,
    frictionAir: 0.01,
  });

  drop2 = Bodies.circle(width * 0.15 - 6 + moveRight, height * 0.445, 9, {
    restitution: 0.4,
    frictionAir: 0.01,
  });

  drop3 = Bodies.circle(width * 0.15 + moveRight, height * 0.445, 6, {
    restitution: 0.3,
    frictionAir: 0.01,
  });

  drop4 = Bodies.circle(width * 0.25 - 12 + moveRight, height * 0.445, 8, {
    restitution: 0.4,
    frictionAir: 0.01,
  });

  drop5 = Bodies.circle(width * 0.15 - 10 + moveRight, height * 0.445, 7, {
    restitution: 0.3,
    frictionAir: 0.01,
  });

  drop6 = Bodies.circle(width * 0.25 - 18, height * 0.445, 7, {
    restitution: 0.4,
    frictionAir: 0.01,
  });

  drop7 = Bodies.circle(width * 0.25 - 10, height * 0.445, 5, {
    restitution: 0.3,
    frictionAir: 0.01,
  });

  drop8 = Bodies.circle(width * 0.15 + 20, height * 0.445, 4.5, {
    restitution: 0.5,
    frictionAir: 0.01,
  });

  Composite.add(engine.world, ground);
  Composite.add(engine.world, leftWall);
  Composite.add(engine.world, rightWall);
  Composite.add(engine.world, topWall);
  Composite.add(engine.world, fish);
  Composite.add(engine.world, fish2);
  Composite.add(engine.world, fish3);
  Composite.add(engine.world, drop1);
  Composite.add(engine.world, drop2);
  Composite.add(engine.world, drop3);
  Composite.add(engine.world, drop4);
  Composite.add(engine.world, drop5);
  Composite.add(engine.world, drop6);
  Composite.add(engine.world, drop7);
  Composite.add(engine.world, drop8);

  //바디스로 설정하고 컴포짓에드로 불러오고 바디로 움직임조정!!
  // 첫 번째 물고기는 오른쪽으로, 두 번째는 왼쪽으로 튀어나감
  //세번째는 좀 왼쪽으로 얌전히
  Body.setVelocity(fish, {
    x: -10,
    y: -18,
  });

  Body.setVelocity(fish2, {
    x: -4,
    y: -12,
  });

  Body.setVelocity(fish3, {
    x: 0,
    y: -10,
  });

  //물방울 튀기기
  Body.setVelocity(drop1, { x: -3, y: -7 });
  Body.setVelocity(drop2, { x: -1, y: -10 });
  Body.setVelocity(drop3, { x: 1, y: -8 });
  Body.setVelocity(drop4, { x: 3, y: -9 });
  Body.setVelocity(drop5, { x: 4, y: -6 });
  Body.setVelocity(drop6, { x: 5, y: -8 });
  Body.setVelocity(drop7, { x: 4, y: -7 });
  Body.setVelocity(drop8, { x: 4, y: -8 });
}

function draw() {
  Engine.update(engine);
  background("#a22647");

  drawFloor();
  push();
  translate(moveRight, 0);

  drawTable();
  drawFishBowl();
  drawFishBowlWatter();
  drawDrops();
  pop();
  drawWindow();
  drawCat(437, 290);
  //드로우 바로밑에(펑션드로우 전) 꼭 뭐 그리는지 넣을것

  fishX = fish.position.x;
  fishY = fish.position.y;

  fish2X = fish2.position.x;
  fish2Y = fish2.position.y;

  fish3X = fish3.position.x;
  fish3Y = fish3.position.y;

  // 첫 번째 물고기
  push();
  translate(fishX, fishY);
  rotate(fish.angle);
  scale(sizeScale);

  fill("#e34720");

  ellipse(0, 0, fishSize * 2, fishSize * 1.3);
  triangle(-15, 0, -28, -10, -28, 10);

  fill(0);
  circle(8, -3, 3.7);
  pop();

  // 두 번째 물고기
  push();
  translate(fish2X, fish2Y);
  rotate(fish2.angle);
  scale(-sizeScale, sizeScale);

  fill("#f9783d");
  ellipse(0, 0, fishSize * 2, fishSize * 1.2);
  triangle(-15, 0, -28, -10, -28, 10);

  fill(0);
  circle(8, -3, 3.6);
  pop();

  //세 번째 물고기
  push();
  translate(fish3X, fish3Y);
  rotate(fish3.angle);
  scale(sizeScale);

  fill("#ff6601");
  ellipse(0, 0, fishSize * 1.5, 23);
  triangle(-8, 0, -28, -8, -28, 8);

  fill(0);
  circle(6, -2, 3.5);

  pop();
}
//물튀긴다
function drawDrops() {
  fill("#1670df");
  circle(drop1.position.x, drop1.position.y, 10);
  circle(drop2.position.x, drop2.position.y, 16);
  circle(drop3.position.x, drop3.position.y, 8);
  circle(drop4.position.x, drop4.position.y, 14);
  circle(drop5.position.x, drop5.position.y, 10);
  circle(drop6.position.x, drop6.position.y, 12);
  circle(drop7.position.x, drop7.position.y, 10);
  circle(drop8.position.x, drop8.position.y, 14);
}
function drawFishBowl() {
  // 어항 배경
  fill("#b8e3f0");
  ellipse(width * 0.25, height * 0.45, 190 * sizeScale, 145 * sizeScale);
  //어항 물채워져잇음
  fill("#1670df");
  //ellipse(width * 0.25, height * 0.47, 165 * sizeScale, 115 * sizeScale);
  arc(
    width * 0.25,
    height * 0.445,
    165 * sizeScale,
    150 * sizeScale,
    0,
    PI,
    PIE,
  );

  // 어항 테두리
  noFill();
  stroke("#b8e3f0");
  strokeWeight(10);
  ellipse(width * 0.25, height * 0.45, 190 * sizeScale, 145 * sizeScale);

  //어항 머리
  fill("#b8e3f0");
  fill("#");
  noStroke();
  rect(width * 0.25, height * 0.36, 100, 35);

  // 깨진 어항들
  let crackX = width * 0.25;
  let crackY = height * 0.45;

  stroke("#7faebc");
  strokeWeight(2);

  // 길게 꺾인 금
  line(crackX + 45, crackY - 50, crackX + 56, crackY - 34);
  line(crackX + 56, crackY - 34, crackX + 49, crackY - 22);
  line(crackX + 49, crackY - 22, crackX + 65, crackY - 7);
  line(crackX + 65, crackY - 7, crackX + 58, crackY + 7);

  // 옆으로 갈라진 금
  line(crackX + 56, crackY - 34, crackX + 70, crackY - 40);
  line(crackX + 49, crackY - 22, crackX + 36, crackY - 16);
  line(crackX + 65, crackY - 7, crackX + 77, crackY - 12);

  noStroke();
}
//물쏟아지뮤
function drawFishBowlWatter() {
  fill("#1670df");
  rect(width * 0.25, height * 0.76, 100, 600);
}

function drawTable() {
  fill("#aa8654");
  //이거바로밑이 상판
  rect(width * 0.25, height * 0.556, 263 * sizeScale, 30 * sizeScale);
  // 상판과 기둥이 만나는 곳의 얇은 그림자
  //이거바로밑이 기둥
  rect(width * 0.25, height * 0.75, 195 * sizeScale, height * 0.32 * sizeScale);
  push();
  fill("#8f6c43");
  noStroke();
  rect(width * 0.25, height * 0.556 + 18.9 * sizeScale, 195 * sizeScale, 10);
  pop();
}

function drawFloor() {
  // 바닥을 밝은색으로 먼저 깔기
  fill("#aaa996");
  rect(width / 2, height - 30, width, 60);

  // 윗줄의 어두운 칸, 간격 120, 한칸60
  fill("#292b27");
  rect(30, height - 45, 60, 30);
  rect(150, height - 45, 60, 30);
  rect(270, height - 45, 60, 30);
  rect(390, height - 45, 60, 30);
  rect(510, height - 45, 60, 30);

  // 아랫줄의 어두운 칸
  rect(90, height - 15, 60, 30);
  rect(210, height - 15, 60, 30);
  rect(330, height - 15, 60, 30);
  rect(450, height - 15, 60, 30);
}
function drawWindow() {
  fill("#3d94ff");
  rect(430, 200, 180, 220);
}
function drawCat(x, y) {
  push();
  noStroke();

  // 귀
  fill("#2c2d2e");
  triangle(x - 38, y - 15, x - 34, y - 52, x - 8, y - 30);
  triangle(x + 38, y - 15, x + 34, y - 52, x + 8, y - 30);

  // 얼굴
  ellipse(x, y, 86, 72);

  // 청록색 눈
  fill("#32c6b2");
  ellipse(x - 18, y - 4, 16, 20);
  ellipse(x + 18, y - 4, 16, 20);

  // 눈동자
  fill("#202326");
  circle(x - 20, y - 2, 12);
  circle(x + 16, y - 2, 12);
  //반짝이
  fill("#e8ecf0");
  circle(x - 21.5, y + 0.3, 4);
  circle(x + 14, y, 4);

  // 코
  fill("#f2a3a3");
  ellipse(x, y + 9, 7, 5);

  pop();
  fill("#6b1635");
  rect(430, 320, 180, 20);
}
