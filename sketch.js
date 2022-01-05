const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bg_img;
var food;
var rabbit;
var scissor;
var blink;
var sad;
var eat;

function preload()
{
  bg_img = loadImage('assets/background.png');
  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  blink.playing = true;
  blink.looping = true;
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  sad.looping = false;
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  eat.looping = false;
}

function setup() 
{
  createCanvas(500,600);
  frameRate(80);
  engine = Engine.create();
  
  world = engine.world;
  blink.frameDelay = 30;
  eat.frameDelay = 30;
  sad.frameDelay = 30;
  ground = new Ground(200,600,600,20);
//create bunny
  bunny = createSprite(250,530,100,100)
  bunny.addImage("rabit",rabbit)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eat",eat)
  bunny.addAnimation("sad",sad)
  bunny.changeAnimation("blink",blink)
  bunny.scale = 0.2
//rope
  rope = new Rope(7,{x:245,y:30});
//fruit
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
//scissors button
  scissor = createImg("assets/cut_button.png")
  scissor.position(220,30)
  scissor.size(50,50)
  scissor.mouseClicked(ctr)
//fruit conection
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
if(fruit != null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}
 
  rope.show();
  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)== true){
    bunny.changeAnimation("eat",eat)
  }
  if(collide(fruit,ground.body)== true){
    bunny.changeAnimation("sad",sad)
  }
  drawSprites();
 
   
}
function ctr(){
  rope.break()
  fruit_con.detach();
}

function collide(body1,body2){
  if(body1 != null){
    var distance = dist(body1.position.x,
      body1.position.y,
      body2.position.x,
      body2.position.y)
      if(distance<=80){
        World.remove(engine.world,fruit)
        fruit = null
        return true
      }
      else{
        return false
      }
  }
}
