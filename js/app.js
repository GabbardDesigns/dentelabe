const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.loop = true;
let hurtSound = document.getElementById("hurt");
let deadSound = document.getElementById("dead");
const reSize = document.getElementById('main_canvas');
let canvasHolder = document.getElementById('canvasHolder');
let allaudio = document.getElementsByTagName('audio');
let loadingDIV = document.getElementById('loading');
let silenced = true;
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
let candyOptions = 0;
let candyData = [];
let randNum = 0;

function welcomeForm() {
  newGame.style.display = 'none';
  welcome.style.display = 'unset';

}

let startBtn = document.getElementById("startBtn");
let version = "Candy";
let versionUrl = 'https://cors-anywhere.herokuapp.com/https://www.gabbarddesigns.com/snackcart/data/candy.json';
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerWidth;
let candyList = [];
let level = 1;
let enemyMax = 18 * level;
let currentEnemyMax = 1

let loading = true;
// Define image assets

const playerSprite = new Image();
playerSprite.src = "img\\allteeth2.png"

// define backgrounds
const background = new Image();
background.src = "img\\splash.png"

const dead = new Image();
dead.src = "img\\dead.png"

const paused = new Image();
paused.src = "img\\paused.png"

const loading1 = new Image();
loading1.src = "img\\loading1.png"

const loading2 = new Image();
loading2.src = "img\\loading2.png"

const loading3 = new Image();
loading3.src = "img\\loading3.png"

const loading4 = new Image();
loading4.src = "img\\loading4.png"

const loading5 = new Image();
loading5.src = "img\\loading5.png"

function getVersion(versionPass) {
  console.log("VersionPass = " + versionPass);
  switch (versionPass) {
    case "Candy":
      versionUrl = `https://cors-anywhere.herokuapp.com/https://www.gabbarddesigns.com/snackcart/data/candy.json`;
      break;

    case "CodeLouisville":
      versionUrl = `https://cors-anywhere.herokuapp.com/https://www.gabbarddesigns.com/snackcart/data/codey.json`;
      break;
  }

}


const getCandyData = (myVersion) => {
  versionUrl = myVersion;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", versionUrl, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      candyData = JSON.parse(xhr.responseText);
      makeCandy();
    }
    loading = false;
    loadingDIV.style.display = "none"
    canvas.style.display = '';
    backgroundMusic.play();
  }
  xhr.send();
};


console.log(candyList);

function makeCandy() {
  candyOptions = candyData.length - 1;
  while (candyList.length < enemyMax) {
    randNum = randomIntFromInterval(0, candyOptions);
    console.log(randNum)
    createCandy(randNum)
  }
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
let sound = 0;

function setSquare(width, height) {
  let w = width;
  let h = height;
  if (w > h) {
    w = h;
  } else {
    h = w
  }

  return (w, h)
}

setSquare(55, 22)
console.log(setSquare(55, 22))

const keys = [];

let name, email, phone;
let widthMulti = 1;
let heightMulti = 1;
let gameOver = false;
let gamePaused = false;
let score = 0;
let survived = 0;
let player = {
  x: .5 * width,
  y: .9 * height,
  width: 66,
  height: 90,
  frameX: 1,
  frameY: 1,
  speed: 15,
  moving: false,
  hitcount: 0,
  collisionImmume: 0,
  immuneStopTime: Date.now(),
  blinking: false
}

function setupGame() {
  score = 0;
  //enemyMax = 8*level;
  level = 1;
  candyList = [];
  gameOver = false;
  gamePaused = false;
  survived = 0;
  currentEnemyMax = 1;
  player = {
    x: .5 * width,
    y: .9 * height,
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
  backgroundMusic.play();
  makeCandy();
}

function checkForKeyboardInput(){
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch (event.code) {
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
        player.frameY = 1 + player.hitcount * 2;
        updatePlayerFrame();
      }
      break;
    case "KeyP":
      // case "Space":
      // Toggles Paused State
      pauseGame();
      break;


    case "Space":
      // Toggles Paused State
      if (gameOver) {
        gameOver = false;
        setupGame();
        countDown();
        startAnimating();
      } else {
        pauseGame();
      }

      break;

  }

}, true);
}


function countDown() {
  let timeleft = 10;

  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
  }, 1000);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function drawSprite(img, sX, sY, sw, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sw * widthMulti, sH * heightMulti, dX, dY, dW, dH);

}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pauseGame(scale = false) {
  gamePaused = !gamePaused; // toggle the gamePaused value (false <-> true)
  if (gamePaused || scale) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(paused, 0, 0, canvas.width, canvas.height);
  } else (!gamePaused)
  {
    startAnimating(); // restart loop
  }

}

function updatePlayerFrame() {
  if (player.frameX < 3) player.frameX++
  else player.frameX = 0;
}

let fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps = 60) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  if (gamePaused) return;
  ctx.scale(widthMulti, heightMulti)
  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 20px Open Sans';
    ctx.textAlign = 'center';
    score = survived * 650;
    ctx.fillText(`Survived ${survived} of ${enemyMax * 5}`, .3 * width, 50)
    ctx.fillText(`Score: ${score}`, .7 * width, 50)
    let frequency = 200;
    if (!player.blinking || Math.floor(Date.now() / frequency) % 2) {
      drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
    }
    drawCandy();
  }
}

function drawCandy() {
  if(!gameOver) candyList.forEach((candy) => updateCandy(candy))
}

