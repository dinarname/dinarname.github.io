let greenField;
let wall;
let bomberman;
let enemy;
let enemies;

let stoneImg, grassImg;
let bombermanImg = [];
let w;

let enemyImg = {
  back: 0,
  front: 0,
  left: 0,
  right: 0,
}


function preload() {
  grassImg = loadImage("sprites/Blocks/BackgroundTile.png");
  stoneImg = loadImage("sprites/Blocks/SolidBlock.png");

  // Переделать загрузку спрайтов для бомбермена в таком же формате как и для врага
  bombermanImg[0] = loadImage("sprites/Bomberman/Back/Bman_B_f00.png");
  bombermanImg[1] = loadImage("sprites/Bomberman/Front/Bman_F_f00.png");
  bombermanImg[2] = loadImage("sprites/Bomberman/Left/Bman_L_f00.png");
  bombermanImg[3] = loadImage("sprites/Bomberman/Right/Bman_R_f00.png");
  ////////////

  // Добавляем пакеты спрайтов
  enemyImg.back = loadAnimation("sprites/Creep/Back/Creep_B_f00.png", "sprites/Creep/Back/Creep_B_f05.png");
  enemyImg.front = loadAnimation("sprites/Creep/Front/Creep_F_f00.png", "sprites/Creep/Front/Creep_F_f05.png");
  enemyImg.left = loadAnimation("sprites/Creep/Left/Creep_L_f00.png", "sprites/Creep/Left/Creep_L_f05.png");
  enemyImg.right = loadAnimation("sprites/Creep/Right/Creep_R_f00.png", "sprites/Creep/Right/Creep_R_f05.png");
}



function setup() {
  let canvas = createCanvas(680, 520);
  canvas.parent('game');

  greenField = new Group();
  wall = new Group();
  createScene();

  // -------------- Бомбермен
  bomberman = createSprite(width / 2, height / 2, w, w);
  bombermanAddAnimation();


  // ----------- Враг
  enemy = createSprite(200, 200, w, w);
  enemy.velocity.y = -1;
  enemy.scale = w / 64;
  enemy.maxSpeed = 1;
  // enemies = new Group();

  // Добавляем врагу анимацию с лейблами
  enemy.addAnimation("back", enemyImg.back);
  enemy.addAnimation("front", enemyImg.front);
  enemy.addAnimation("left", enemyImg.left);
  enemy.addAnimation("right", enemyImg.right);



  // Задаём порядок в котором будут отображаться спрайты
  bomberman.depth = 2;
  enemy.depth = 2;

  for (element of greenField) {
    element.depth = 1;
  }

  for (element of wall) {
    element.depth = 1;
  }



}



function draw() {
  background(200);

  bombermanController();

  for (element of wall) {
    // bomberman.collide(element);
    enemy.collide(element, changeDirection);
    // enemy.collide(element);
  }

  bomberman.collide(wall);

  if (frameCount % 300 === 0) {
    let dx = random(width);
    let dy = random(width);
    // enemy.attractionPoint(2, dx, dy);


    // if (random(10) > 5) {
    //   enemy.velocity.x = -1;
    // } else {
    //   enemy.velocity.y = -1;
    // }

    console.log(`dx = ${dx} | dy = ${dy}`);
  }

  drawSprites();
}




function createScene() {
  let rows = 13;
  let columns = 17;
  w = width / columns;
  let x = w / 2;
  let y = w / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let sp = createSprite(x, y, w, w);

      /*----- Создание невзрываемых элементов поля с помощью камней -----*/
      if ((i === 0 || i === rows - 1) ||
        (j === 0 || j === columns - 1) ||
        (i % 2 === 0 && j % 2 === 0)) {
        sp.addImage(stoneImg);
        sp.scale = w / sp.width;
        wall.add(sp);
      } else {
        sp.addImage(grassImg);
        sp.scale = w / sp.width;
        greenField.add(sp);
      }

      x += w;
    }
    x = w / 2;
    y += w;
  }
}