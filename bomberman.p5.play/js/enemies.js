function changeDirection() {
  // this.attractionPoint(1, random(width), random(height));
  if (this.velocity.x === 1) {
    this.velocity.x = 0;
    this.velocity.y = 1;
    console.log("x = 1");
  } else if (this.velocity.y === 1) {
    this.velocity.x = -1;
    this.velocity.y = 0;
    console.log("y = 1");
  } else if (this.velocity.x === -1) {
    this.velocity.x = 0;
    this.velocity.y = -1;
    console.log("y = -1");
  } else if (this.velocity.y === -1) {
    this.velocity.x = 1;
    this.velocity.y = 0;
    console.log("y = -1");
  }
}