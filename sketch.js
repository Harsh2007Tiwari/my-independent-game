//Declaration of variables
var bg,bg_img;
var boy,boy_anim,boy_left_anim;
var wood,wood_img;
var coin,coin_img;
var woodspike,woodspike1,woodspike2;
var score,chance;
var ghost,ghost1,ghost_img;
var ghostGroup,ghostGroup1;
var restart,restart_img;
var gameover,gameover_img;
var boy_jump_anim;
var boy_collided;

//Groups
var woodGroup,coinGroup;
var woodspikeGroup1,woodspikeGroup2,woodspikeGroup3;

//GameStates
var PLAY=2;
var START=1;
var END=0;
var gameState=START;


function preload()
{
  //Load Image of background
  bg_img=loadImage("bg.jpg")
  
  //To load boy running annimation
  boy_anim=loadAnimation("redhood1.png","redhood2.png","redhood3.png", "redhood4.png","redhood5.png","redhood6.png");
  
  //To load boy left side running animation
  boy_left_anim=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png");
  
  //To load images of wood,coin,ghost
  wood_img=loadImage("wood.png");
  
  coin_img=loadImage("coin.png");
  
  ghost_img=loadImage("ghost.png");
  
  //To load images gameover,restart
  gameover_img=loadImage("gameover.png");
  
  restart_img=loadImage("restart.png");
  
  //Boy jump and collided animation
  boy_jump_anim=loadImage("redhood_jump.png","redhood_jump-1");
  
  boy_collided=loadImage("redhood_collided.png");
}

function setup() 
{
  //To create the canvas
  createCanvas(600,600);
  
  //To create background sprite
  bg=createSprite(300,400);
  //Adding image to boy
  bg.addImage(bg_img);
  //To assign velocity to boy
  bg.velocityY=(2);
  
  //To create boy sprite
  boy=createSprite(300,450,10,10);
  
  //To load all animation of boy
  boy.addAnimation("run",boy_anim);
  boy.addAnimation("leftrun",boy_left_anim);
  boy.addAnimation("jump",boy_jump_anim);
  boy.addAnimation("collided",boy_collided);
  boy.scale=0.7;
  
  //Assigning initial value of score and chance
  score=0;
  chance=3;
  
  //Declaring all groups
  woodGroup=new Group();
  coinGroup=new Group();
  woodspikeGroup1=new Group();
  woodspikeGroup2=new Group();
  woodspikeGroup3=new Group();
  ghostGroup=new Group();
  ghostGroup1=new Group();
  
  //To create gameover sprite
  gameover=createSprite(300,270,10,10);
  gameover.addImage(gameover_img);
  //Scaling to adjust the image size
  gameover.scale=1.8;

  //To create restart sprite
  restart=createSprite(300,350,10,10);
  //Adding image to restart
  restart.addImage(restart_img);
  restart.scale=0.4;
}

