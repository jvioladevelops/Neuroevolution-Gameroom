/**
 * Class for the Player Pipes
 * Constructor, Show, Hits, Pass, Update, Offscreen
 * @author Justin Viola
 */

  class pPipe {
    constructor() {

      let spacing = 125;
      let center = myp5.random(spacing, myp5.height - spacing);
      this.top = center - spacing / 2 ;
      this.bottom = myp5.height - (center + spacing / 2 );
  
      this.x = myp5.width;
      this.w = 60;
      this.speed = 4.5;
  
      this.passed = false;
    }

    show() {
      myp5.strokeWeight(3);
      myp5.stroke(63, 94, 70);
      myp5.fill(63, 94, 70);
      myp5.rect(this.x, 0, this.w, this.top);
      myp5.rect(this.x, myp5.height - this.bottom, this.w, this.bottom);
      myp5.strokeWeight(0);
    }

  hits(pbird) {
    if ((pbird.y - pbird.r) < this.top || (pbird.y + pbird.r) > (myp5.height - this.bottom)) {
      if (pbird.x > this.x && pbird.x < this.x + this.w) {
        this.passed = true;
        return true;
      }
    }
    return false;
  }

  pass(pbird) {
    if (pbird.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

    update () {
        this.x -= this.speed;
      }

    offscreen (){
      return(this.x < -this.w);
    }
  }
