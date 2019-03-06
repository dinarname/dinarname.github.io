function bombermanWalkFunction() {

  let velocity = 2;
  bomberman.animation.play();
  bomberman.animation.frameDelay = 2;

  if (keyDown(UP_ARROW)) {
    bomberman.changeAnimation("back");
    bomberman.setVelocity(0, -velocity);
  }

  if (keyDown(DOWN_ARROW)) {
    bomberman.changeAnimation("front");
    bomberman.setVelocity(0, velocity);
  }

  if (keyDown(LEFT_ARROW)) {
    bomberman.changeAnimation("left");
    bomberman.setVelocity(-velocity, 0);
  }

  if (keyDown(RIGHT_ARROW)) {
    bomberman.changeAnimation("right");
    bomberman.setVelocity(velocity, 0);
  }

  if (!keyIsPressed) {
    bomberman.animation.stop();
    bomberman.setVelocity(0, 0);
  }

}