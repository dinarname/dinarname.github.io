let w;
let snake;
let food = {x: 0, y: 0};


function setup() {
  createCanvas(600, 600);
  frameRate(10);

  stroke(255);
  w = width / 20;

  snake = new SnakeObj();
  pickLocation();
}


function draw() {
  background("#E1F181");

  snake.crawl();
  snake.display();

  fill("#4C85C5");
  rect(food.x, food.y, w, w);
  if (snake.eat(food)) {
    pickLocation();
  }
}


function pickLocation() {
  let rows = width / w;
  let cols = height / w;

  food.x = w * (int(random(rows)));
  food.y = w * (int(random(cols)));
}


function SnakeObj() {
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  let tail = [];
  let amountEaten = 0;


  this.display = function() {
    fill("#f88379");
    rect(this.x, this.y, w, w);

    for (let i = 0; i < tail.length; i++) {
      rect(tail[i].x, tail[i].y, w, w);
    }

  };


  this.crawl = function() {

    for (let i = 0; i < tail.length - 1; i++) {
      tail[i] = tail[i + 1];
    }

    tail[amountEaten - 1] = {
      x: this.x,
      y: this.y,
    };


    this.x += this.speedX * w;
    this.y += this.speedY * w;

    this.teleport();

    if (this.isCollision()) {
      this.restart();
    }
  };

  this.teleport = function() {
    if (this.x >= width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width - w;
    }
    if (this.y >= height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height - w;
    }
  };

  this.isCollision = function() {
    for (let i = 0; i < tail.length; i++) {
      if (this.x === tail[i].x && this.y === tail[i].y) {
        return true;
      }
    }
    return false;
  }

  this.restart = function() {

    tail.length = amountEaten = 0;

    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;

    pickLocation();
  }

  this.direction = function(dirX, dirY) {
    this.speedX = dirX;
    this.speedY = dirY;
  };


  this.eat = function(meal) {
    if (this.x === meal.x && this.y === meal.y) {
      amountEaten += 1;
      return true;
    }
    return false;
  };
}


function keyPressed() {
  if (keyCode === UP_ARROW && snake.speedY !== 1) {
    snake.direction(0, - 1);
  }
  if (keyCode === DOWN_ARROW && snake.speedY !== - 1) {
    snake.direction(0, 1);
  }
  if (keyCode === LEFT_ARROW && snake.speedX !== 1) {
    snake.direction(- 1, 0);
  }
  if (keyCode === RIGHT_ARROW && snake.speedX !== - 1) {
    snake.direction(1, 0);
  }
}
