Bground bg;
Pipe[] p = new Pipe[2];
Bird b;

void setup() {
  size(300, 600);
  bg = new Bground();
  p[0] = new Pipe(bg.y, 0);
  p[1] = new Pipe(bg.y, width / 1.6);
  b = new Bird();
}

void draw() {
  background(255);
  bg.display();  
  p[0].display();
  p[1].display();
  b.makeFlyAndJump();
  birdTouchCheck(b, bg, p);
}

void mousePressed() {
  loop();
  b.y = 0;
  b.acceleration = 0;
  p[0] = new Pipe(bg.y, 0);
  p[1] = new Pipe(bg.y, width / 1.6);
}

/* *************************
*
*1. Cпрайты подгоняются под размер окна.
*
*2. Нижняя часть анимирована массивом из двух одинаковых спрайтов.
*
************************** */

class Bground {
  PImage city;
  PImage[] grass = new PImage[2];
  int grassLength;
  int x, y, grassSpeed;

  Bground() {
    city = loadImage("sprites/background-day.png");
    city.resize(width, 0);

    grass[0] = grass[1] = loadImage("sprites/base.png");
    grass[0].resize(width, 0);
    grass[1].resize(width, 0);

    grassLength = grass[0].width;
    y = height - grass[0].height;
    x = 0;
    grassSpeed = 2;
  }

  void display() {
    imageMode(CORNER);
    image(city, 0, 0);
    grassMove();
  }

  void grassMove() {
    imageMode(CORNER);
    image(grass[0], x, y);
    image(grass[1], x + grassLength, y);
    x -= grassSpeed;
    if (abs(x) > grassLength) {
      x = 0;
    }
  }
}

/* *************************
*
*1.  Поворот спрайта реализова через изменение 
     точки начала координат + поворот относительно этой точки.
       >> translate(x, y);
       >> rotate(HALF_PI/5); – угол в радианах
 
     Переменная «x» изменяется относительно стандартной системы координат.
     Реализоано через «запоминание» стандартной системы координат.
       >> pushMatrix(); — запоминаем стандарнтую систему координат
       >> както изменяем систему координат
       >> popMatrix(); — восстанавливаем стандарнтую систему координат
*
*2.  Анимация реализована массивом из трёх спрайтов. Индекс элемента
     зависит от времени – функция flap().
*
*************************** */

class Bird {
  PImage[] flap = new PImage[3];
  float x, y; 
  float acceleration;

  int timer = millis(), delta = 200, i = 0;
  int w, h;


  Bird() {
    flap[0] = loadImage("sprites/bluebird-downflap.png");
    flap[1] = loadImage("sprites/bluebird-midflap.png");
    flap[2] = loadImage("sprites/bluebird-upflap.png");

    // sprite width & height
    w = flap[0].width;
    h = flap[0].height;

    x = width / 4;
    y = height / 4;
    acceleration = 0;
  }

  void makeFlyAndJump() {
    pushMatrix();
    control();
    display();
    flap();
    gravity();
    popMatrix();
  }


  void control() {
    if (keyPressed) {
      jmp();
    } else {
      down();
    }
  }

  void jmp() {
    translate(x, y);
    rotate(- HALF_PI/5);
    acceleration = 0;
    y -= 5;
  }

  void down() {
    translate(x, y);
    rotate(HALF_PI/3);
    acceleration += 0.2;
  }


  void display() {
    imageMode(CENTER);
    image(flap[i], 0, 0);
  }


  void flap() {
    if (millis() - timer > 100) {
      i++;
      timer = millis();
    }
    if (i == flap.length - 1) i =0;
  }


  void gravity() {
    y += acceleration;
  }
}


/* *************************
*
*1. Функция «birdTouchCheck» принимает три объекта - птицу, фон + 
*   массив из труб. 
*
************************** */

void gameOver() {
  PImage end;
  float x, y;
  end = loadImage("sprites/gameover.png");
  x = width / 2;
  y = height /2;

  image(end, x, y);
}


void birdTouchCheck(Bird bird, Bground background, Pipe[] pipe) {
  // Проверка на касание земли
  if (bird.y >= background.y) {
    gameOver();
    noLoop();
  }

  // В цикле проверка на прикосновение к трубам.
  for (int i = 0; i < pipe.length; i++) {
    if (bird.y > pipe[i].y || bird.y < pipe[i].y - pipe[i].delta) {
      if (bird.x >= pipe[i].x && bird.x <= pipe[i].x + pipe[i].pipeWidth) {
        gameOver();
        noLoop();
      }
    }
  }
}

/* *************************
*
*1.  Cпрайты подгоняются под размер окна. 
*
*2.  Трубы двигаются друг над другом на расстоянии «delta»
*
*3.  Для реализации нескольких объектов в Pipe() добавлен входной параметр
     «float pipeSpace»       
************************** */

class Pipe {
  PImage pipeUp, pipeDown;
  float x, y;
  int pipeWidth;
  int delta;
  int bottomBorder;

  Pipe(int btBrdr, float pipeSpace) {
    pipeUp = loadImage("sprites/pipe-green.png");
    pipeDown = loadImage("sprites/pipe-green.png");
    
    pipeWidth = pipeUp.width;
    pipeUp.resize(pipeWidth, height);
    pipeDown.resize(pipeWidth, height);

    x = width + pipeSpace;
    bottomBorder = btBrdr;
    y = random(height / 5, bottomBorder);
    delta = 100;
  }

  void display() {
    pushMatrix();
    translate(x, y);
    image(pipeDown, 0, 0);
    rotate(PI);
    image(pipeUp, - pipeWidth, delta);
    move();
    popMatrix();
  }

  void move() {
    x -= 1;
    if (x < - pipeWidth) {
      x = width;
       y = random(height / 5, bottomBorder);
    }
  }
}
