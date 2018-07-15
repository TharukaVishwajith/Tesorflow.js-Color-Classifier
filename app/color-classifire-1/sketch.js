let data;

function preload(){
  data = loadJSON('colorData.json')
}

function setup() {
  console.log(data);
  let colors = [];

  for(let color of data.entries){
    let col = [color.r/255, color.g/255, color.b/255]
    colors.push(col);
  }

  let xs = tf.tensor2d(colors);
  console.log(xs.shape)


}


function draw() {
 
  // put drawing code here
}