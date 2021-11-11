var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 700);

  heading = createElement("h1");
  scoreboard = createElement("h1");

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2

  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();    
}

function draw() {
  background("#BDA297");

  scoreboard.html("Score: "+score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  heading.html("Life:"+life);
  heading.style('color:red');
  heading.position(200,20)

  //display Score and number of lifes
  
  if(gameState===1){
    gun.y=mouseY 
    
    if(frameCount % 80===0){
      drawBlueBubble();
    }
   
    if(frameCount % 100===0){
      drawRedBubble();
    }
  if(keyDown("space")){
    ShootBullet();
  }
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }
    drawSprites();
  }
  
}

function ShootBullet(){

  bullet = createSprite(150,gun.y-20,20,10);
    bullet.addImage(bulletImg);
    bullet.velocityX = 8;
    bullet.scale = 0.1;
    bulletGroup.add(bullet);
}  

function drawBlueBubble(){

bluebubble = createSprite(800,random(20,780),40,40);
bluebubble.addImage(blueBubbleImg);
bluebubble.scale = 0.1;
bluebubble.velocityX =-8;
bluebubble.lifetime = 400;
blueBubbleGroup.add(bluebubble);
}

function drawRedBubble(){

  redbubble = createSprite(800,random(20,780),50,50);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX =-9;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
  }
  
  function handleBubbleCollision(bubbleGroup){
    if(life > 0){
      score = score+1;
    }
    blast = createSprite(bullet.x+60,bullet.y,50,50);
    blast.addImage(blastImg);
    blast.scale = 0.3;
    blast.life = 20;
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
  }

function handleGameOver(bubbleGroup){
  life = life-1;
  bubbleGroup.destroyEach();
  if(life===0){
    gameState=2;
    swal({
      title: `Oh Noooo!`,
      text: "Ohoooo, You Lost The Game. Better luck next time.",
      text:" Your Score Is "+score,
      imageUrl:
        "https://github.githubassets.com/images/icons/emoji/unicode/1f610.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
}

