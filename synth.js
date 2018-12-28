let w, h;
let keyboard = [];
let c = [
  ['#ffa99a','#f9b0a3','#f4b7ac','#edbeb5','#e6c4be','#decbc7','#d6d1d0','#cdd7d9','#c2dee3','#b7e4ec','#a9eaf6','#9af0ff'],
  ['#20807a','#3b7972','#4b726a','#566a62','#60635a','#675b52','#6d534b','#724b43','#77423c','#7a3835','#7d2d2e','#802027'],
  ['#00c2b5','#54b6a5','#71aa95','#859e85','#949175','#a08466','#a97657','#b16848','#b7583a','#bb462b','#bf301d','#c2000d'],
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width / 12;
  h = height / 3;
  t = millis();
  createKeyboard();
}


function draw() {
  background(255);
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = width / 12;
  h = height / 3;
  createKeyboard();
}

function createKeyboard() {
  noStroke();
  stroke(255);
  let x = 0;
  let y = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 12; j++) {
      keyboard.push(new pad(x, y, c[i][j]));
      x += w;
    }
    x = 0;
    y += h;
  }
}

function pad(x, y, c) {
  this.x = x;
  this.y = y;
  this.c = color(c);
  this.active = false;

  this.display = function() {
    if (this.isCovered()) {
      fill(c);
    } else fill(255);
    rect(this.x, this.y, w, h);
  };

  this.isCovered = function() {
    if (mouseX >= x && mouseX <= x + w) {
      if (mouseY >= y && mouseY <= y + h) {
        return true;
      }
    } else return false;
  };

}
