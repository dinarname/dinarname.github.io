function changeDirection() {
  //первый способ
  // if (this.velocity.x === 1) {
  //   this.velocity.x = 0;
  //   this.velocity.y = 1;
  //   // this.velocity.y = random(10) >= 5 ? -1 : 1;
  // } else if (this.velocity.y === 1) {
  //   this.velocity.x = -1;
  //   this.velocity.y = 0;
  // } else if (this.velocity.x === -1) {
  //   this.velocity.x = 0;
  //   this.velocity.y = -1;
  // } else if (this.velocity.y === -1) {
  //   this.velocity.x = 1;
  //   this.velocity.y = 0;
  // }


  //Второй способ
  if (this.velocity.x !== 0) {
    this.velocity.x = 0;
    this.velocity.y = random(10) >= 5 ? -1 : 1;
  } else if (this.velocity.y !== 0) {
    this.velocity.x = random(10) >= 5 ? -1 : 1;
    this.velocity.y = 0;
  }

  // Третий способ
  // if (random(10) >= 5) {
  //   this.velocity.x = random(10) >= 5 ? -1 : 1;
  //   this.velocity.y = 0;
  // } else {
  //   this.velocity.x = 0;
  //   this.velocity.y = random(10) >= 5 ? -1 : 1;
  // }

  // Поворот спрайта
  if (this.velocity.x > 0) {
    this.changeAnimation("right");
  } else if (this.velocity.x < 0) {
    this.changeAnimation("left");
  }

  if (this.velocity.y > 0) {
    this.changeAnimation("front");
  } else if (this.velocity.y < 0) {
    this.changeAnimation("back");
  }

}