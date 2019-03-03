function bombermanAddAnimation() {
  bomberman.addImage("standBack", bombermanImg[0]);
  bomberman.addImage("standFront", bombermanImg[1]);
  bomberman.addImage("standLeft", bombermanImg[2]);
  bomberman.addImage("standRight", bombermanImg[3]);

  bomberman.scale = w / (bomberman.height);
  // bomberman.debug = true;

  bomberman.setCollider("rectangle", 0, 8, w * 1.1, w * 2);

  bomberman.addAnimation("backView", "sprites/Bomberman/Back/Bman_B_f00.png", "sprites/Bomberman/Back/Bman_B_f07.png");
  bomberman.addAnimation("frontView", "sprites/Bomberman/Front/Bman_F_f00.png", "sprites/Bomberman/Front/Bman_F_f07.png");
  bomberman.addAnimation("leftView", "sprites/Bomberman/Left/Bman_L_f00.png", "sprites/Bomberman/Left/Bman_L_f07.png");
  bomberman.addAnimation("rightView", "sprites/Bomberman/Right/Bman_R_f00.png", "sprites/Bomberman/Right/Bman_R_f07.png");
}



function bombermanController() {
  if (keyIsPressed) {
    let velocity = 1;
    if (key === "w") {
      bomberman.changeAnimation("backView");
      bomberman.setVelocity(0, -velocity);
    }
    if (key === "s") {
      bomberman.changeAnimation("frontView");
      bomberman.setVelocity(0, velocity);
    }
    if (key === "a") {
      bomberman.changeAnimation("leftView");
      bomberman.setVelocity(-velocity, 0);
    }
    if (key === "d") {
      bomberman.changeAnimation("rightView");
      bomberman.setVelocity(velocity, 0);
    }
  } else {
    if (bomberman.velocity.x > 0) bomberman.changeAnimation("standRight");
    if (bomberman.velocity.x < 0) bomberman.changeAnimation("standLeft");
    if (bomberman.velocity.y > 0) bomberman.changeAnimation("standFront");
    if (bomberman.velocity.y < 0) bomberman.changeAnimation("standBack");

    bomberman.setVelocity(0, 0);
  }

  bomberman.animation.frameDelay = 2;
}