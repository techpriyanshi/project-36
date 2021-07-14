//Create variables here
var dog, happyDog, foodS, foodStock;
var dogImage, happyDogImage;

var addFood;
var foodObject;

var feed, lastFed;

function preload()
{
	//load images here
dogImage = loadImage("images/dogImg.png");
happyDogImage = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObject = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

feed=createButton("Feed The Dog");
feed.position(700,95);
feed.mousePressed(feedDog);
}

function draw() {  
  background(46,139,87);
  feedObject.display();
 
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
lastFed=data.val();
  })

fill(255,255,255)
  
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last Feed: 12 AM",350,30);
}
else{
  text("Last Feed: "+ lastFed+"AM",350,30);
}

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
 }

function feedDog(){
  dog.addImage(happyDogImage);


var food_stock__val = foodObject.getFoodStock();
if(food_stock_val <= 0){
  foodObject.updateFoodStock(food_stock__val * 0);
}
else{
  foodObject.updateFoodStock(food_stock_val -1);
}

database.ref('/').update({
  food:foodObject.getFoodStock(),
  feedTime:hour()
})

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
})
}