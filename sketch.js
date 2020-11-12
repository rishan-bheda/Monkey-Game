
var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
 
  
  ground = createSprite(0,350,10000,10);
  

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  

  
}


function draw() {
  
  background(500);
  
  
  
  if (gameState === PLAY){
    
    stroke("white")
    textSize(20);
    fill("white");
    text("Score: "+ score,500, 500);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: "+ survivalTime, 200, 50);
    
    ground.velocityX = 5;
    
    if (ground.x > 600){
      ground.x = ground.width/2;
    }
    
  food();
  obstacles();
 
  if (keyDown("space") && monkey.y === 314.3){
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(ground);
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }

  if(gameState === END){
    FoodGroup.setLifetimeEach (-1);
    obstacleGroup.setLifetimeEach (-1);
    obstacle.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: "+ survivalTime, 200, 50);
  }
  
  drawSprites();
  
  console.log(frameCount)
}

function food(){
  if (frameCount % 80 === 0){
  banana = createSprite(300, 300,100,100)
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX = -2;
  banana.y = Math.round(random(120,200));
  banana.lifetime = 200;
  FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0){
  obstacle = createSprite(400, 320, 10, 40);
  obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
  }
}


