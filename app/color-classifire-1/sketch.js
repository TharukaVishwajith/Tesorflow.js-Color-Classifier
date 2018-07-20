let data;
let model;
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
  console.log(data);
  let colors = [];
  let lables = [];

  for (let color of data.entries) {
    let col = [color.r / 255, color.g / 255, color.b / 255]
    colors.push(col);
    lables.push(lableList.indexOf(color.lable))
  }

  let lablesTensor = tf.tensor1d(lables, 'int32');
  let ys = tf.oneHot(lablesTensor, 9);
  lablesTensor.dispose();

  let xs = tf.tensor2d(colors);

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

// option for fit function call 
const options = {
  epochs: 20,
  validationSplit: 0.1,
  shuffle: true
}
model.fit(xs, ys, options).then( result => {
  console.log(result.history.loss);
});
}


function draw() {
  // put drawing code here
}