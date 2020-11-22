const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.loop = true;
let hurtSound = document.getElementById("hurt");
let deadSound = document.getElementById("dead");
const reSize = document.getElementById('main_canvas');
let canvasHolder= document.getElementById('canvasHolder');
let allaudio = document.getElementsByTagName('audio');
let silenced = true;
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

 let fps, fpsInterval, startTime, now, then, elapsed;

function welcomeForm() {
     newGame.style.display = 'none';
     welcome.style.display = 'unset';

}

function soundToggle() {

  switch (silenced) {
    case true:
                for (var j = 0; j < allaudio.length; j++) {
                      allaudio[j].muted = false;
                    };

                soundButton.src = "img\\sound.png";
                break;
    case false:
                for (var j = 0; j < allaudio.length; j++) {
                    allaudio[j].muted = true;
                  }
                soundButton.src = "img\\soundoff.png";
                break;

  }
  silenced = !silenced;

}

let firstRun = false;
let timer = 0;







let startBtn = document.getElementById("startBtn");

let width = canvas.width = window.innerWidth;
let height = canvas.height =  window.innerWidth;

window.addEventListener('resize', function(){
   pauseGame()
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
   player.y = .5 * width;
   player.x = .5 * height;
})

function stop() {
     clearTimeout(timer);
}

 let level;
 let enemyMax =8;

 let candyList = [];
 const keys = [];


 let widthMulti = 1;
let heightMulti = 1;
let gameOver = false;
let gamePaused = false;
let currentEnemyMax = 1
let survived = 0;
let player = {
   x: .5*width,
   y: .9*height,
   width: 66,
   height: 90,
   frameX: 1,
   frameY: 1,
   speed: 3,
   moving: false,
   hitcount: 0,
   collisionImmume: 0,
   immuneStopTime: Date.now(),
   blinking: false
 }

function setupGame()
{
  enemyMax = 8*level;
  level = 1;
  candyList = [];
  gameOver = false;
  gamePaused = false;
  survived = 0;
  currentEnemyMax = 1;
  player = {
   x: .5*width,
   y: .9*height,
   width: 66,
   height: 90,
   frameX: 1,
   frameY: 1,
   speed: 5,
   moving: false,
   hitcount: 0,
   collisionImmume: 0,
   immuneStopTime: Date.now(),
   blinking: false
  }
}

let name, email, phone, version;
// let currentEnemyMax = 1
// let widthMulti = 1;
// let heightMulti = 1;
// let gameOver;
// let gamePaused;
// let survived;
//
// player = {
//   width: 66,
//   height: 90,
// }

let rightWall = canvas.width - player.width;
 const playerSprite = new Image();
 playerSprite.src = "img\\allteeth2.png"
 const background = new Image();
 background.src = "img\\splash.png"
 const dead = new Image();
 dead.src = "img\\dead.png";

 window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch(event.code) {
    case "KeyA":
    case "ArrowLeft":
      // Handle "left"
       if (player.x > player.width) {
         player.x -= player.speed;
         player.frameY = player.hitcount * 2;
         updatePlayerFrame();
       }
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "right"
     if (player.x < canvas.width - player.width) {
         player.x += player.speed;
         player.frameY = 1+ player.hitcount * 2;
         updatePlayerFrame();
       }
      break;
    case "KeyP":
    case " ":
      // Toggles Paused State
      pauseGame();
      break;
  }

}, true);

 function drawSprite (img, sX, sY, sw,sH, dX, dY, dW, dH){
   ctx.drawImage(img, sX, sY, sw*widthMulti,sH*heightMulti, dX, dY, dW, dH);
 }

 function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pauseGame() {
    gamePaused = !gamePaused; // toggle the gamePaused value (false <-> true)
    if (!gamePaused) startAnimating() // restart loop
}

// function inchesToFeet(inches){
//    let feet = Math.floor(inches / 12);
//    inches %= 12;
//    let yourHeight = `You are ${feet} and ${inches} tall.`
//    return (feet, inches)
// }


