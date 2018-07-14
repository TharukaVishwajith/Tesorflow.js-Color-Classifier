let r,g,b;
let database;
let authPromise;
let colorByLable = {
  'blue-ish': [],
  'green-ish': [],
  'red-ish': [],
  'yello-ish': [],
  'gray-ish': [],
  'brown-ish': [],
  'pink-ish': [],
  'purple-ish': [],
  'orange-ish': []
}


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

    for(let key of keys ){
      let record = data[key];
      let col = color(record.r,record.g,record.b);
      colorByLable[record.lable].push(col);
    }
    console.log(colorByLable);

    let blues = colorByLable['blue-ish'];
    let x = 0;
    let y = 0;

    for(let i = 0; i< blues.length; i++){
      noStroke();
      fill(blues[i]);
      // fill(222,44,55)
      rect(x,y,10,10);
      x+=10;
      if(x >= width){
        x = 0;
        y += 10;
      }
    }

  // let uidByCount = {}
  // let users = [];
  // for(let key of keys ){
  //   let record = data[key];
  //   let id = record.uid;
  //   // console.log(record.uid);
  //   if(!uidByCount[id]){
  //     uidByCount[id] = 1;
  //     users.push(id);
  //   }else{
  //     uidByCount[id]++;
  //   }
  // }
  // users = users.sort((a,b)=>{
  //   return uidByCount[a] - uidByCount[b];
  // });

  // for(let id of users){
  //   console.log(` ${uidByCount[id]} -  ${id}`);
  // }
}

function errorData(err){
  console.log(err);
}



function setup() {
  createCanvas(400,400);

  
 
}


function draw() {
 
  // put drawing code here
}