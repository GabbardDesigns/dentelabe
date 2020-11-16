const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.loop = true;
//backgroundMusic.addEventListener("playing", button. , false);
// backgroundMusic.addEventListener("pause", stop, false);
// backgroundMusic.addEventListener("ended", stop, false);
let hurtSound = document.getElementById("hurt");
let deadSound = document.getElementById("dead");


let timer = 0;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let startBtn = document.getElementById("startBtn");

window.addEventListener('resize', function(){
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
   player.y = .8 * height;
})


function stop() {
     clearTimeout(timer);
}

let survived = 0;


 // const width = canvas.width = 800;
 // const height = canvas.height = 500;
 const candyList = [];
 const keys = [];
 const level =1;

 let currentEnemyMax = 1
 const enemyMax = 8*level;

 const player = {
   x: .5*width,
   y: .9*height,
   width: 33,
   height: 45,
   frameX: 1,
   frameY: 1,
   speed: 2,
   moving: false,
   hitcount: 0,
   collisionImmume: 0,
   immuneStopTime: Date.now(),
   blinking: false
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
      player.frameY = player.hitcount*2;
    }

    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 1 + player.hitcount*2;
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

 function startAnimating(fps = 60){
   fpsInterval = 1000/fps;
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

     //ctx.drawImage(background, 0,0, canvas.width, canvas.height);
     ctx.clearRect(0,0,canvas.width, canvas.height);
     ctx.font = 'bold 20px Open Sans';
     ctx.textAlign = 'center';
     ctx.fillText(`Survived ${survived} of ${enemyMax * 5}`, .3*width,50)
     ctx.fillText(`Score: ${survived * 650}`, .7*width,50)
     let frequency = 200;
      if (! player.blinking || Math.floor(Date.now() / frequency) % 2) {
          drawSprite(playerSprite,player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height )
      }
     movePlayer();
     drawCandy();
     // handlePlayerFrame();
  }
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

     candy.rotation+= 6;

      //checkOffScreen()
     if (candy.y > height) {
        candy.x = (Math.random() * width ) - candy.width
        candy.y = Math.random() * height - height
        candy.speed = (4 * Math.random()) + 2
        survived += 1;
     }

     let candySprite = new Image();
     candySprite.src = candy.candySpriteSRC;

     if (between(player.x, candy.x, candy.x + candy.width)){
          if  (player.collisionImmume===0) {
            collisionDetection(candy.y, candy.height);
           } else {
             checkImmuneValidity();
           }
      }
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
       rotation: 360 * Math.random(),
     };

     candyList[candyList.length] = candy;

   }}




function sleep(resolve, ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function gameLoop(){
//   while (!gameOver) {
//      checkInputs()
//      gameUpdate()
//      showGameUpdates()
// // }
   startBtn.style.display = 'none';
   backgroundMusic.play();
   startAnimating();

}

//gameLoop();

function collisionDetection(candyStart, candyEnd ) {
      if(between(candyStart+ candyEnd , player.y,  player.y +  player.height)){
                console.log("Ouch!");
                takeAHit();

            }

}

function takeAHit() {
  hurtSound.play();
  player.hitcount += 1;
  if (player.hitcount < 4) {
  player.immuneStopTime= Date.now()+1000;
  player.collisionImmume = 1;
  player.frameY = player.hitcount*2;
  player.blinking = true}
  else {
    deadSound.play();
    gameOver = true;
    backgroundMusic.pause();
    backgroundMusic.currentTime= 0;
    player.frameX = 9;
  }
}

function checkImmuneValidity() {
  if (Date.now() > player.immuneStopTime ){
      player.collisionImmume = 0;
      player.blinking = false
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}






// Credit this piece by copying the following to your credits section:
//
// "Frogs Legs Rag" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 4.0 License
// http://creativecommons.org/licenses/by/4.0/

//

// Credit this piece by copying the following to your credits section:
//
// "Getting it Done" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 4.0 License
// http://creativecommons.org/licenses/by/4.0

//
// Wholesome by Kevin MacLeod
// Link: https://incompetech.filmmusic.io/song/5050-wholesome
// License: http://creativecommons.org/licenses/by/4.0/

//
// Two Finger Johnny by Kevin MacLeod
// Link: https://incompetech.filmmusic.io/song/5008-two-finger-johnny
// License: http://creativecommons.org/licenses/by/4.0/

//
// Ditty Pong by Kevin MacLeod
// Link: https://incompetech.filmmusic.io/song/4676-ditty-pong
// License: http://creativecommons.org/licenses/by/4.0/

//
// Silly Fun by Kevin MacLeod
// Link: https://incompetech.filmmusic.io/song/4360-silly-fun
// License: http://creativecommons.org/licenses/by/4.0/
