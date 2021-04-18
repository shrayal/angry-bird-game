var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja, ninja_running, ninja_collided;
var ground, invisibleGround, groundImage;
var bg1
var bc,bcI,bcGroup
var bricksGroup, brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


var level=0
function preload(){
ninja_running = loadAnimation("Run0.png","Run1.png","Run2.png","Run3.png","Run4.png","Run5.png");
  ninja_collided=loadAnimation("Dead.png");
  
  groundImage = loadImage("path.jpg");
  
  brickImage = loadImage("coin-removebg-preview.png");
  
  obstacleimage = loadImage("fire-removebg-preview.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  bombImg = loadImage("bomb.png")
  bg1=loadImage("ninja b.jpg")
}

function setup() {
  createCanvas(600, 400);
  
  ninja = createSprite(50,275,20,50)
  
ninja.addAnimation("running",ninja_running);
  ninja.addAnimation("collided",ninja_collided);


  ninja.scale = 0.2;
ninja.setCollider("rectangle",0,0,40,100);
  
  ground = createSprite(200,330,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=0.15 
 // ground.x = ground.width /2;
  ground.velocityX = -4;
 // ground.debug=true
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,280,400,10);
  invisibleGround.visible = false;
  bcGroup=new Group()
  bricksGroup = new Group();
  obstaclesGroup = new Group();
  fill(0);
textSize(24);
textFont('Georgia');
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("skyblue");
  text("Score: "+ score, 480,30);
  if(level===0){
    background(bg1)
       textSize(30)
      fill("red")
      text("NINJA RUNNER",180,30)
       textSize(20)
      fill("blue")
    
      text("GAME STARTS",200,80)
       textSize(30)
      fill("red")
      text("RULES",250,130)
     textSize(20)
      fill("black")
      text ("PRESS 'S' TO START",180,150);
      text("PRESS 'SPACE'TO JUMP",180,175)
text("TOUCHING COIN WILL INCREASE A POINT",170,200)
    text("TOUCHING BOMB WILL DECREASE A POINT",170,225)
    text("TOUCHING FIRE WILL END THE GAME",170,250)
      if(keyDown("S")){
        level=1
      }
  }
     if(level===1){
  if (gameState===PLAY){
    
   
  
 if(keyDown("space") && ninja.y >= 250) {
      ninja.velocityY = -12;
      jumpSound.play();
    }
  if(score>0 && score%10 === 0){
       checkPointSound.play() 
    }
    ninja.velocityY = ninja.velocityY + 0.5
    
    if (ground.x < 0){
      ground.x = 600;
    }

    for (var i = 0; i < bricksGroup.length; i++) {
    
      if(bricksGroup.get(i).isTouching(ninja)){
      bricksGroup.get(i).remove()
      score =score+1;
    }
      
    }
     for (var i = 0; i < bcGroup.length; i++) {
    
      if(bcGroup.get(i).isTouching(ninja)){
      bcGroup.get(i).remove()
      score =score-1;
    }
      
    }
    ninja.collide(invisibleGround);
    spawnbricks();
    spawnObstacles();
    spawnblackCoin()
  
    if(obstaclesGroup.isTouching(ninja)){
        gameState = END;
      jumpSound.play();
    }
     
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    ninja.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
    bcGroup.setVelocityXEach(0)
    
    //change the trex animation
ninja.changeAnimation("collided",ninja_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}
  }
function spawnbricks() {
  //write code here to spawn the brick
  if (frameCount % 60 === 0) {
    var brick = createSprite(600,120,40,10);
    //brick.debug=true
    brick.y = Math.round(random(150,180));
    brick.addImage(brickImage);
    brick.scale = 0.15;
    brick.velocityX = -3;
    
     //assign lifetime to the variable
    brick.lifetime = 200;
    
    //adjust the depth
    brick.depth = ninja.depth;
    ninja .depth = ninja.depth + 1;
    
    //add each brick to the group
    bricksGroup.add(brick);
  }
  
}
function spawnblackCoin() {
  //write code here to spawn the brick
  if (frameCount % 200 === 0) {
    var bc = createSprite(600,120,40,10);
    bc.addImage("js",bombImg)
    bc.scale=0.1
    //bc.debug=true
    bc.y = Math.round(random(100,180));
    //bc.addImage(brickImage);
    //bc.scale = 0.15;
    bc.velocityX = -3;
    
     //assign lifetime to the variable
    bc.lifetime = 200;
    
    //adjust the depth
    bc.depth = ninja.depth;
    ninja .depth = ninja.depth + 1;
    
    //add each brick to the group
    bcGroup.add(bc);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,270,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6);
    
    //generate random obstacles
 obstacle.addImage("obstacles",obstacleimage)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  
 ninja.addAnimation("running",ninja_running)
  
  
  score = 0;
  
}