function draw() 
{
  //To assign background
  background("white");
  //Start state
  if(gameState===START)
  {
    //Bakcground of start state
    background("black");
    
    //Assigning visibility false to all sprites
    gameover.visible=false;
    bg.visible=false;
    boy.visible=false;
    restart.visible=false;
    woodGroup.visible=false;
    ghostGroup.visible=false;
    
    //To declare instructions
    textSize(20);
    fill("white");
    text("Read all the instructions before playing the game",80,100);
    text("1.Press Space Key to make jump",50,140);
    text("2.Collect coins to score the points",50,170);
    text("3.Don't touch with wood lower,right and left upper",50,200);
    text("otherwise it will kill the boy and game will over",50,225);
    text("4.Jump on the wood to rest for sometime",50,255);
    text("5.Save the boy from ghost",50,285);
    text("6.Don't let boy fall down otherswise game will get over",50,315);
    text("7.Use left and right Arrow key to move the boy left and right",50,345);
    text("8.With more score game will be more challenging",50,375);
    text("9.Try to score more and more as you can and share it",50,405);
    text("10.Protect your boy from getting killed by ghost",50,435);
    textSize(40);
    text("ALL THE BEST!!",160,500);
    
    textSize(28);
    text("Press Space Key to Start the Game",100,550);
    
    //To start the game when space key is presses
    if(keyDown("space"))
    {
      gameState=PLAY; 
    }
  }
  //Game State play
  else if(gameState===PLAY)
  {
    //Assigning visibility true to all spites
    bg.visible=true;
    boy.visible=true;
    gameover.visible=false;
    restart.visible=false;
    
    //To provide infinite scrolling effect to background
    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
  
    //To make the boy jump when space key is pressed
    if(keyDown("space"))
    {
      //Changning boy animation to jump when space is pressed
      boy.velocityY=-4.5;  
      boy.changeAnimation("jump");
    }
  
    //To add gravity to boy
    boy.velocityY=boy.velocityY+0.8;
  
    //To make boy go right if space key is pressed
    if(keyDown(RIGHT_ARROW))
    {
      boy.changeAnimation("run"); 
      boy.velocityX=3;
    }
  
    //To make boy go left if left key is pressed
    if(keyDown(LEFT_ARROW))
    {
      boy.changeAnimation("leftrun");
      boy.velocityX=-3;
    }
  
    //To make boy collide with woodGroup
    boy.collide(woodGroup);
 
    //To boy y velocity 0 when collides with woodGroup
    if(boy.isTouching(woodGroup))
    {
      boy.velocityY=0; 
    }
  
    //To increase the score when boy collects coins
    if(boy.isTouching(coinGroup))
    {
      score=score+10;
      coinGroup.destroyEach();
    }
  
    //To decrease boy life when get hit by ghost
    if(boy.isTouching(ghostGroup))
    {
      chance=chance-1; 
      ghostGroup.destroyEach();
      boy.changeAnimation("collided");
    }
    
    //To decrease boy life when get hit by ghost
    if(boy.isTouching(ghostGroup1))
    {
      chance=chance-1; 
      ghostGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
    //Calling other functions in draw function
    spawnWood();
    spawnGhost();
    
    //To end the game if boy fall down out of the canvas
    if(boy.y>600)
    {
      gameState=END;
    }
    
    //To make boy life decrease when touched by inv wood spikes 3
    if(boy.isTouching(woodspikeGroup3))
    {
      chance=chance-1;
      woodspikeGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
    //To make boy life decrease when touched by inv wood spikes 1
    if(boy.isTouching(woodspikeGroup1))
    {
      chance=chance-1;
      woodspikeGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
    //To make boy life decrease when touched by inv wood spikes 2
    if(boy.isTouching(woodspikeGroup2))
    {
      chance=chance-1;
      woodspikeGroup2.destroyEach();
      boy.changeAnimation("collided");
    }
    
    //To end the game if boy chance=0
    if(chance===0)
    {
      gameState=END;
    }
  }
  //End state
  else if(gameState===END)
  {
    //To stop everything and make sprites visible false
    boy.velocityX=0;
    boy.velocityY=0;
    gameover.visible=true;
    restart.visible=true;
    boy.visible=false;
    

    //To provide infinite scrolling effect to bg
    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
    
    //To reset when clicked on restart button
    if(mousePressedOver(restart))
    {
      reset();
    }
  }
    //To draw the sprites
    drawSprites();
  
    
  //Displaying scores and chances
  fill("white");
  textSize(20);
  text("Score: "+score,50,50);
  text("Chances: "+chance,450,50);
  
}

function spawnWood()
{
  //To make wood appear at every 125 frame count
  if(frameCount%125===0)
  {
    //To create sprite
    wood=createSprite(Math.round(random(80,520)),0,10,10);
    //To add image
    wood.addImage(wood_img);
    //Scaling to adjust the image
    wood.scale=0.080;
    //To assign velocity to sprite
    wood.velocityY=(4.5+score/50);
    //To add respective sprite to respective groups
    woodGroup.add(wood);
    //Debugging
    wood.debug=false;
    //To set collider
    wood.setCollider("rectangle",0,0,2500,300);
    //To assign lifetime to sprite to avoid memory leaks
    wood.lifetime=width/wood.velocityY;
    
    //To create sprite
    coin=createSprite(wood.x,-40,10,10);
    //To add image
    coin.addImage(coin_img);
    //To assign velocity to sprite
    coin.velocityY=(4.5+score/50);
    //Scaling to adjust the image
    coin.scale=0.020;
    //To add respective sprite to respective groups
    coinGroup.add(coin);
    //Debugging
    coin.debug=false;
    //To assign lifetime to sprite to avoid memory leaks
    coin.lifetime=width/coin.velocityY;
    
    //To create sprite
    woodspike=createSprite(wood.x,28,150,3);
    //To assign velocity to sprite
    woodspike.velocityY=wood.velocityY;
    //To make woodspike visibility false
    woodspike.visible=false;
    //Debugging
    woodspike.debug=true;
    //To add respective sprite to respective groups
    woodspikeGroup1.add(woodspike);
    //To assign lifetime to sprite to avoid memory leaks
    woodspike.lifetime=width/woodspike.velocityY;
    
    //To create sprite
    woodspike1=createSprite(wood.x-105,-5,5,10);
    //To assign velocity to sprite
    woodspike1.velocityY=wood.velocityY;
    //To make woodspike visibility false
    woodspike1.visible=false;
    //Debugging
    woodspike1.debug=true;
    //To add respective sprite to respective groups
    woodspikeGroup2.add(woodspike1);
    //To assign lifetime to sprite to avoid memory leaks
    woodspike1.lifetime=width/woodspike1.velocityY
    
    //To create sprite
    woodspike2=createSprite(wood.x+105,5,5,15);
    //To assign velocity to sprite
    woodspike2.velocityY=wood.velocityY;
    //To make woodspike visibility false
    woodspike2.visible=false;
    //Debugging
    woodspike2.debug=true;
    //To add respective sprite to respective groups
    woodspikeGroup3.add(woodspike2);
    //To assign lifetime to sprite to avoid memory leaks
    woodspike2.lifetime=width/woodspike2.velocityY;
   } 
}

function spawnGhost()
{
  if(frameCount%150===0)
  {
    //To create sprite
    ghost=createSprite(50,0,10,10);
    //To add image to sprite
    ghost.addImage(ghost_img);
    //To assign velocity to sprite
    ghost.velocityX=(3+score/80);
    ghost.velocityY=(4+score/80);
    //Scaling to adjust the image
    ghost.scale=0.1;
    //To add respective sprite to respective groups
    ghostGroup.add(ghost);
    //To assign lfetime to sprite to avoid memory leaks
    ghost.lifetime=width/ghost.velocityX;
  
    //To create sprite
    ghost1=createSprite(550,0,10,10);
    //To add image to sprite
    ghost1.addImage(ghost_img);
    //To assign velocity to sprite
    ghost1.velocityX=-(3+score/100);
    ghost1.velocityY=(4+score/100);
    //Scaling to adjust the image
    ghost1.scale=0.1;
    //To add respective sprite to respective groups
    ghostGroup1.add(ghost1);
  }
  

}
function reset()
{
  //Change game state to play
  gameState=PLAY;
  //Assigning initial value back to score and chance
  score=0;
  chance=3;
  
  //To make gameover and restart visiblity false
  gameover.visible=false;
  restart.visible=false;
  //Make boy visibility true
  boy.visible=true;
  //Assigning back y position to boy
  boy.y=500;
}