//
// function checkInput() {
//   if (keys['ArrowLeft'] || keys['ArrowRight'] || keys['Space'])
//   {
//     console.log(keys);
//     player.moving = true;
//
//     // if (keys['ArrowUp'] && player.y > 0) {
//     //   player.y -= player.speed;
//     //   player.frameY = 3;
//     // }
//
//     // if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
//     //   player.y += player.speed;
//     //   player.frameY = 0;
//     // }
//
//     if (keys['ArrowLeft'] && player.x > 0) {
//       player.x -= player.speed;
//       player.frameY = player.hitcount * 2;
//        updatePlayerFrame();
//     }
//
//     if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
//       player.x += player.speed;
//       player.frameY = 1 + player.hitcount * 2;
//        updatePlayerFrame();
//     }
//
//     if (keys['ArrowUp']) {
//       pauseGame();
//     }
//
//   }else {
//       player.moving = false;
//     }
// }

function updatePlayerFrame(){
  if (player.frameX <3 ) player.frameX ++
  else player.frameX = 0;
}




/*
 function animate(){
   //ctx.drawImage(background, 0,0, canvas.width, canvas.height);
   ctx.clearRect(0,0,canvas.width, canvas.height);
   drawSprite(playerSprite,player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height )
   movePlayer();
   updatePlayerFrame();
   requestAnimationFrame(animate);
 }
 animate();
*/



 function startAnimating(fps = 60){
   fpsInterval = 1000/fps;
   then = Date.now();
   startTime = then;

   animate();
 }

function animate(){
  //  while (!gameOver) {
      if (gamePaused) return;
      ctx.scale(widthMulti, heightMulti)
      requestAnimationFrame(animate);
      if (canvas.width !== reSize.width || canvas.height !== reSize.height) {
        widthMulti = reSize.width/canvas.width ;
        heightMulti = reSize.height/canvas.height ;

        // canvas.width = reSize.width;
        // canvas.height = reSize.height;
      }

      now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        // checkInput();
        //ctx.drawImage(background, 0,0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 20px Open Sans';
        ctx.textAlign = 'center';
        ctx.fillText(`Survived ${survived} of ${enemyMax * 5}`, .3 * width, 50)
        ctx.fillText(`Score: ${survived * 650}`, .7 * width, 50)
        let frequency = 200;
        if (!player.blinking || Math.floor(Date.now() / frequency) % 2) {
          drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
        }
        // checkInput();
        drawCandy();

      }

    }

//initilize candy pool
  while (candyList.length <= enemyMax) {
          createCandy(randomIntFromInterval(0, 4))
    }

 //}

function drawCandy() {
  candyList.forEach((candy) => updateCandy(candy))
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

      if  (player.collisionImmume===0) {
            if (between(player.x, candy.x, candy.x + candy.width)){
                  collisionDetection(candy.y, candy.height, player.y, player.height);
           } else if (between(player.y, candy.y, candy.y + candy.height)){
                  collisionDetection(candy.x, candy.width, player.x, player.width);
           }
            else if (between(candy.x, player.x, player.x + player.width)){
                  collisionDetection(player.y, player.height, candy.y, candy.height);
           } else if (between(candy.y, player.y, player.y + player.height)){
                  collisionDetection(player.x, player.width, candy.x, candy.width);
           }
      } else {
             checkImmuneValidity();
           }


     drawSprite(candySprite, candy.frameX * candy.width, candy.frameY * candy.height, candy.width, candy.height, candy.x, candy.y, candy.width, candy.height)

    }

 function createCandy( id =2){
   if (id === 1){
      buildCandy("img\\redc.png", 50, 50, 0, 0, 'redC')
    }
    else if (id === 2){
      buildCandy("img\\spear.png", 50, 50, 0, 0, 'spearmint')
   }
   else if (id === 3){
       buildCandy("img\\gumdrop.png", 50, 50, 0, 0, 'gumdrop')
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
       speed: (20 * Math.random()) +2,
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
 //while(!gameOver) {
   startBtn.style.display = 'none';
   canvas.style.display = '';
   backgroundMusic.play();
   init();
 }

function init() {
  setupGame();
  startAnimating();
}

// gameLoop();

function deadState(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dead, 0,0, canvas.width, canvas.height);
    ctx.font="30px Helvetica";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    let deathMessage= `Sorry ${name.value} `;
    ctx.textAlign="center";
    ctx.fillText(deathMessage, canvas.width*.75, canvas.height/3 );
    ctx.fillText("Space Invaders: ", canvas.width*.75, canvas.height/3 +40 );
    ctx.font="16px Arial";
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    ctx.fillText("Press 'Space' or touch to start.", canvas.width / 2, canvas.height/2);

    pauseGame()
}

