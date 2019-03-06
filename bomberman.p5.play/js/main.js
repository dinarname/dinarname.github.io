/*----------------------- Переменне для загрузки изображений ----------------*/
let stoneImg, grassImg, brickImg;
let bombermanImg = {
  back: 0,
  front: 0,
  left: 0,
  right: 0,
};
let enemyImg = {
  back: 0,
  front: 0,
  left: 0,
  right: 0,
};
/*----------------------------------------------------------------------------*/


/*----------------------------- Спрайты и группы -----------------------------*/
let greenField;
let wall;
let bricks;
let enemies;

let bomberman;
/*----------------------------------------------------------------------------*/


/*----------------------------- Переменные объектов и групп ------------------*/
let rows = 13;
let cols = 17;
let w;
/*----------------------------------------------------------------------------*/


/*------------------------- Загружаем картинки -------------------------------*/
function preload() {
  // Изобрадения для создания игрового поля
  grassImg = loadImage("sprites/Blocks/BackgroundTile.png");
  stoneImg = loadImage("sprites/Blocks/SolidBlock.png");
  brickImg = loadImage("sprites/Blocks/ExplodableBlock.png");

  // Изображения для анимации бомбермена
  bombermanImg.back = loadAnimation("sprites/Bomberman/Back/Bman_B_f00.png", "sprites/Bomberman/Back/Bman_B_f07.png");
  bombermanImg.front = loadAnimation("sprites/Bomberman/Front/Bman_F_f00.png", "sprites/Bomberman/Front/Bman_F_f07.png");
  bombermanImg.left = loadAnimation("sprites/Bomberman/Left/Bman_L_f00.png", "sprites/Bomberman/Left/Bman_L_f07.png");
  bombermanImg.right = loadAnimation("sprites/Bomberman/Right/Bman_R_f00.png", "sprites/Bomberman/Right/Bman_R_f07.png");

  // Изображения для анимации врага
  enemyImg.back = loadAnimation("sprites/Creep/Back/Creep_B_f00.png", "sprites/Creep/Back/Creep_B_f05.png");
  enemyImg.front = loadAnimation("sprites/Creep/Front/Creep_F_f00.png", "sprites/Creep/Front/Creep_F_f05.png");
  enemyImg.left = loadAnimation("sprites/Creep/Left/Creep_L_f00.png", "sprites/Creep/Left/Creep_L_f05.png");
  enemyImg.right = loadAnimation("sprites/Creep/Right/Creep_R_f00.png", "sprites/Creep/Right/Creep_R_f05.png");
}
/*----------------------------------------------------------------------------*/


function setup() {
  let canvas = createCanvas(680, 520);
  canvas.parent('game');
  // w = width / cols;
  w = 40;

  greenField = new Group();
  wall = new Group();
  bricks = new Group();
  createScene();

  // Бомбермен. Создание. Анимация. Размер. Коллайдер. Движение.
  bomberman = createSprite(w, w, w, w);
  bomberman.addAnimation("back", bombermanImg.back);
  bomberman.addAnimation("front", bombermanImg.front);
  bomberman.addAnimation("left", bombermanImg.left);
  bomberman.addAnimation("right", bombermanImg.right);
  bomberman.scale = w / 100;
  bomberman.setCollider("rectangle", 0, 8, w * 1.1, w * 2);
  // bomberman.debug = true;
  bomberman.walk = bombermanWalkFunction;


  // Враг. Создание. Анимация. Размер.
  // Чтобы поместить врагов в свободные от кирпичей ячейки - соберём координаты
  // этих ячеек в массив

  let positionOnGrassWithoutBricks = [];
  for (element of greenField) {
    if (!element.coveredByBrick) {
      positionOnGrassWithoutBricks.push(element.position);
    }
  }

  enemies = new Group();
  for (let i = 0; i < 10; i++) {
    let freeRandomPosition = floor(random(positionOnGrassWithoutBricks.length));
    let x = positionOnGrassWithoutBricks[freeRandomPosition].x;
    let y = positionOnGrassWithoutBricks[freeRandomPosition].y;
    let enemy = createSprite(x, y, w, w);

    enemy.addAnimation("back", enemyImg.back);
    enemy.addAnimation("front", enemyImg.front);
    enemy.addAnimation("left", enemyImg.left);
    enemy.addAnimation("right", enemyImg.right);
    enemy.scale = w / 70;
    enemy.maxSpeed = 1;
    enemy.changeDirection = changeDirection;
    enemy.setCollider("rectangle", 0, 0, wall[0].width, wall[0].height);

    if (random(10) >= 5) {
      enemy.velocity.x = random(10) >= 5 ? -1 : 1;
    } else {
      enemy.velocity.y = random(10) >= 5 ? -1 : 1;
    }

    enemies.add(enemy);
  }


  // Задаём слои в которых будут отображаться спрайты
  bomberman.depth = 2;

  for (element of enemies) {
    element.depth = 2;
  }

  for (element of bricks) {
    element.depth = 2;
  }

  for (element of greenField) {
    element.depth = 1;
  }

  for (element of wall) {
    element.depth = 1;
  }

}



function draw() {
  background(200);

  bomberman.collide(wall);
  bomberman.collide(bricks);
  bomberman.walk();


  for (enemy of enemies) {
    enemy.collide(wall, changeDirection);
    enemy.collide(bricks, changeDirection);
    enemy.collide(enemies, changeDirection);

    if (enemy.velocity.x === 0 && enemy.velocity.y === 0) {
      enemy.changeDirection();
    }

  }

  drawSprites();
}


/*-----------------------------Создание игрового поля ------------------------*/
function createScene() {
  let x = w / 2;
  let y = w / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      let element = createSprite(x, y, w, w);

      if ((i === 0 || i === rows - 1) ||
        (j === 0 || j === cols - 1) ||
        (i % 2 === 0 && j % 2 === 0)) {
        element.addImage(stoneImg);
        element.scale = w / element.width;
        wall.add(element);
      } else {
        element.addImage(grassImg);
        element.scale = w / element.width;

        if (random(10) >= 8 && i !== 1 && i !== 2 && j !== 1) {
          let elementB = createSprite(x, y, w, w);
          elementB.addImage(brickImg);
          elementB.scale = w / elementB.width;
          elementB.mouseActive = true;
          bricks.add(elementB);
          element.coveredByBrick = true;
        } else {
          element.coveredByBrick = false;
        }

        greenField.add(element);

      }
      x += w;
    }
    x = w / 2;
    y += w;
  }
}
/*----------------------------------------------------------------------------*/