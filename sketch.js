/**
 * Bringing pipe, bird, and genetic algorithm into one place and adding 
 * game functionality
 */

 //population, gameplay, and agent population size
let totalPopulation = 200;
let totaldffPopulation = 200;
let activeBirds = [];
let activedffBirds = [];
let allBirds = [];
let alldffBirds = [];
let pipes = [];
let dffpipes = [];
let counter = 0;
let dffcounter = 0;
let TFsafe = true;
let TFdffsafe = true; 
let TFscore = 0;
let TFdffscore = 0;
let TFmaxScore = 0;
let TFdffmaxScore = 0;
let TFgameoverFrame = 0;
let TFdffgameoverFrame = 0;
let TFisOver = false; 
let TFdffisOver = false; 
let TFtouched = false;
let TFdfftouched = false; 
let TFprevTouched = TFtouched;
let TFdffpreTouched = TFdfftouched;
let started = false;
let dffstarted = false;
let vs = false;
let feedforward = false;
let dfeedforward = false;

//html elements 
var img;
var img2;
let speedSlider;
let speedSpan;
let highScoreSpan;
let dffhighScoreSpan;
let allTimeHighScoreSpan;
let dffallTimeHighScoreSpan;
let generationCountSpan;
let dffgenerationCountSpan;

//scoring elements
let TFscoreSpan; 
let TFdffscoreSpan;
let TFmaxScoreSpan;
let TFdffmaxScoreSpan;
let highScore = 0;
let dffhighScore = 0;
let generationCount = 0;
let dffgenerationCount = 0;

//gameplay variables
let runBestButton;
let dffrunBestButton;
let runBest = false;
let dffrunBest = false;
let runActiveButton;
let dffrunActiveButton;
let saveButton;
let dffsaveButton;

    var startbutton = document.getElementById("startraining");
    startbutton.disabled = false;
    var startdffbutton = document.getElementById("startrainingdff");
    startdffbutton.disalbed = false;
    var stopbutton = document.getElementById("stoptraining");
    stopbutton.disabled = true;
    var versebutton = document.getElementById("best");
    versebutton.disabled = true;
    var restartbutton = document.getElementById("restartgame");
    restartbutton.disabled = true;
    
    startbutton.addEventListener('click', function(event) {
    startdffbutton.disabled = true;
    startbutton.disabled = true;
    stopbutton.disabled = false;
    versebutton.disabled = true;
    restartbutton.disabled = true;
    playerbutton.disabled = true;
    });

    startdffbutton.addEventListener('click', function(event) {
    startdffbutton.disabled = true;
    startbutton.disabled = true;
    stopbutton.disabled = false;
    versebutton.disabled = true;
    restartbutton.disabled = true;
    playerbutton.disabled = true;
    });

    versebutton.addEventListener('click', function(event){
      startbutton.disabled = false;
      stopbutton.disabled = true;
      versebutton.disabled = true;
      restartbutton.disabled = false;
    });
    
    restartbutton.addEventListener('click', function(event) {
      restartbutton.disabled = true;
      });

      /**
       * important function for unleashing the population
       */
function startfeedforward() {
  feedforward = true;
  dfeedforward = false;
  bird = new Bird();
for (let i = 0; i < totalPopulation; i++) {
  let bird = new Bird();
  activeBirds[i] = bird;
  allBirds[i] = bird;
  }
}
/**
 *  the population for the deep feed forward
 */
function startdff() {
  feedforward = false;
  dfeedforward = true;
  dffbird = new dffBird();
  for (let i = 0; i < totaldffPopulation; i++) {
    let dffbird = new dffBird();
    activedffBirds[i] = dffbird;
    alldffBirds[i] = dffbird;
  }
}
/**
 * setting the entire game equal to a variable
 * @param {*} p 
 */
