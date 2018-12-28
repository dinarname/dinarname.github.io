let wave;
let slider;
let button;
let playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  wave = new p5.Oscillator();
  wave.setType('square');

  button = createButton('start');
  button.mousePressed(soundToogle);

  slider = createSlider(20, 20000, 440);
  // slider.style('width', 500);
}

function soundToogle() {
  if(!playing) {
    wave.start();
    wave.amp(1);
    playing = true;
  } else {
    wave.stop();
    playing = false;
  }
}

function draw() {
  background(0);
  wave.freq(slider.value());
}
