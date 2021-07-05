var climberImg, climber;
var doorImg, door;
var ghostStandingImg, ghost;
var towerImg, tower;
var spookySound;
var gameState = "Play";
var Play = 1;
var Over = 0
var doorGroup, climberGroup, lineGroup;
var line;



function preload(){
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostStandingImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  ghost = createSprite(200,300);
  ghost.addImage(ghostStandingImg);
  ghost.scale= 0.4;
  doorGroup =new Group();
  climberGroup = new Group();
  lineGroup = new Group();
  //ghost.debug =true;
  ghost.setCollider("rectangle",-20,25,110,250);
  
 spookySound.play();
}

function draw(){
 background("black");
  if(gameState == "Play"){

    if(tower.y>400){  
      tower.y=300;
    }
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
     ghost.velocityY +=1;
    if(keyDown("left")){
      ghost.x -=6;
    }
    
    if(keyDown("right")){
      ghost.x +=6;
    }
   
    
    spawningDoors();
    ghost.collide(climberGroup);
     if(ghost.y>630|| ghost.isTouching(lineGroup)){
      gameState = Over;  
    }
    
    
    drawSprites();   
  }
   
  
  
  
  if(gameState == Over){
    textSize(20);
    fill("yellow");
    text("GAME OVER",250,300)
}

 
  
  
  
  
}


function spawningDoors(){
  if(frameCount %200 == 0){
    door = createSprite(100,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(100,500));
    door.velocityY = 2;
    door.lifetime= 350;
    doorGroup.add(door);
    
    
    climber = createSprite(100,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 350;
    climberGroup.add(climber);
   // climber.debug = true;
    ghost.depth = door.depth + 1; 
    
    line = createSprite(100,25);
    
    line.visible= false;  
   // line.debug = true;
    line.x = climber.x;
    line.velocityY = 2;
    line.lifetime = 350;
    line.width = climber.width;
    line.height = 2;
    lineGroup.add(line);
    
    
    
  }
  
}

