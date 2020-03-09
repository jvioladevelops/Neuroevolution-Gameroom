 /**
  * Class for the Player bird
  * Constructor, Show, Update, Up, BottomTop Functions
  * @author Justin Viola
  */

class pBird {
    constructor() {
        this.y = myp5.height/2;
        this.x = 65;
        this.r = 12;

        this.gravity = 0.8;
        this.lift = -8;
        this.velocity = 0;

        this.width = 30;
        this.height = 30;
    }

    show () {
    myp5.fill(255, 240, 28);
    myp5.stroke(255, 240, 28);
    myp5.strokeWeight(0);
    myp5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    //eyes
    myp5.strokeWeight(0);
    myp5.fill(117, 20, 15, 255);
    myp5.stroke(117, 20, 15);
    myp5.ellipse(this.x+5, this.y-3, this.r / 3, this.r / 3);
    //mouth
    myp5.strokeWeight(2);
    myp5.noFill();
    myp5.stroke(235, 164, 52);
    myp5.line(this.x+12, this.y+6, this.x + 22, this.y );
    myp5.line(this.x+ 13, this.y -2, this.x + 22, this.y );
    //back wings
    myp5.stroke(255, 240, 28);
    myp5.line(this.x-12, this.y+6, this.x - 22, this.y +2 );
    myp5.line(this.x-22, this.y+2, this.x - 17, this.y );
    myp5.line(this.x-17, this.y , this.x - 22, this.y -2  );
    myp5.line(this.x-22, this.y -2, this.x - 12, this.y -5  );
    //side wings
    myp5.line(this.x, this.y-13 , this.x - 22, this.y -23  );
    myp5.line(this.x-22, this.y -23, this.x - 12, this.y -5  );
    myp5.line(this.x, this.y+13 , this.x - 22, this.y +23  );
    myp5.line(this.x-22, this.y +23, this.x - 12, this.y +6  );
    myp5.strokeWeight(0);   
    }

    up() {
        this.velocity += this.lift;
    }


    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if (this.y >= myp5.height - this.height / 2) {
            this.y = myp5.height - this.height / 2;
            this.velocity = 0;
        }
        if (this.y <= this.height / 2) {
            this.y = this.height / 2;
            this.velocity = 0;
        }
    }

    //game over when hitting the ground
    bottomTop () {
        if  ((this.y > myp5.height-18 || this.y < 18) && started ==false && vs == false){
            playerLOSES();
            playergameover();
          }
          if((this.y > myp5.height-18 || this.y < 18) && started == true){
              playergameover();
          }
          if((this.y > myp5.height-18 || this.y < 18) && vs ==true){
            aiWON();
            playerLOSES();
            if (feedforward == true) {
              endGame();
              gameover();
            }
            if (dfeedforward == true) {
              dffgameover();
              enddffGame();
            }
        }
    }
        
}