var t = function (p) {
  p.setup = function() {
    p.createCanvas(600, 500);
    //load images
     img = p.createImg("feedforward.png");
     img.hide();
     img2 = p.createImg("deepfeedforward.png");
     img2.hide();
    my1p5.noLoop(); //this noLoop function is from p5
    tf.setBackend('cpu');

    // All the HTML elements
  speedSlider = my1p5.select('#speedSlider');
  speedSpan = my1p5.select('#speed');
  TFscoreSpan = my1p5.select('#TFscore');
  TFdffscoreSpan = my1p5.select('#TFscore');
  highScoreSpan = my1p5.select('#tempHighScore');
  dffhighScoreSpan = my1p5.select('#tempHighScore');
  allTimeHighScoreSpan = my1p5.select('#highScore');
  dffallTimeHighScoreSpan = my1p5.select('#highScore');
  generationCountSpan = my1p5.select('#gc');
  dffgenerationCountSpan = my1p5.select('#gc');
  runBestButton = my1p5.select('#best');
  dffrunBestButton = my1p5.select('#best');
  runBestButton.mousePressed(toggleState);
  dffrunBestButton.mousePressed(toggleState2);

}

/**
 * toggle state between the best agent and the population
 * when pressed the player game starts as well
 */
function toggleState() {
  if (feedforward == true){
  runBest = !runBest;
  if (runBest) {
    vs = true;
    resetGame();
    my1p5.loop();
    kstarted = true; 
    myp5.loop();
  } 
}
}
/**
 * toggle state set for deep feed forward
 */
  function toggleState2() {
  if (dfeedforward == true) {
    dffrunBest = !dffrunBest;
    if (dffrunBest) {
      vs = true;
      resetGameDff();
      my1p5.loop();
      kstarted = true; 
      myp5.loop();
    }
  }
}

/**
 * p5 drawing of the game
 */
  p.draw = function() {
      p.background(153, 200, 247);
      p.fill(0, 0, 0);
      p.textSize(28);
      p.text('ANN', 525, 30);

      /**
       * load the image
       */
if(started == true){
    p.image(img, 400, 275, 215, 200);
}else{ 
  img.hide();}

if(dffstarted == true){
  p.image(img2, 400, 225, 215, 250);
}else{ 
  img.hide();}
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

    //blades of grass
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
      
//tree trunks
p.fill (92, 67, 57);
p.stroke(28, 17, 12);
p.rect(25, 399, 25, 100);
p.rect(160, 399, 25, 100);
p.rect(300, 399, 25, 100);
p.fill(61, 42, 15);
p.ellipse(172.5, 443, 20, 20);


//tree tops
p.fill(108, 153, 5);
p.stroke(31, 112, 55);
p.ellipse(37.5, 399, 65, 64);
p.ellipse(172.5, 399, 62, 62);
p.ellipse(312.5, 399, 72, 73);

//tree fruits
p.fill(227, 100, 100);
p.stroke(227, 100, 100);
p.ellipse(279.5, 417, 5, 5);
p.ellipse(298.5, 432, 5, 5);
p.ellipse(328.5, 432, 5, 5);

//run this code if the html button for dfeedforward was clicked
if (dfeedforward == true) {
   if (dffstarted) {
    // Create a population
    let dffcycles = speedSlider.value();
    speedSpan.html(dffcycles);
  for (let n = 0; n < dffcycles; n++) {
    for (let i = dffpipes.length - 1; i >= 0; i--) {
      dffpipes[i].update();
      if (dffpipes[i].offscreen()) {
        dffpipes.splice(i, 1);
      }
      if (dffpipes[i].pass(dffbird)) {
        TFdffscore++;
    }
  }
    if (dffrunBest) {
      dffbestBird.think(dffpipes);
      dffbestBird.update();
      
      for (let j = 0; j < dffpipes.length; j++) {
        if (dffpipes[j].hits(dffbestBird)) {
          playerWON();
          aiLOSES();
          dffgameover();
          enddffGame();
          break;
        }
      }
      if (dffbestBird.bottomTop()) {
       playerWON();
       aiLOSES();
       dffgameover();
       enddffGame();
      }
      //running the full population
    } else {
      for (let i = activedffBirds.length - 1; i >= 0; i--) {
        let dffbird = activedffBirds[i];
        dffbird.think(dffpipes);
        dffbird.update();

        for (let j = 0; j < dffpipes.length; j++) {
          if (dffpipes[j].hits(activedffBirds[i])) {
            activedffBirds.splice(i, 1);
            break;
          }
        }
        if (dffbird.bottomTop()) {
          activedffBirds.splice(i, 1);
        }
      }
    }

    //adding a new pipe
    if (dffcounter % 75 == 0) {
      dffpipes.push(new dffPipe());
    }
    dffcounter++;
  }

  //fitness is based on how long the agent stays alive before hitting the bottomTop or a pipe
  let dfftempHighScore = 0;
  if (dffrunActive = true) {
    let dfftempBestBird = null;
    for (let i = 0; i < activedffBirds.length; i++) {
      let s = activedffBirds[i].score;
      if (s > dfftempHighScore) {
        dfftempHighScore = s;
        dfftempBestBird = activedffBirds[i];
      }
    }

    if (dfftempHighScore > dffhighScore) {
      dffhighScore = dfftempHighScore;
      dffbestBird = dfftempBestBird;
    }
  }
   else {
    dfftempHighScore = dffbestBird.score;
    if (dfftempHighScore > dffhighScore) {
      dffhighScore = dfftempHighScore;
    }
  }

  //Update dom elements 
  dffgenerationCountSpan.html(dffgenerationCount);
  TFdffscoreSpan.html(TFdffscore);

  //and draw the pipes and birds
  for (let i = 0; i < dffpipes.length; i++) {
    dffpipes[i].show();
  }

  if (dffrunBest) {
    dffbestBird.show();

  } else {
    for (let i = 0; i < activedffBirds.length; i++) {
      activedffBirds[i].show();
    }
    if (activedffBirds.length == 0) {
      nextGenerationDff();
      dffgenerationCount++;
      }
    }
  }
}

if (feedforward == true) {

   if (started) {

    let cycles = speedSlider.value();
    speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
      if (pipes[i].pass(bird)) {
        TFscore++;
    }
  }

    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      for (let j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(bestBird)) {
          playerWON();
          aiLOSES();
          gameover();
          endGame();
          break;
        }
      }
      if (bestBird.bottomTop()) {
       playerWON();
       aiLOSES();
       gameover();
       endGame();
      }
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        bird.think(pipes);
        bird.update();
        for (let j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(activeBirds[i])) {
            activeBirds.splice(i, 1);
            break;
          }
        }
        if (bird.bottomTop()) {
          activeBirds.splice(i, 1);
        }
      }
    }
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  let tempHighScore = 0;
  if (runActive = true) {
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  }
   else {
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  generationCountSpan.html(generationCount);
  TFscoreSpan.html(TFscore);

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

 

 

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }

    if (activeBirds.length == 0) {
      nextGeneration();
      generationCount++;
      }
    }

      }
    }
  };
};

