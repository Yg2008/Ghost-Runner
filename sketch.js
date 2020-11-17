var gameState = "PLAY";
var tower,towerImage;
var ghost,ghostImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisibleBlock,invisibleGroup;
var gameOverImage,gameOverSound,backgroundSound;


function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  backgroundSound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  tower = createSprite(width/2,height/2);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(width/3,height/3);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
}

function draw(){
  background("white");
  
  if(gameState === "PLAY"){
  backgroundSound.play();
    
  if(tower.y>height-200){
    tower.y = height/2
  }
  
 if(keyDown(LEFT_ARROW)){
   ghost.x = ghost.x - 5
 }
  
   if(keyDown(RIGHT_ARROW)){
   ghost.x = ghost.x + 5
 }
  
   if(keyDown("space")){
   ghost.velocityY = -5
 }
  
  ghost.velocityY = ghost.velocityY + 1;
  
  spawnDoors();
  
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleGroup.isTouching(ghost)||ghost.y>height){
      ghost.destroy();
      gameState = "END";
    }
    
  drawSprites();
    
 }
  if(gameState === "END"){
     background("black");
     var gameOver = createSprite(width/2,height/2);
     gameOver.addImage(gameOverImage);
     gameOverSound.play();
    drawSprite(gameOver);
  }
}
function spawnDoors(){
  if(frameCount%200 === 0){
    door = createSprite(width/2,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(width/3,width-100));
    door.velocityY = 2;
    door.lifetime = 800;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    doorGroup.add(door);
    
    climber = createSprite(width/2,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 800;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(width/2,15,climber.width,2);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    invisibleGroup.add(invisibleBlock);
  }
  
}





