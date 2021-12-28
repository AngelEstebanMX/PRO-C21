var Fondo,FondoImg;
var santa,santaCorre,santafail,santag;
var suelo;
var pared
var pared2
var Regalos=0
var Navidad
var gameState="serve"
var AzulIMG
var MoradoIMG
var RojoIMG
var RGroup
var OTGroup
var obstaculoIMG
var arbol,arbolIMG
function preload(){
 santaCorre = loadAnimation("Santa1.png","Santa2.png","Santa3.png","Santa4.png","Santa5.png","Santa6.png","Santa7.png","Santa8.png","Santa9.png","Santa10.png","Santa11.png")
 FondoImg = loadImage("Camino.png")
 santafail = loadImage("SantaFail.png")
 Navidad = loadSound("Navidad.mp3")
 AzulIMG = loadImage("Regalo azul.png")
 RojoIMG = loadImage("Regalo rojo.png")
 MoradoIMG = loadImage("Regalo morado.png")
 santag = loadImage("SantaG.png")
 arbolIMG = loadImage("arbolImg.png")
 obstaculoIMG = loadImage("IS.png")
}

function setup() {
 createCanvas(600,300);
 Navidad.loop();
 Fondo = createSprite(300,100,800,400);
 Fondo.addImage(FondoImg);
 suelo = createSprite(10,250,1000,10)
 suelo.visible=false
 arbol = createSprite(300,150,100,100);
 arbol.addImage("green",arbolIMG)
 arbol.visible=false
 santa = createSprite(100,200,50,50);
 santa.addAnimation("SANTA",santaCorre);
 santa.addImage("fail",santafail)
 santa.addImage("Winer",santag)
 santa.scale=0.18
 santa.setCollider("circle",-60,-10,200)
 pared = createSprite (300,150,10,1000)
 pared2 = createSprite(100,20,1000,10)
 pared2.visible=false
 pared.visible=false
 RGroup = new Group();
 OTGroup = new Group();
 }

function draw() {
 background("white");
 drawSprites();
 //GameState Play
 if(gameState==="serve"){
  textSize(15)
  fill("Blue")
  text("Regalos="+Regalos,500,20);
  Fondo.velocityX=-2
  if(Fondo.x<0){
    Fondo.x= Fondo.width/2
  }
  santa.velocityY=santa.velocityY+0.5;
  santa.collide(suelo);
  if(keyDown("space")&& santa.y>180){
  santa.velocityY=-12
  }
  if(santa.isTouching(RGroup)){
   Regalos+=2; 
   RGroup.setLifetimeEach(0);
  }
  if(Regalos===10){
    gameState="play"
  }
  if(santa.isTouching(OTGroup)){
  gameState="end"
  }
  CrearRegalos();
  CrearObstaculos();
 }
 //Final bueno
if(gameState==="play"){
  Fondo.velocityX=0;
  santa.velocityX=2;
  santa.collide(pared2);
  santa.y=(200)
  arbol.visible=true
  RGroup.setLifetimeEach(0);
  RGroup.setVelocityXEach(0);
  OTGroup.setLifetimeEach(0);
  OTGroup.setVelocityXEach(0);
  if(santa.isTouching(pared)){
  santa.velocityX=0
  santa.velocityY=0
  santa.changeImage("Winer")
  textSize(30)
  fill("yellow")
  text("Salvaste la navidad",200,30)
  }
}
 //GameState Final malo
 if(gameState==="end"){
 Fondo.velocityX=0;
 santa.velocityY=0;
 santa.changeImage("fail");
 RGroup.setLifetimeEach(-1);
 RGroup.setVelocityXEach(0);
 OTGroup.setVelocityXEach(0)
 OTGroup.setLifetimeEach(-1)
 }
}

function CrearRegalos(){
 if(frameCount%250===0){
 var Regalo = createSprite(650,100,50,50);
 Regalo.velocityX=-5
 Regalo.lifetime=150
 Regalo.scale=2
 var num=Math.round(random(1,3))
  switch(num){
  case 1:Regalo.addImage(AzulIMG);break;
  case 2:Regalo.addImage(RojoIMG);break;
  case 3:Regalo.addImage(MoradoIMG);break;
 }
 RGroup.add(Regalo);
 }
}
function CrearObstaculos(){
if(frameCount%120===0){
var TRONCO = createSprite(600,250,50,50);
TRONCO.velocityX=-4;
TRONCO.lifetime=250;
TRONCO.scale=0.4;
TRONCO.debug=true
TRONCO.setCollider("circle",8,-10,70)
TRONCO.addImage("tronco",obstaculoIMG);
OTGroup.add(TRONCO);
}
}