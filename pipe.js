/**
 * constructor for the sigmoid barriers 
 */

class Pipe {
  constructor() {
    let spacing = 125;
    let centery = my1p5.random(spacing, my1p5.height - spacing);
    this.top = centery - spacing / 2;
    this.bottom = my1p5.height - (centery + spacing / 2);
    this.x = my1p5.width;
    this.w = 60; //width of barrier
    this.speed = 5;
  }

 /**
  * Check if the agent hit a barrier
  * @param {*} bird 
  */
  hits(bird) {
    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > my1p5.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.passed = true;
        return true;
      }
    }
    return false;
  }

   /**
     * draw barriers with p5.js functions
     */
  show() {
    my1p5.strokeWeight(3);
    my1p5.stroke(63, 94, 70);
    my1p5.fill(63, 94, 70);
    my1p5.rect(this.x, 0, this.w, this.top);
    my1p5.rect(this.x, my1p5.height - this.bottom, this.w, this.bottom);
    my1p5.strokeWeight(0);
  }
/**
 * check if the agent passes a barrier
 * @param {*} bird 
 */
  pass(bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }
/**
 * update the barrier position
 */
  update() {
    this.x -= this.speed;
  }
  offscreen (){
    return(this.x < -this.w);
  }

}
