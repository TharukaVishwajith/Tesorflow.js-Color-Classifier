let data;
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

}


function draw() {
  // put drawing code here
}