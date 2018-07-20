let data;
let model;
let xs,ys;
let lossP;
let lableList = [
  'blue-ish',
  'green-ish',
  'red-ish',
  'yello-ish',
  'gray-ish',
  'brown-ish',
  'pink-ish',
  'purple-ish',
  'orange-ish'
]

function preload() {
  data = loadJSON('colorData.json')
}

function setup() {
  lossP = createP('loss');
  console.log(data);
  let colors = [];
  let lables = [];

  for (let color of data.entries) {
    let col = [color.r / 255, color.g / 255, color.b / 255]
    colors.push(col);
    lables.push(lableList.indexOf(color.lable))
  }

  let lablesTensor = tf.tensor1d(lables, 'int32');
  ys = tf.oneHot(lablesTensor, 9);
  lablesTensor.dispose();

  xs = tf.tensor2d(colors);

  console.log(xs.shape);
  console.log(ys.shape);
  xs.print();
  ys.print();

  model = tf.sequential();

  let hidden = tf.layers.dense({
    units: 16,
    activation: 'sigmoid',
    inputDim: 3
  });

  let output = tf.layers.dense({
    units: 9,
    activation: 'softmax'
  });

  model.add(hidden);
  model.add(output);

  // Optimizer 
  const lr = 0.5;
  const optimizer = tf.train.sgd(lr);


  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

  //tf.nextFrame();
  train().then( result => {
    console.log(result.history.loss)
  });

  createCanvas(400,400);

}


async function train() {
  // option for fit function call 
  const options = {
    epochs: 1000,
    validationSplit: 0.1,
    shuffle: true,
    callbacks: {
      onTrainBegin: ()=> console.log('training started!'),
      onTrainEnd: () => console.log('training ended!'),
      onBatchEnd: async (num, logs) => {
        await tf.nextFrame();
      },
      onEpochEnd: (num, logs) => {
        lossP.html(`Loss : ${logs.loss}`);
      }
    }
  }
 return model.fit(xs, ys, options);
}


function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  line(frameCount % width, 0, frameCount % width, height);


}