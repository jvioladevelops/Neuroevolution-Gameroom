
/**
 * Game Sketch
 * @author Justin Viola 
 */
var ppipes = [];
var safe = true;
var score = 0;
var maxScore = 0;
var gameoverFrame = 0;
var isOver = false; 
var touched = false;
var prevTouched = touched;
var kstarted = false;
var pcounter =0;
var playerbutton = document.getElementById("playergame");
playerbutton.disabled = false;
playerbutton.addEventListener('click', function(event) {
playerbutton.disabled = true;
});

let playerScoreSpan; 
let playerMaxScoreSpan;

//Setting the entire sketch as a variable that is callable in other folders
var s = function(p) {
    p.setup = function() {
      //Create the canvas
        p.createCanvas(600,500);
        myp5.noLoop();
        p.pbird = new pBird();

    //Access the interface elements
    playerScoreSpan = myp5.select('#score');
    playerMaxScoreSpan = myp5.select('#mscore');
    };

    p.draw = function() {
      p.background(153, 200, 247);
      p.fill(0, 0, 0);
      p.textSize(28);
      p.text('PLAYER', 475, 30);
      //sun
      p.fill (232, 222, 111);
      p.stroke(173, 170, 21);
      p.ellipse(10, 10, 125, 125);
      //clouds
      p.fill (230, 238, 250);
      p.stroke(173, 170, 21);
      p.ellipse(200, 45, 80, 60);
      p.stroke(230, 238, 250);
      p.ellipse(200, 70, 40, 40);
      p.ellipse(180, 60, 40, 40);
      p.ellipse(200, 30, 40, 40);
      p.ellipse(175, 36, 40, 40);
      p.ellipse(230, 30, 40, 40);
      p.ellipse(230, 52, 40, 40);

      //clouds
      p.fill (230, 238, 250);
      p.stroke(173, 170, 21);
      p.ellipse(280, 100, 80, 60);
      p.stroke(230, 238, 250);
      p.ellipse(280, 120, 40, 40);
      p.ellipse(280, 75, 40, 40);
      p.ellipse(250, 110, 40, 40);
      p.ellipse(257, 85, 40, 40);
      p.ellipse(310, 80, 40, 40);
      p.ellipse(310, 110, 40, 40);
      //clouds
      p.fill (230, 238, 250);
      p.stroke(173, 170, 21);
      p.ellipse(370, 50, 80, 60);
      p.stroke(230, 238, 250);
      p.ellipse(370, 70, 40, 40);
      p.ellipse(370, 30, 40, 40);
      p.ellipse(340, 60, 40, 40);
      p.ellipse(346, 25, 40, 40);
      p.ellipse(400, 67, 40, 40);
      p.ellipse(396, 34, 40, 40);
      //sun rays 1
      p.strokeWeight(2);
      p.noFill();
      p.stroke(232, 222, 111);
      p.bezier(40, 130, 5, 115, 55, 85, 15, 73);
     //sun ray 2
      p.stroke(230, 162, 94);
      p.bezier(40, 65, 85, 75, 40, 110, 85, 115);
      //sun ray 3
      p.stroke(232, 222, 111);
      p.bezier(62, 45, 105, 55, 55, 90, 120, 90);
     //sun ray 4
      p.stroke(227, 100, 100);
      p.bezier(72, 20, 110, 3, 90, 80, 135, 50);

       let x1;
       let x2;
       let x3;
       let x4;
       let num = 120;
       let delta = 5;
       p.strokeWeight(1.5);
       p.stroke(118, 156, 61);
       x1 = 0;
       x2 = 6;
       x3 = 7;
       x4 = 0;
       for(let i = 0; i <= num; i++){
        p.line(x1, 500, x2, 480);
        p.line(x3, 500, x4, 475);
        x1 += delta;
        x2 += delta;
        x3 += delta;
        x4 += delta;
       }
     p.strokeWeight(2);
//grass
      
//tree trunks
    p.fill (92, 67, 57);
    p.stroke(28, 17, 12);
    p.rect(25, 399, 25, 100);
    p.rect(160, 399, 25, 100);
    p.rect(300, 399, 25, 100);
    p.rect(425, 399, 25, 100);
    p.fill(61, 42, 15);
    p.ellipse(172.5, 443, 20, 20);

//tree tops
    p.fill(108, 153, 5);
    p.stroke(31, 112, 55);
    p.ellipse(37.5, 399, 65, 64);
    p.ellipse(172.5, 399, 62, 62);
    p.ellipse(312.5, 399, 72, 73);
    p.ellipse(437.5, 399, 67, 65);

//tree fruits
    p.fill(227, 100, 100);
    p.stroke(227, 100, 100);
    p.ellipse(279.5, 417, 5, 5);
    p.ellipse(298.5, 432, 5, 5);
    p.ellipse(328.5, 432, 5, 5);

    /**
     * Start the Sketch
     */
        if(kstarted){
    for(var i = ppipes.length - 1; i >= 0; i--) {
        ppipes[i].update();
        if (ppipes[i].offscreen()){
            ppipes.splice(i, 1);
        }

        if (started==false && vs == false && ppipes[i].pass(p.pbird)) {
            score++;
        }
        if(started == true && vs == false && ppipes[i].pass(p.pbird)){
          score++;
        }
        if(started == true && vs == true && ppipes[i].pass(p.pbird)){
          score++;
        }

        if (started==false && vs == false && ppipes[i].hits(p.pbird)) {
          playergameover();
        } 
        if (started == true && vs == false && ppipes[i].hits(p.pbird) ) {
          playergameover(); 
      }
      if (vs == true && ppipes[i].hits(p.pbird)){
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
    if (myp5.pbird.bottomTop()) {
    }

    myp5.pbird.update();
    myp5.pbird.show();

  if(pcounter % 75 == 0 ) {
    ppipes.push(new pPipe());
  }
  pcounter++;

      playerScoreSpan.html(score);
      playerMaxScoreSpan.html(maxScore);

      for(let i = 0; i < ppipes.length; i++){
        ppipes[i].show();
      }

    }
  };
  
};

var myp5 = new p5(s, 'playercanvascontainer');

/**
 * Here are some Gameplay functions
 */

function playergameover (){
  myp5.textSize(64);
  myp5.textAlign(myp5.CENTER, myp5.CENTER);
  myp5.text('NO DICE', myp5.width / 2, myp5.height / 2);
  myp5.textAlign(myp5.LEFT, myp5.BASELINE);
  maxScore = myp5.max(score, maxScore);
  playerbutton.disabled = false;
  isOver = true;
  myp5.pbird = new pBird();
  score = 0;
  ppipes = [];
  myp5.noLoop();
}

function playerWON(){
  myp5.textSize(64);
  myp5.textAlign(myp5.CENTER, myp5.CENTER);
  myp5.text('YOU WON!', myp5.width / 2, myp5.height / 2);
  myp5.textAlign(myp5.LEFT, myp5.BASELINE);
}
function playerLOSES(){
  myp5.textSize(64);
  myp5.textAlign(myp5.CENTER, myp5.CENTER);
  myp5.text('NO DICE', myp5.width / 2, myp5.height / 2);
  myp5.textAlign(myp5.LEFT, myp5.BASELINE);
}

function gameover() {
    maxScore = myp5.max(score, maxScore);
    playerbutton.disabled = false;
    ppipes = [];
    isOver = true;
    myp5.pbird = new pBird();
    myp5.noLoop();
    TFscore=0;
  pipes = [];
  my1p5.bird = new Bird();
  TFmaxScore = my1p5.max(TFscore, TFmaxScore);
  nextGeneration();
  my1p5.noLoop();
  }
  function dffgameover() {
    maxScore = myp5.max(score, maxScore);
    playerbutton.disabled = false;
    ppipes = [];
    isOver = true;
    myp5.pbird = new pBird();
    myp5.noLoop();
    TFdffscore=0;
  dffpipes = [];
  my1p5.dffbird = new dffBird();
  TFdffmaxScore = my1p5.max(TFdffscore, TFdffmaxScore);
  nextGenerationDff();
  my1p5.noLoop();
  }

  function reset() {
    isOver = false;
    score = 0;
    ppipes = [];
    pbird = new pBird();
    gameoverFrame = myp5.frameCount - 1;
    myp5.loop();
  }

  function touchStarted() {
    if (isOver) reset();
  }

  function start123(){
    kstarted = true;
    if (isOver) reset();
    myp5.loop();
  }

function keyPressed() {
    if (myp5.key == ' ') {
        myp5.pbird.up();
    }
}
