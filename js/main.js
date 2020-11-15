const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

   let width = canvas.width = window.innerWidth;
   let height = canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
})



 // const width = canvas.width = 800;
 // const height = canvas.height = 500;
 const candyList = [];
 const keys = [];
 const level =2;

 let currentEnemyMax = 1
 const enemyMax = 2 * level

 const player = {
   x: 200,
   y: 200,
   width: 33,
   height: 45,
   frameX: 1,
   frameY: 1,
   speed: 2,
   moving: false,
   hitcount: 0,
   collisionImmume: 0,
   immuneStopTime: Date.now()
 }

 const playerSprite = new Image();
 playerSprite.src = "img\\metateeth.png"
 // const background = new Image();
 // background.src = "img\\background.png"

 function drawSprite (img, sX, sY, sw,sH, dX, dY, dW, dH){
   ctx.drawImage(img, sX, sY, sw,sH, dX, dY, dW, dH);
   handlePlayerFrame();
 }

 function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function movePlayer(){

  if (keys['ArrowDown'] || keys['ArrowUp'] || keys['ArrowLeft'] || keys['ArrowRight']) {
     console.log(keys);
     player.moving= true;
     console.log("poopty pants");

    // if (keys['ArrowUp'] && player.y > 0) {
    //   player.y -= player.speed;
    //   player.frameY = 3;
    // }

    // if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
    //   player.y += player.speed;
    //   player.frameY = 0;
    // }

    if (keys['ArrowLeft'] && player.x > 0) {
      player.x -= player.speed;
      player.frameY = 0+ player.hitcount;
    }

    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 1 + player.hitcount;
    }
  }
  else {
    player.moving = false;
  }


}

function handlePlayerFrame(){
  if (player.frameX <3 && player.moving) player.frameX ++
  else player.frameX = 0;
}

window.addEventListener('keydown', function (e){
  let code =""
  if (e.key !== undefined) {
    code = e.key;
  } else if (e.keyIdentifier !== undefined) {
    code = e.keyIdentifier;
  } else if (e.keyCode !== undefined) {
    code = e.keyCode;
  }
  keys[code] = true;
  console.log(code);
 });

window.addEventListener("keyup", function (e){
  delete keys[e.key];
  player.moving = false;
 });


/*
 function animate(){
   //ctx.drawImage(background, 0,0, canvas.width, canvas.height);
   ctx.clearRect(0,0,canvas.width, canvas.height);
   drawSprite(playerSprite,player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height )
   movePlayer();
   handlePlayerFrame();
   requestAnimationFrame(animate);
 }
 animate();
*/

 let fps, fpsInterval, startTime, now, then, elapsed;

 function startAnimating(fps = 2){
   fpsInterval = 100000/fps;
   then = Date.now();
   startTime = then;
   animate();

 }

function animate(){
   requestAnimationFrame(animate);
   now = Date.now();
   elapsed = now - then;
   if (elapsed > fpsInterval){
     then = now - (elapsed % fpsInterval);
   }
   //ctx.drawImage(background, 0,0, canvas.width, canvas.height);
   ctx.clearRect(0,0,canvas.width, canvas.height);

   drawSprite(playerSprite,player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height )
   drawCandy();
   movePlayer();
   if (player.collisionImmume===0) {
        collisionDetection();
   } else {
     checkImmuneValidity();
   }

   // handlePlayerFrame();
}


function drawCandy() {

  candyList.forEach((candy) => updateCandy(candy))

  if (candyList.length < enemyMax) {
    setTimeout(20000, currentEnemyMax += 1)
    if (candyList.length < currentEnemyMax) {
      createCandy(randomIntFromInterval(0, 4))
    }

  }
}

 function updateCandy(candy){

     //moveCandy()
     candy.y += candy.speed;

      //checkOffScreen()
     if (candy.y > height) {
        candy.x = (Math.random() * width ) - candy.width
        candy.y = Math.random() * height - height
        candy.speed = (4 * Math.random()) + 2
     }

     let candySprite = new Image();
     candySprite.src = candy.candySpriteSRC;
     drawSprite(candySprite, candy.frameX * candy.width, candy.frameY * candy.height, candy.width, candy.height, candy.x, candy.y, candy.width, candy.height)

    }

 function createCandy( id =2){
   if (id === 1){
      buildCandy("img\\redc.png", 50, 50, 0, 0)
    }
    else if (id === 2){
      buildCandy("img\\spear.png", 50, 50, 0, 0)
   }
   else if (id === 3){
       buildCandy("img\\gumdrop.png", 50, 50, 0, 0)
   }

   function buildCandy( path, w, h, frameX, frameY)
   {

     let candy = {
       candySpriteSRC: path,
       x: Math.random() * width,
       y: 0,
       width: w,
       height: h,
       frameX: frameX,
       frameY: frameY,
       speed: (4 * Math.random()) +2,
       moving: false,
       id: candyList.length,
     };

     candyList[candyList.length] = candy;

   }}




function sleep(resolve, ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function gameLoop(){
//    while (!gameOver) {
//     checkInputs()
//     gameUpdate()
//     showGameUpdates()
// }
   startAnimating();

}

gameLoop();

function collisionDetection() {
    candyList.forEach(function(candy) {
      if(candy.x > player.x && candy.x < player.x+player.width && candy.y >= player.y && candy.y <player.y+player.height) {
                console.log("Ouch!");
                   setTimeout(takeAHit(), 10000);
            }
        })
}

function takeAHit() {
  player.hitcount += 2;
  player.immuneStopTime= Date.now()+3000;
  player.collisionImmume = 1;
}

function checkImmuneValidity() {
  if (Date.now() > player.immuneStopTime ){
      player.collisionImmume = 0;
  }
}
