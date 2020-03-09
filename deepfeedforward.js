/**
 * ReLU function Neural Network Code
 * 
 * @author Justin Viola 
 */

 /**
  * Declare Global Variables
  */

  const dffINPUTS = 7;
  const dffHIDDEN1 = 9;
  const dffHIDDEN2 = 7;
  const dffHIDDEN3 = 4;
  const dffOUTPUTS = 2;
  const dffMUTATION = 0.1;

class DeepFeedForwardNeuralNetwork {
    constructor(deepfeedforward) {
        if (deepfeedforward instanceof tf.Sequential) {
            this.model = deepfeedforward;
        } else {
            this.model = DeepFeedForwardNeuralNetwork.createDeepFeedForwardModel();
        }
    }

dispose() {
    this.model.dispose();
}

/**
 * Synchronous communication using DataSync()
 * returns a typed array of data
 */

 predict(inputArray) {
     return tf.tidy(() => {
         let xs = tf.tensor([inputArray]);
         let ys = this.model.predict(xs);
         let y_values = ys.dataSync();
         return y_values;
     });
 }

 static createDeepFeedForwardModel() {
     const model = tf.sequential();
     const hidden1 = tf.layers.dense({inputShape: [dffINPUTS], units: dffHIDDEN1, activation: 'relu'});
     const hidden2 = tf.layers.dense({units: dffHIDDEN2, activation: 'relu'});
     const hidden3 = tf.layers.dense({units: dffHIDDEN3, activation: 'relu'});
     const output = tf.layers.dense({units: dffOUTPUTS, activation: 'softmax'});
     model.add(hidden1);
     model.add(hidden2);
     model.add(hidden3);
     model.add(output);
     return model;

 }

 copyDeepFeedForward() {
     return tf.tidy(() => {
         const modelCopy = DeepFeedForwardNeuralNetwork.createDeepFeedForwardModel();
         const weight = this.model.getWeights();
         for (let i = 0; i < weight.length; i++) {
             weight[i] = weight[i].clone();
         }
         modelCopy.setWeights(weight);
         const deepfeedforward = new DeepFeedForwardNeuralNetwork(modelCopy);
         return deepfeedforward;
     });
 }
/**
 * Mutates weights
 * @param {*} func 
 */
 mutateDff(func) {
     tf.tidy(() => {
         const weight = this.model.getWeights();
         for (let i = 0; i < weight.length; i++) {
             let shape = weight[i].shape;
             let arr = weight[i].dataSync().slice();
             for (let j = 0; j < arr.length; j++) {
                 arr[j] = func(arr[j]);
             }
             let newWeight = tf.tensor(arr, shape);
             weight[i] = newWeight;
         }
         this.model.setWeights(weight);
     });
 }
}
/**
 * Mutate function using the randomGaussian function from p5 to add variety to the new population
 * @param {*} j 
 */
function mutateDffWeight(j) {
    if (my1p5.random(1) < dffMUTATION) {
        let offset = my1p5.randomGaussian();
        let newj = j + offset;
        return newj;
    } else {
        return j;
    }
}