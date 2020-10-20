var bananaImage, banana, obstacle, obstacleImage, backgroundImg, monkeyImage, monkey, ground, bg, foodGroup, obstacleGroup;
var score = 0;


function preload(){
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("banana.png");
backgroundImg = loadImage("jungle.jpg");
obstacleImage = loadImage("stone.png");
  
}

function setup() {
  
  createCanvas(600, 350);
  monkey = createSprite(70,100,10,10);
  monkey.addAnimation("monkeyImage", monkeyImage);
  monkey.scale = 0.08;
  
  ground=createSprite(400,360,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  bg=createSprite(0,0,800,400);
  bg.addImage(backgroundImg);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  foodGroup= createGroup();
  obstaclesGroup= createGroup();
  
}

function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  
  if(ground.x===0) {
    ground.x=ground.width/2;
  }
  
  if(bg.x<100){
    bg.x=bg.width/2;
  }
  
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score = score + 2;
      switch(score)
     {
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
     }
    }
  
    if(keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
        score=score-2;
    }
  
  drawSprites();
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);  
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
  
