let r,g,b;
let database;

var config = {
  apiKey: "AIzaSyBz0E9GGdLmcyDh9ODadXYTU0UlLer5qks",
  authDomain: "color-classifire.firebaseapp.com",
  databaseURL: "https://color-classifire.firebaseio.com",
  projectId: "color-classifire",
  storageBucket: "",
  messagingSenderId: "216907298724"
};
firebase.initializeApp(config);
database = firebase.database();

function pickColor(){
  r = floor(random(255));
  g = floor(random(255));
  b = floor(random(255));
  background(r,g,b);
}

function setup() {
  createCanvas(400,400);
  pickColor();
  
  let buttons = [];
  buttons.push(createButton('red-ish'));
  buttons.push(createButton('blue-ish'));
  buttons.push(createButton('green-ish'));
  buttons.push(createButton('orange-ish'));
  buttons.push(createButton('yello-ish'));
  buttons.push(createButton('pink-ish'));
  buttons.push(createButton('purple-ish'));
  buttons.push(createButton('brown-ish'));
  buttons.push(createButton('gray-ish'));

  for(let i = 0; i < buttons.length; i++ ){
    buttons[i].mousePressed(sendData)
  }
  

  function sendData(){
    let colorDatabase = database.ref('colors');

    var data = {
      r: r,
      g: g,
      b: b,
      lable: this.html()
    }
    let color = colorDatabase.push(data,finished)
    console.log('Saving data');
    console.log(data);

    function finished(err){
      if(err){
        console.log('Somting is wrong!');
        console.error(err);
      }else{
        console.log('Data saved success!');
        pickColor();
      }
    }
  }

  
 
}


function draw() {
 
  // put drawing code here
}