var bg;
var ground, man, man1, farmer, farmer1;
var moneyGroup, enenemyGroup, hurdleGroup;
var coin;
var ground2;
var groundImage;
var invisibleGround;
var score = 0;
var man1;
var gameState = "intro";
var tile1image,tile2image,tile3image,tile4image,tile5image;
var hurdle;
var introImage;
var enemyKilled = 0;
var Bonuscoins = 0;
var finalScore;
var richVillageImage;
var jumpsound;
var coinsound;
var winsound;
function preload(){
 bg = loadImage("images/farm2.png");
 man = loadAnimation("images/Run__000.png","images/Run__001.png","images/Run__002.png",
 "images/Run__003.png","images/Run__004.png","images/Run__005.png",
 "images/Run__006.png","images/Run__007.png","images/Run__008.png","images/Run__009.png");
 farmer = loadAnimation("images/Run (1).png","images/Run (2).png","images/Run (3).png",
 "images/Run (4).png","images/Run (5).png","images/Run (6).png","images/Run (7).png","images/Run (8).png");
 coin = loadImage("images/coin.png");
 groundImage = loadImage("images/ground.jpg");
 tile1image = loadImage("images/tile1.png")
 tile2image = loadImage("images/tile2.png")
 tile3image = loadImage("images/tile3.png")
 tile4image = loadImage("images/tile4.png");
 tile5image = loadImage("images/tile5.png");
 introImage = loadImage("images/introBG.jpg");
 richVillageImage = loadImage("images/richViilage.jpg");
 jumpsound = loadSound("JumpSound.wav");
 coinsound = loadSound("coins.mp3");
 winsound = loadSound("win.mp3");
}


function setup() {
  createCanvas(1500,650);
  
  ground = createSprite(1400,300,20,20);
  ground.addImage(bg);
  ground.scale = 0.3;

  ground2 = createSprite(800,630,20,20);
  ground2.addImage(groundImage);
  
  invisibleGround = createSprite(750,630,1500,20);
  invisibleGround.visible = false;;
 
  farmer1 = createSprite(50,500,20,20);
  farmer1.addAnimation("running",farmer);
  farmer1.scale = 0.4;
  farmer1.debug = false;
  farmer1.setCollider("rectangle",80,0,250,400);

  enemyGroup = new Group();
  moneyGroup = new Group();
  hurdleGroup = new Group();
 
  edges = createEdgeSprites();
}

function draw() {
  if(gameState === "intro"){
      background(introImage);
      console.log("Hello....")
      textFont("Comic Sans MS");
      textSize(30);
      fill("black");
      text("Hello Friends..",300,50)
      text("The local goons of our village have pushed us into poverty!!",300,90);
      text("Please help me in collecting some money before they grab it.",300,130);
      
      text("If you touch the enemy, it will be killed and you get 1 bonus coin = 1000rs..",300,210);
      //text("Try to kill as many enemy as you can",300,250);
      push()
      textSize(40);
      fill("blue");
      text("Press Enter to play",300,350);
      pop()
   
      if(keyDown("enter")){
        gameState = "rules";
      }
    }
    else if(gameState === "rules"){
      background("orange");
      textFont("Comic Sans MS");
      textSize(30);
      fill("white");
      text("Rules for the game",200,50);
      text("1. Collect coins by jumping with up arrow key",200,150);
      text("2. The enemy will try to steal your coins! This will decrease the coins by one..",200,250);
      text("3. If you touch the enemy, he gets killed and you get 1 bonus coin",200,350);
      push()
      fill("red");
      text("4. 1 coin = 10000rs..",200,450)
      pop()
      text("5. Press space to play",200,550)
      if(keyDown("space")){
        gameState = "start";
      }
    }
  
    else if(gameState === "start"){
      console.log("Hiiii....")
    
      spawnEnemy();
      money();
      spawnObstacles();
    text("Save Your Village",100,100);

  ground.velocityX= -(5+score/3);
  ground2.velocityX = -(5+score/3);

  if(ground.x<0){
    ground.x = 1100;
  }

  if(ground2.x<600){
    ground2.x = ground2.width/2;
  }
  if(keyDown(UP_ARROW)){
    farmer1.velocityY =  - 10 ;
    jumpsound.play();
  }
  farmer1.velocityY = farmer1.velocityY  + 1;

  if(hurdleGroup.isTouching(farmer1)){ 
    
    farmer1.velocityY = 0; 
    if(keyDown(UP_ARROW)){
      farmer1.velocityY =  - 10 ;
    }
  }

for(var i=0;i<moneyGroup.length;i++){ 
    if(moneyGroup.get(i).collide(farmer1)){
      moneyGroup.get(i).destroy();
        score = score+1; 
      coinsound.play();
     
    ;}
      }
for(var i=0;i<moneyGroup.length;i++){ 
     if(moneyGroup.get(i).collide(enemyGroup)){
        moneyGroup.get(i).destroy();
           score = score-1; }
          }

for(var i=0;i<enemyGroup.length;i++){ 
    if(enemyGroup.get(i).collide(farmer1)){
              enemyGroup.get(i).destroy();
              enemyKilled = enemyKilled+1;
              Bonuscoins = Bonuscoins+1;
                }
              }


  farmer1.collide(invisibleGround);

  if(score === 20){
    gameState = "end";
  }
  drawSprites();
  textSize(30);
  textFont("Comic Sans MS");
  fill("black");
  text("Coins Collected: "+score,50,50);
  text("Enemy Killed: "+enemyKilled,1200,50);
  text("Bonus Coins: "+Bonuscoins,600,50);
    }
    if(gameState === "end"){
      winsound.play();
      background(richVillageImage);
      fill("black");
      textSize(50);
      textFont("Comic Sans MS");
      //fill("white");
      text("Congrats! ",200,100);
      text("You have successfully removed poverty from your village",100,200)
      finalScore = score+Bonuscoins;
      text("Coins Collected: "+score,200,300);
      text("Bonus Coins: "+Bonuscoins,200,400);
      text("Final Coins: "+finalScore,200,500);
    }
  }

  function spawnEnemy(){
    if(frameCount%300 === 0){
    var man1 = createSprite(1600,550,20,20);
      man1.addAnimation("running",man);
      man1.scale = 0.3;
      man1.velocityX = -3;
      enemyGroup.add(man1);
    }
  

  }

  function money(){
    if(frameCount%100 === 0){
      var money = createSprite(2000,600,20,20);
      money.addImage(coin);
      money.velocityX = -5;
      money.scale = 0.05;
      money.debug = false;
      money.setCollider("rectangle",0,0,money.width, money.height);
      moneyGroup.add(money);
      money.y = Math.round(random(100,550));
    }
  }

  function spawnObstacles(){
    if(frameCount%150 === 0){
      hurdle = createSprite(1950,550,50,50);
    
    
    hurdle.debug = false;
    hurdle.velocityX = -4;
    hurdle.scale = 0.6;
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: hurdle.addImage(tile1image);
          break;
      case 2: hurdle.addImage(tile2image);
          break;
      case 3: hurdle.addImage(tile3image);
          break;
      case 4 : hurdle.addImage(tile4image);
          break;
      case 5 : hurdle.addImage(tile5image);
          break;


          default:break;
    }
    
    hurdleGroup.add(hurdle);

  }
  }

