/**
 * Genetic Agorithm for feed forward
 */

/**
 * restart the game
 */
function resetGame() {
  counter = 0;
  if (bestBird) {
    TFmaxScore = my1p5.max(TFscore, TFmaxScore);
    TFscore=0;
  }
  pipes = [];
}

 /**
   * Load the next generation of agents 
   * Normalizing the fitness of agents between 0 and 1
   * and then disposing of all the agents that arent the bestBird
   */

function nextGeneration() {
  resetGame();
  normalizeFitness(allBirds);
  activeBirds = generate(allBirds);
  for (let bird of allBirds) {
    if (bird !== bestBird) {
      bird.dispose();
    }
  }
  // copy agents to another array
  allBirds = activeBirds.slice();
}

/**
 * generate birds based on fitness
 * @param {*} oldBirds 
 */
function generate(oldBirds) {
  let newBirds = [];
  for (let i = 0; i < oldBirds.length; i++) {
    let bird = poolSelection(oldBirds);
    newBirds[i] = bird;
  }
  return newBirds;
}

/**
 * normalize fitness
 * exponentially better 
 * @param {*} birds 
 */
function normalizeFitness(birds) {
  for (let i = 0; i < birds.length; i++) {
    birds[i].score = my1p5.pow(birds[i].score, 4);
  }
  let sum = 0;
  for (let i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
  }
}
/**
 * select one bird from the array with greatest fitness
 * @param {*} birds 
 */
function poolSelection(birds) {
  let index = 0;
  let r = my1p5.random(1);
  while (r > 0) {
    r -= birds[index].fitness;
    index += 1;
  }
  index -= 1;
  return birds[index].copy();
}
