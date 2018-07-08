function setup() {
  createCanvas(400,400);
  let r = floor(random(255));
  let g = floor(random(255));
  let b = floor(random(255));
  background(r,g,b);

  let radioButton = createRadio();
  radioButton.option('red-is');
  radioButton.option('blue-is');
  radioButton.option('green-is'); 

  let submit = createButton('Submit');
  submit.mousePressed(sendData);

  function sendData(){
    
  }
 
}


function draw() {
 
  // put drawing code here
}