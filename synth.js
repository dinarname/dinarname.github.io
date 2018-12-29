let w, h;
let keyboard = [];
let c = [
  ['#fff366','#f9dd6e','#f6c773','#f6b076','#f89876','#fc7f74','#f77586','#e37fab','#cc8ac9','#b095e1','#8fa0f3','#65abff'],
  ['#f1efba','#f0e2a9','#f0d49a','#f2c68d','#f6b881','#fca977','#fb9d7b','#f49490','#ed8aa7','#e57fc1','#da74de','#cc67ff'],
  ['#a0f1ba','#beeaaa','#d5e09b','#e7d38d','#f3c281','#fcad77','#f99488','#e983ad','#d57fcb','#bb87e2','#9a99f4','#67b3ff'],
];

//https://gka.github.io/palettes/
//#FFF366, #E8B67C, #FF7072, #BB89E8, #65ABFF
//F1EFBA, E8CB8B, FFA172, E88BA1, CC67FF
//A0F1BA, EBE28B, FFA172, CC4BE8, 67B3FF

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
  // stroke(255);
  let x = 0;
  let y = 0;
  let n = 16;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 12; j++) {
      let note = Math.pow(2, (n - 49) / 12) * 440;
      keyboard.push(new pad(x, y, c[i][j], note));
      n++;
      x += w;
    }
    x = 0;
    y += h;
  }
}

function pad(x, y, c, note) {
  this.x = x;
  this.y = y;
  this.c = c;
  this.toggle = false;
  this.note = note;
  this.wave;
  this.volume = 0;
  this.crated = false;

  this.display = function() {
    if (this.isCovered()) {
      fill(colorAlpha(c, 0.3));
    } else {
      fill(255);
    }



    if (this.toggle) fill(colorAlpha(c, 1));

    rect(this.x, this.y, w, h);

    if (!this.created) {
      this.createOsc();
    }

    if (this.toggle && (this.volume == 0)) {
      this.volume = 0.2;
    } else if (!this.toggle) {
      this.volume = 0;
    }
    this.wave.amp(this.volume, 0.05);
  };

  this.isCovered = function() {
    if (mouseX >= x && mouseX <= x + w) {
      if (mouseY >= y && mouseY <= y + h) {
        return true;
      }
    } else return false;
  };

  this.createOsc = function() {
    this.wave = new p5.Oscillator();
    this.wave.setType('sawtooth');
    this.wave.freq(this.note);
    this.wave.amp(0);
    this.wave.start();
    this.created = true;
  };

}

function mouseClicked() {
  for (let i = 0; i < keyboard.length; i ++) {
    if(keyboard[i].isCovered() && !keyboard[i].toggle) {
      keyboard[i].toggle = true;
      break;
    }
    if(keyboard[i].isCovered() && keyboard[i].toggle) {
      keyboard[i].toggle = false;
      break;
    }
  }
}

function touchStarted() {
  getAudioContext().resume();
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}