function collisionDetection(candyStart, candyEnd , playerStart, playerEnd) {
      if(between(candyStart+ candyEnd , playerStart,  playerStart +  playerEnd)){
                console.log("Ouch!");
                takeAHit();
            }

}

function takeAHit() {
  hurtSound.play();
  player.hitcount += 1;
  if (player.hitcount < 4) {
  player.immuneStopTime= Date.now()+1000;
  player.collisionImmume = 3;
  player.frameY = player.hitcount*2;
  player.blinking = true}
  else {
    deadSound.play();
    gameOver = true;
    backgroundMusic.pause();
   // backgroundMusic.currentTime= 0;
    player.frameX = 8;
   // debugger;

    deadState()
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
// Blippy Trance by Kevin MacLeod
// Link: https://incompetech.filmmusic.io/song/5759-blippy-trance
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


 function soundToggle() {

  switch (silenced) {
    case true:
                for (var j = 0; j < allaudio.length; j++) {
                      allaudio[j].muted = false;
                    };

                soundButton.src = "img\\sound.png";
                break;
    case false:
                for (var j = 0; j < allaudio.length; j++) {
                    allaudio[j].muted = true;
                  }
                soundButton.src = "img\\soundoff.png";
                break;

  }
  silenced = !silenced;

}

        //  function musicToggle() {
        //     if (!music) {
        //         backgroundMusic.play();
        //         music = 1;
        //         soundButton.src = "img\\sound.png";
        //     } else {
        //         backgroundMusic.pause();
        //         music = 0;
        //         soundButton.src = "img\\soundoff.png";
        //     }
        // }


// read the local play log file



// const csv = require('csv-parser');
// const fs = require('fs');
//
// fs.createReadStream('data\\playrecord.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });


// connect to API URL (gabbarddesigns.com/gameoptions.csv)
// create request

const emailValidation =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

//
//  function setCookie(cname, cvalue, exdays) {
//   let d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   let expires = "expires="+ d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure]";
// }
//
// function getCookie(cname) {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + cname.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

function savetoCookies() {
                name =  document.forms["RegForm"]["Name"];
                email = document.forms["RegForm"]["eMail"];
//                phone = document.forms["RegForm"]["Telephone"];
                version = document.forms["RegForm"]["Version"];

                if (name.value == "") {
                    window.alert("Please enter your name.");
                    name.focus();
                    return false;
                }

                if (!emailValidation.test(email.value)) {
                    window.alert(
                      "Please enter a valid e-mail address.");
                    email.focus();
                    return false;
                }

                // if (phone.value == "") {
                //     window.alert(
                //       "Please enter your telephone number.");
                //     phone.focus();
                //     return false;
                // }
//
//                  setCookie(name, name.value, 90);
//                  setCookie(email, email.value, 90);
// //                 setCookie(phone, phone.value, 90);
//                  setCookie(version, version.value, 90);
                 closeModal()
                 gameLoop()
              return false;
            }


function closeModal(){
        modal.style.display = 'none';
        overlay.style.display = 'none';
}

function showCredits(){

}