var my1p5 = new p5(t, 'canvascontainer');

function resetBird() {
  if (bestBird) {
    counter = 0;
    TFmaxScore = my1p5.max(TFscore, TFmaxScore);
    TFscore=0;
    pipes = [];
    gameoverFrame = my1p5.frameCount - 1;
    my1p5.loop();
  }
}


function touchStarted() {
  if (TFisOver){
 resetGame();
  } 
}

function aiWON() {
  my1p5.textSize(64);
  my1p5.textAlign(my1p5.CENTER, my1p5.CENTER);
  my1p5.text('Ai WON', my1p5.width / 2, my1p5.height / 2);
  my1p5.textAlign(my1p5.LEFT, my1p5.BASELINE);
}

function aiLOSES(){
  my1p5.textSize(64);
  my1p5.textAlign(my1p5.CENTER, my1p5.CENTER);
  my1p5.text('YOU WIN!', my1p5.width / 2, my1p5.height / 2);
  my1p5.textAlign(my1p5.LEFT, my1p5.BASELINE);
}
function endGame() {
  maxScore = myp5.max(score, maxScore);
  restartbutton.disabled = false;
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

function enddffGame() {
  maxScore = myp5.max(score, maxScore);
  restartbutton.disabled = false;
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



function keyPressed() {
  if (my1p5.key == ' ') {
      if (TFisOver) resetGame();
  }
}


function stopBestBird() {
  vs = false;
  if (runBest) {
    runBest = !runBest;
    endGame();
  }
}


function startTraining(){
  vs = false;
  if (runBest) {
    runBest = !runBest;
  }
  startfeedforward();
  speedSlider.value() == 1;
  vs = false;
  started = true;
  feedforward = true; 
  dfeedforward = false;
  dffstarted = false; 
  my1p5.loop();
}

function startTrainingDff(){
  vs = false;
  if (dffrunBest) {
    dffrunBest = !dffrunBest;
  }
  startdff();
  speedSlider.value() == 1;
  vs = false;
  feedforward = false; 
  dfeedforward = true; 
  dffstarted = true; 
  started = false; 
  my1p5.loop();
}

function stopTraining() { 
  if (feedforward == true && !runBest) {
  TFscore=0;
  pipes = [];
  document.getElementById("speedSlider").value = 1;
  my1p5.bird = new Bird();
  TFmaxScore = my1p5.max(TFscore, TFmaxScore);
  startdffbutton.disabled = false;
  startbutton.disabled = false;
  playerbutton.disabled = false;
  stopbutton.disabled = true;
  versebutton.disabled = false;
  nextGeneration();
  my1p5.noLoop();
  } 
  if (dfeedforward == true && !dffrunBest) {
    TFdffscore=0;
    dffpipes = [];
    document.getElementById("speedSlider").value = 1;
    my1p5.dffbird = new dffBird();
    TFdffmaxScore = my1p5.max(TFdffscore, TFdffmaxScore);
    startdffbutton.disabled = false;
    playerbutton.disabled = false;
    startbutton.disabled = false;
    stopbutton.disabled = true;
    versebutton.disabled = false;
    nextGenerationDff();
    my1p5.noLoop();
  }
}

function restartGame () {
 resetBird();
 reset();
 }