function updateCandy(candy) {
  //moveCandy()
  candy.y += candy.speed;
  candy.rotation += 6;

  //checkOffScreen()
  if (candy.y > height) {
    candy.x = (Math.random() * width) - candy.width
    candy.y = Math.random() * height - height
    candy.speed = (20 * Math.random()) + 2
    survived += 1;
  }

  let candySprite = new Image();
  candySprite.src = candy.candySpriteSRC;

  drawSprite(candySprite, candy.frameX * candy.width, candy.frameY * candy.height, candy.width, candy.height, candy.x, candy.y, candy.width, candy.height)
  if (player.collisionImmume === 0) {
    if (between(player.x, candy.x, candy.x + candy.width)) {
      collisionDetection(candy.y, candy.height, player.y, player.height);
    } else if (between(player.y, candy.y, candy.y + candy.height)) {
      collisionDetection(candy.x, candy.width, player.x, player.width);
    } else if (between(candy.x, player.x, player.x + player.width)) {
      collisionDetection(player.y, player.height, candy.y, candy.height);
    } else if (between(candy.y, player.y, player.y + player.height)) {
      collisionDetection(player.x, player.width, candy.x, candy.width);
    }
  } else {
    checkImmuneValidity();
  }
}


function createCandy(randNum) {
  buildCandy(candyData[randNum].candySpriteSRC, parseInt(candyData[randNum].w), parseInt(candyData[randNum].h))
}

function buildCandy(path, w, h) {

  let candy = {
    candySpriteSRC: path,
    x: Math.random() * width,
    y: 0,
    width: w,
    height: h,
    frameX: 0,
    frameY: 0,
    speed: (20 * Math.random()) + 2,
    moving: false,
    id: candyList.length,
    rotation: 360 * Math.random(),
  };

  candyList[candyList.length] = candy;

}

function gameLoop() {
  startBtn.style.display = 'none';
  loadingDIV.style.display = ""
  getCandyData(versionUrl);
  // toggleLoading();
  countDown();
  checkForKeyboardInput();
  startAnimating();
}

function deadState() {
  pauseGame()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(dead, 0, 0, canvas.width, canvas.height);
  ctx.font = "24px Helvetica";
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = "middle";

  ctx.textAlign = "center";
  ctx.fillText(`Sorry ${name.value} you died.`, canvas.width * .6, canvas.height / 3);
  ctx.fillText(`You scored ${score}.`, canvas.width * .6, canvas.height / 3 + 40);
  ctx.fillText(`Your email is ${email.value}.`, canvas.width * .6, canvas.height / 3 + 80);
  ctx.font = "16px Arial";
  ctx.fillText("You must reload the page to replay.  Sorry", canvas.width / 2, canvas.height / 2);
  backgroundMusic.pause();


}

function collisionDetection(candyStart, candyEnd, playerStart, playerEnd) {
  if (between(candyStart + candyEnd, playerStart, playerStart + playerEnd)) {
    console.log("Ouch!");
    takeAHit();
  }
}

function takeAHit() {
  hurtSound.play();
  player.hitcount += 1;
  if (player.hitcount < 4) {
    player.immuneStopTime = Date.now() + 1000;
    player.collisionImmume = 3;
    player.frameY = player.hitcount * 2;
    player.blinking = true
  } else {
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
  if (Date.now() > player.immuneStopTime) {
    player.collisionImmume = 0;
    player.blinking = false
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}

// *************************************
// Email Validation
// *************************************
const emailValidation = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ;

function savetoCookies() {
  name = document.forms["RegForm"]["Name"];
  email = document.forms["RegForm"]["eMail"];
  versionID = document.forms["RegForm"]["Version"];
  version = versionID.value;

  if (name.value == "" || !emailValidation.test(email.value)) {
     return false;
  }

//                  setCookie(name, name.value, 90);
//                  setCookie(email, email.value, 90);
//                  setCookie(phone, phone.value, 90);
//                  setCookie(version, version.value, 90);

  closeModal();
  getVersion(version);
  gameLoop();
  return false;
}

function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// *************************************
// Field Validation
// *************************************


const validators = {
  // Checks the field for emptiness.
  required: element => element.value.length > 0,

  // Checks if the email is in a valid format
  mustBeEmail: element => element.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),

  // Checks if the selctor is selected
  mustBeSelected: element => !element.selected
};


function validateElement(element) {
  resetValidation(element);

  const rules = element.dataset.validate.split(" ");

  rules.forEach(rule => {
    if (validators[rule](element)) {
      return;
    } else {
      markElementInvalid(element, rule);
    }
  });
}

function markElementInvalid(element, validatorName) {
  element.classList.add("invalid");
  element.setAttribute("aria-invalid", true);
  const feedbackMessage = element.parentNode.querySelector(
    `[data-validation-message=${validatorName}]`
  );
  feedbackMessage.classList.add("message-visible");
  feedbackMessage.setAttribute("aria-hidden", false);
}

function resetValidation(element) {
  element.classList.remove("invalid");
  element.setAttribute("aria-invalid", false);
  element.parentNode
    .querySelectorAll("[data-validation-message]")
    .forEach(e => {
      e.classList.remove("message-visible");
      e.setAttribute("aria-hidden", true);
    });
}

const form = document.getElementById("first-name-form");
const formElements = Array.from(form.elements);

formElements.forEach(formElement => {
  if (!formElement.dataset) return;
  if (!formElement.dataset.validate) return;

  formElement.addEventListener("blur", () => {
    validateElement(formElement);
  });
});

form.addEventListener("submit", event => {
  // Let's assume, everything is fine.
  let formIsValid = true;
  form.classList.remove("invalid");

  formElements.forEach(formElement => {
    if (!formElement.dataset) return;
    if (!formElement.dataset.validate) return;
    validateElement(formElement);
  });

  formIsValid = form.querySelectorAll(".invalid").length === 0;

  if (formIsValid === false) {
    form.classList.add("invalid");
    event.preventDefault();
  }
});

