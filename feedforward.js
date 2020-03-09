/**
 * Sigmoid function Neural Network Code
 * 
 * @author Justin Viola 
 */

 /**
  * Declare Global Variables
  */
const INPUTS = 7;
const HIDDEN = 7;
const OUTPUTS = 2;
const mutation = 0.1;


class NeuralNetwork {
  constructor(nn) {
    if (nn instanceof tf.Sequential) {
      this.model = nn;
    } else {
      this.model = NeuralNetwork.createModel();
    }
  }

  dispose() {
    this.model.dispose();
  }

  /**
 * Synchronous communication using DataSync()
 * returns a typed array of data
 */
  predict(input_array) {
    return tf.tidy(() => {
      let xs = tf.tensor([input_array]);
      let ys = this.model.predict(xs);
      let y_values = ys.dataSync();
      return y_values;
    });
  }




  static createModel() {
    
    const model = tf.sequential();
   let hidden = tf.layers.dense({
      inputShape: [INPUTS],
      units: HIDDEN,
      activation: 'sigmoid'
      
    });
    let output = tf.layers.dense({
      inputShape: [INPUTS],
      units: OUTPUTS,
      activation: 'softmax'
    
    });
    model.add(hidden);
    model.add(output);
    return model;
  
  }

 /**
  * Here the weights are copied 
  */
  copy() {
    return tf.tidy(() => {
      const modelCopy = NeuralNetwork.createModel();
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        w[i] = w[i].clone();
      }
      modelCopy.setWeights(w);
      const nn = new NeuralNetwork(modelCopy);
      return nn;
    });
  }

  /**
 * Mutates weights
 * @param {*} func 
 */
  mutate(func) {
    tf.tidy(() => {
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        let shape = w[i].shape;
        let arr = w[i].dataSync().slice();
        for (let j = 0; j < arr.length; j++) {
          arr[j] = func(arr[j]);
        }
        let newW = tf.tensor(arr, shape);
        w[i] = newW;
      }
      this.model.setWeights(w);
    });
  }
}

/**
 * Mutate function using the randomGaussian function from p5 to add variety to the new population
 * @param {*} j 
 */
function mutateWeight(x) {
  if (my1p5.random(1) < mutation) {
    let offset = my1p5.randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

