let r,g,b;
let database;
let authPromise;


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
authPromise = firebase.auth().signInAnonymously();
let ref = database.ref('colors');
ref.once('value', gotData, errorData);

function gotData(results) {
  let data = results.val();
  let keys = Object.keys(data);

  let uidByCount = {}
  let users = [];
  for(let key of keys ){
    let record = data[key];
    let id = record.uid;
    // console.log(record.uid);
    if(!uidByCount[id]){
      uidByCount[id] = 1;
      users.push(id);
    }else{
      uidByCount[id]++;
    }
  }
  users = users.sort((a,b)=>{
    return uidByCount[a] - uidByCount[b];
  });

  for(let id of users){
    console.log(` ${uidByCount[id]} -  ${id}`);
  }
  
}

function errorData(err){
  console.log(err);
}

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
  

  async function sendData(){
    let colorDatabase = database.ref('colors');
    let { user } = await authPromise;
    var data = {
      r: r,
      g: g,
      b: b,
      lable: this.html(),
      uid: user.uid
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