/**
 * constructor for the relu barriers 
 */

class dffPipe {
    constructor() {
      let spacing = 125;
      let centery = my1p5.random(spacing, my1p5.height - spacing);
      this.top = centery - spacing / 2;
      this.bottom = my1p5.height - (centery + spacing / 2);
      this.x = my1p5.width;
      this.w = 60; //width of the barrier
      this.speed = 5;
    }
  
  /**
   * Check if an agent hit a barrier
   * @param {*} dffbird 
   */
    hits(dffbird) {
      if ((dffbird.y - dffbird.r) < this.top || (dffbird.y + dffbird.r) > my1p5.height - this.bottom) {
        if (dffbird.x > this.x && dffbird.x < this.x + this.w) {
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
   * @param {*} dffbird 
   */
    pass(dffbird) {
      if (dffbird.x > this.x && !this.passed) {
        this.passed = true;
        return true;
      }
      return false;
    }
  
   /**
    * update barrier position
    */
    update() {
      this.x -= this.speed;
    }

    offscreen (){
      return(this.x < -this.w);
    }
  
  }
  