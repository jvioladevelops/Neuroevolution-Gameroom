
/**
 * genetic algorithm for deep feed forward
 */


/**
 * Restart the game during training
 */
function resetGameDff() {
    dffcounter = 0;
    if (dffbestBird) {
      TFdffmaxScore = my1p5.max(TFdffscore, TFdffmaxScore);
      TFdffscore=0;
    }
    dffpipes = [];
  }
  
  /**
   * Load the next generation of birds
   * Normalizing the fitness of birds between 0 and 1
   * and then disposing of all the birds that arent the bestBird
   */
  function nextGenerationDff() {
    resetGameDff();
    normalizeFitnessDff(alldffBirds);
    activedffBirds = generateDff(alldffBirds);
    for (let dffbird of alldffBirds) {
      if (dffbird !== dffbestBird) {
        dffbird.dispose();
      }
    }
    // copy birds to another arrray
    alldffBirds = activedffBirds.slice();
  }
  
 /**
  * Generate old birds function, based on fitness
  * @param {*} olddffBirds 
  */
  function generateDff(olddffBirds) {
    let newdffBirds = [];
    for (let i = 0; i < olddffBirds.length; i++) {
      let dffbird = poolSelectionDff(olddffBirds);
      newdffBirds[i] = dffbird;
    }
    return newdffBirds;
  }
  
  /**
   * Normalize the fitness 
   * exponentially better
   * @param {*} dffbirds 
   */
  function normalizeFitnessDff(dffbirds) {
    for (let i = 0; i < dffbirds.length; i++) {
      dffbirds[i].score = my1p5.pow(dffbirds[i].score, 4);
    }  
    let dffsum = 0;
    for (let i = 0; i < dffbirds.length; i++) {
      dffsum += dffbirds[i].score;
    }
    for (let i = 0; i < dffbirds.length; i++) {
      dffbirds[i].fitness = dffbirds[i].score / dffsum;
    }
  }
  
/**
 * Select one bird from an array with greatest fitness 
 * @param {*} dffbirds 
 */
  function poolSelectionDff(dffbirds) {
    let dffindex = 0;
    let dffrandom = my1p5.random(1);
    while (dffrandom > 0) {
      dffrandom -= dffbirds[dffindex].fitness;
      dffindex += 1;
    }
    dffindex -= 1;
    return dffbirds[dffindex].copyDeepFeedForward();
    
  }
  