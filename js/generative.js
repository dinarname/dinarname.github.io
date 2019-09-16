function setup() {
  createCanvas(400, 400);
  background('PEACHPUFF');
}

let step = 30;
let r, g, b;

function draw() {
  background('BLACK');
  strokeWeight(3);
  for (let x = 0; x < width; x += step){
    for (let y = 0; y < height; y += step) {
      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      stroke(r, g, b);
      if (random() > 0.5) {
        line(x, y, x + step, y + step);
      } else {
        line(x + step, y, x, y + step);
      }
    }
  }
  noLoop();
}

function keyPressed() {
  loop();
}
