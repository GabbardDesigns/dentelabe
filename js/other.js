// Set constants
const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById("backgroundMusic");
const background = new Image();


background.src = "img\\toothpain.svg"
backgroundMusic.loop = true;

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
   player.y = .8 * height;
})


let startBtn = document.getElementById("startBtn");



function splashIO (event) {  // function to start the game when IO is correct
    // check for the correct events
    if(event.type === "click" || (event.type === "keydown" && event.code === "Enter")){
         // remove events
         canvas.removeEventListener("click",splashIO);
         canvas.removeEventListener("keydown",splashIO);
         startBtn.style.display = 'none';
         gameStates.current = gameStates.startGame;
    }
}


// holds the game state and game state functions
gameStates.prototype = {
     init : undefined,
     splash: function () {  // display splash ===================================
         // display splash and wait for new state
       backgroundMusic.play();
       ctx.drawImage(background, 0,0, canvas.width, canvas.height);
//       ctx.clearRect(0,0,canvas.width, canvas.height);

     },
     setupSplash: function () { // setup splash screen ==========================
         canvas.addEventListener("click", splashIO);
         canvas.addEventListener("keydown", splashIO);
         gameStates.current = gameStates.splash();
         gameStates['current'](); // call the first frame
     },
     startGame: function () { // setup game =====================================
         gameStates.current = gameStates.game(); //set up state function
         gameStates['current']();  // call the first frame
     },
     game: function () {  // plays the main game  ===============================
          let red =2+5
     }
}

// main animation loop
function mainLoop () {
    gameStates.current(); // run current game state
    requestAnimationFrame(mainLoop);
}

gameStates.current = gameStates.setupSplash; // set current state to splash screen

// wait for page to load then start the animation
window.addEventListener('load', function () {
    requestAnimationFrame(mainLoop); // start the animation
})
