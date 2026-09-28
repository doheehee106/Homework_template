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

let fishX, fishY;
let fish2X, fish2Y;
let fish3X, fish3Y;
let floorY = 0;
let fishSize = 24;
let margin = 30;

function setup() {
  createCanvas(560, 960);
  rectMode(CENTER);
  noStroke();

  engine = Engine.create();
  engine.gravity.y = 0.9;
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
      restitution: 0.95,
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
  fish = Bodies.circle(width * 0.25, height * 0.6, fishSize * sizeScale, {
    restitution: 0.95,
    friction: 0.001,
    frictionAir: 0,
  });

  fish2 = Bodies.circle(width * 0.3, height * 0.6, fishSize * sizeScale, {
    restitution: 0.95,
    friction: 0.001,
    frictionAir: 0,
  });

  fish3 = Bodies.circle(width * 0.22, height * 0.67, fishSize * sizeScale, {
    restitution: 0.85,
    friction: 0.001,
    frictionAir: 0.00001,
  });

  Composite.add(engine.world, ground);
  Composite.add(engine.world, leftWall);
  Composite.add(engine.world, rightWall);
  Composite.add(engine.world, topWall);
  Composite.add(engine.world, fish);
  Composite.add(engine.world, fish2);
  Composite.add(engine.world, fish3);

  // 첫 번째 물고기는 오른쪽으로, 두 번째는 왼쪽으로 튀어나감
  //세번째는 좀 왼쪽으로 얌전히
  Body.setVelocity(fish, {
    x: 5,
    y: -12,
  });

  Body.setVelocity(fish2, {
    x: -4,
    y: -14,
  });

  Body.setVelocity(fish3, {
    x: 2,
    y: -3,
  });
}

function draw() {
  Engine.update(engine);
  background(255);

  drawFloor();
  drawTable();
  drawFishBowl();
  drawFishBowlWatter();

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

  fill("#ff641c");
  ellipse(0, 0, fishSize * 2, fishSize * 1.3);
  triangle(-15, 0, -28, -10, -28, 10);

  fill(0);
  circle(8, -3, 3.7);
  pop();

  // 두 번째 물고기
  push();
  translate(fish2X, fish2Y);
  rotate(fish2.angle);
  scale(sizeScale);

  fill("#e34720");
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

function drawFishBowl() {
  // 어항 물
  fill("#b8e3f0");
  ellipse(width * 0.25, height * 0.65, 190, 145);

  fill("#1670df");
  ellipse(width * 0.25, height * 0.67, 165, 115);

  // 어항 테두리
  noFill();
  stroke("#b8dce6");
  strokeWeight(10);
  ellipse(width * 0.25, height * 0.65, 190, 145);
  noStroke();
}
//물쏟아지뮤
function drawFishBowlWatter() {
  fill("#1670df");
  rect(width * 0.25, height * 0.86, 100, 300);
}

function drawTable() {
  fill("#aa8654");
  rect(width * 0.25, height * 0.72, 263, 30);
  rect(width * 0.25, height * 0.835, 195, height * 0.26);
}

function drawFloor() {
  let tileSize = 60;
  let tileX = margin - 60;
  let tileY = height - margin - 15;

  while (tileX < width - margin) {
    fill("#292b27");
    rect(tileX + tileSize / 2, tileY + 15, tileSize, 30);

    fill("#aaa996");
    rect(tileX + tileSize / 2, tileY + 45, tileSize, 30);

    tileX = tileX + tileSize;
  }
}
