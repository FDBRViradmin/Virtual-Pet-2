var dog,dogImage,happyDog;
var database;
var foodS,foodStock;

var addFood, feed
var fedTime, lastFed
var foodObj

function preload(){
   dogImage=loadImage("Dog.png");
   happyDog=loadImage("happydog.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(700,500);

  feed=createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
 
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDog);
  // }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 450, 30);
  } else if(lastFed==0){
    text("Last Feed : "+ lastFed + " AM", 450, 30);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodS=foodS-1 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.red('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}