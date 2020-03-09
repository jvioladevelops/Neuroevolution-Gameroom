/**
 * Agent Constructor for feed forward 
 * 
 */

class Bird {
  constructor(brain) {
    this.x = 65;
    this.y = my1p5.height/2;
    this.r = 12;
    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;
    this.getOffTheCeiling = 20;
    this.width = 30;
    this.height = 30;
    this.BT = 483.5;
    this.top = 0;

    /**
     * passing the neural network as the brain of the agent
     */
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutateWeight);
    } else {
      this.brain = new NeuralNetwork();
    }
    //Normalize fitness score
    this.score = 0;
    this.fitness = 0;
  }

 /**
  * Copy of the Agent Brain
  */
  copy() {
    return new Bird(this.brain);
  }
/**
 * Dispose of the brain
 */
  dispose() {
    this.brain.dispose();
  }

 /**
  * Display the agent
  * p5 show() function
  */
  show() {
    my1p5.fill(255, 240, 28);
    my1p5.stroke(255, 240, 28);
    my1p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    //eyeballs
    my1p5.fill(117, 20, 15, 255);
    my1p5.stroke(117, 20, 15);
    my1p5.ellipse(this.x+5, this.y-3, this.r / 3, this.r / 3);
    //mouth
    my1p5.strokeWeight(2);
    my1p5.noFill();
    my1p5.stroke(235, 164, 52);
    my1p5.line(this.x+12, this.y+6, this.x + 22, this.y );
    my1p5.line(this.x+ 13, this.y -2, this.x + 22, this.y );
    my1p5.stroke(255, 240, 28);
    my1p5.line(this.x-12, this.y+6, this.x - 22, this.y +2 );
    my1p5.line(this.x-22, this.y+2, this.x - 17, this.y );
    my1p5.line(this.x-17, this.y , this.x - 22, this.y -2  );
    my1p5.line(this.x-22, this.y -2, this.x - 12, this.y -5  );
    my1p5.line(this.x, this.y-13 , this.x - 22, this.y -23  );
    my1p5.line(this.x-22, this.y -23, this.x - 12, this.y -5  );
    my1p5.line(this.x, this.y+13 , this.x - 22, this.y +23  );
    my1p5.line(this.x-22, this.y +23, this.x - 12, this.y +6  );
    my1p5.strokeWeight(0);
  }
/**
 * save the brain
 */
  save() {
    this.brain.save();
  }
/**
 * closest barrier
 * @param {*} pipes
 */
  think(pipes) {
   //find the closest barrier
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = (pipes[i].x) - this.x+30;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    //creating the inputs that are passed to the neural network
    if (closest != null) {
      let inputs = [];
      // x position of closest barrier
      inputs[0] = my1p5.map(closest.x-40, this.x, my1p5.width, 0, 1);
      // position of barrier opening
      inputs[1] = my1p5.map(closest.top, 0, my1p5.height, 0, 1);
      // position of barrier opening
      inputs[2] = my1p5.map(closest.bottom, 0, my1p5.height, 0, 1);
      // agents's y position
      inputs[3] = my1p5.map(this.y, 0, my1p5.height-18, 0, 1);
      // y velocity
      inputs[4] = my1p5.map(this.velocity, 0, 20, 0, 1);
      //agents relation to the bottom
      inputs[5] = my1p5.map(this.BT, this.BT, this.BT+15, 0, 1);
      //agents relation to the top
      inputs[6] = my1p5.map(this.top, this.top, this.top+18, 0, 1);
      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }
/**
 * Tells agent to jump
 */
  up() {
    this.velocity += this.lift;
  }
/**
 * If the agent is too close to the top or bottom it dies
 */
  bottomTop() {
    return this.y > my1p5.height-18 || this.y < 18;
  }
/**
 * update the agents position 
 */
  update() {
    this.velocity += this.gravity;
     this.velocity *= 0.9;
    this.y += this.velocity;
 
    if (this.y >= my1p5.height - this.height / 2) {
      this.y = my1p5.height - this.height / 2;
      this.velocity = 0;
    }

  if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
  }

  if( this.y < 18){
    this.velocity += this.getOffTheCeiling;
  }
  if(this.y > my1p5.height-18){
    this.velocity += -12;
  }
/**
 * score is used in calculating fitness, every frame the agent is alive adds towards its fitness score
 */
    this.score++;
  }
}
