//Global constants
const clueHoldTime = 1000; //How long to hold each clue's light/sound
const cluePauseTime = 333; //How long to pause in between clues
const nextClueWaitTime = 1000; //How long to wait before starting playback of the clue sequence
const speedIncrement = 50; //How much to decrement per turn for the speed setting
const minSpeed = 100; //The lowest the speed setting can take it
const length = 6; //How long the pattern is when neverending is turned off

//Global Variables
var volume = 0.5; //How loud the notes play, must be between 0.0 and 1.0
var highscore = 0; //The highest score achieved
var maxLifes = 3; //The amount of lifes you start off with

//Internal Variables
let gamePlaying = false;
let tonePlaying = false;
let difficulty;
let neverending;
let speed;
let timer;
let lastStraw;
let pattern = [];
let lifes = 3;
let progress = 0;
let guessCounter = 0;
let score = 0;
let currentTimer = null;

//Class Declarations
class Difficulty {
  constructor(size, name, multi) {
    this.size = size;
    this.name = name;
    this.multi = multi;
  }
}

class Node {
  constructor(color, secondaryColor, tone) {
    this.color = color;
    this.secondaryColor = secondaryColor;
    this.tone = tone;
  }
}

//Easy Colors
let green = new Node("lightgreen", "#7ed27e", 275);
let blue = new Node("lightblue", "#99beca", 350);
let red = new Node("lightpink", "#d0949d", 300);
//Medium Colors
let yellow = new Node("lightyellow", "#ceceb7", 375);
let purple = new Node("mediumpurple", "#7055a7", 225);
let grey = new Node("lightslategrey", "#576675", 200);
//Hard Colors
let skyblue = new Node("lightskyblue", "#6ea8cc", 325);
let seagreen = new Node("lightseagreen", "#1c908a", 250);
let white = new Node("mintcream", "#b8c1bd", 400);

//Difficulties
let easy = new Difficulty(3, "Easy", 1);
let medium = new Difficulty(6, "Medium", 2);
let hard = new Difficulty(9, "Hard", 3);

var nodeList = [green, blue, red, yellow, purple, grey, skyblue, seagreen, white];
var difficultyList = [easy, medium, hard];

function handleOptions() {
  difficulty = difficultyList[document.getElementById("difficulty").selectedIndex];
  neverending = document.getElementById("neverending").checked;
  speed = document.getElementById("speed").checked;
  timer = document.getElementById("timer").checked;
  lastStraw = document.getElementById("lastStraw").checked;
}

function startTimer() {
  if (!gamePlaying) return;
  let secondsLeft = 3000;
  currentTimer = setInterval(() => {
    secondsLeft -= 5;
    if (secondsLeft > 1000) {
      document.getElementById("timeLeft").innerHTML = "0:0" + secondsLeft.toString().substring(0, 1) + "." + secondsLeft.toString().substring(1);
    } else {
      document.getElementById("timeLeft").innerHTML = "0:00." + secondsLeft.toString();
    }
    if (secondsLeft == 0) loseGame();
  }, 1);
}

function startGame() {
  //Reset global variables
  progress = 0;
  gamePlaying = true;
  pattern = [];
  score = 0;

  //Setup options
  handleOptions();
  lifes = (lastStraw) ? 1 : maxLifes;
  document.getElementById("score").innerHTML = score.toString();
  document.getElementById("lifes").innerHTML = lifes.toString();
  
  context.resume();

  let gameButtonArea = document.getElementById("gameButtonArea");

  //Clear the board of excess nodes
  while (gameButtonArea.firstChild) gameButtonArea.removeChild(gameButtonArea.firstChild);

  //Create the randomized pattern
  for (let i = 0; i < length; i++) {
    pattern.push(Math.floor(Math.random() * difficulty.size));

  }

  //Populate the board according to difficulty
  for (let i = 0; i < difficulty.size; i++) {
    let currentNode = nodeList[i];
    let button = document.createElement('button');

    button.id = currentNode.color;
    button.classList.add("btn");
    button.setAttribute("style", `background: ${currentNode.color}`);

    button.addEventListener('mousedown', () => {
      button.style.background = currentNode.secondaryColor;
      playTone(currentNode, 400);
    });
    button.addEventListener('mouseup', () => {
      button.style.background = currentNode.color;
      stopTone();
      guess(currentNode);
    });

    gameButtonArea.appendChild(button);
  }

  // Swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  //Start the game!
  playClueSequence();
}

function stopGame() {
  if (currentTimer != null) clearInterval(currentTimer); //Stop timer if its running
  if (highscore < score) { //Change the highscore according
    highscore = score;
    document.getElementById("highscore").innerHTML = score.toString();
  }
  gamePlaying = false;
  // Swap the Start and Stop buttons back
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

//Psuedo mousedown for playback nodes
function lightButton(node) {
  document.getElementById(node.color).style.background = node.secondaryColor;
}

//Psuedo mouseup for playback nodes
function clearButton(node) {
  document.getElementById(node.color).style.background = node.color;
}

//Playback a single node
function playSingleClue(node) {
  if (gamePlaying) {
    lightButton(node);
    if (speed) {
      let newHold = clueHoldTime - progress * speedIncrement;
      if (newHold > minSpeed) {
        playTone(node, newHold);
        setTimeout(clearButton, newHold, node);
      } else {
        playTone(node, minSpeed);
        setTimeout(clearButton, minSpeed, node);
      }
    } else {
      playTone(node, clueHoldTime);
      setTimeout(clearButton, clueHoldTime, node);
    }
  }
}

//PLayback for found nodes
function playClueSequence() {
  document.getElementById("gameButtonArea").classList.add("disabled"); //Disable the buttons to avoid cheating
  guessCounter = 0;
  let delay = nextClueWaitTime; //Set delay to initial wait time
  for (let i = 0; i <= progress; i++) { //For each clue that is revealed so far
    setTimeout(playSingleClue, delay, nodeList[pattern[i]]) //Set a timeout to play that clue
    if (speed) { //Account for speed setting
      let newPause = cluePauseTime - progress * speedIncrement;
      let newHold = clueHoldTime - progress * speedIncrement;
      delay += (newPause > minSpeed) ? newPause : minSpeed;
      delay += (newHold > minSpeed) ? newHold : minSpeed;
    } else {
      delay += cluePauseTime;
      delay += clueHoldTime;
    }
  }
  setTimeout(() => { //Restore the buttons to a clickable state
    document.getElementById("gameButtonArea").classList.remove("disabled");
  }, delay + 500); //500ms is an appropriate amount of time after the playback to be able to click

  if (timer) { //Start the initial timer if its enabled
    setTimeout(startTimer, delay + 500);
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

function addScore() {
  score += (progress + guessCounter) * difficulty.multi * ((speed) ? 1.5 : 1) * ((timer) ? 1.5 : 1) * ((lastStraw) ? 1.5 : 1);
  document.getElementById("score").innerHTML = score.toString();
  if (highscore < score) { //Change highscore on the spot for a more interactive feel
    highscore = score;
    document.getElementById("highscore").innerHTML = score.toString();
  }
}

function minusLife() {
  lifes--;
  let lifesElement = document.getElementById("lifes");
  //Flash and change lifes element
  lifesElement.innerHTML = '<b>' + lifes.toString(); + '</b>';
  lifesElement.style.color = 'red';
  setTimeout(() => { //Set lifes element back to normal
    lifesElement.innerHTML = lifes.toString();
    lifesElement.style.color = 'white';
  }, 500);

}

function guess(node) {
  if (!gamePlaying) {
    return;
  }

  //Checking if the node clicked is correct
  if (node.color == nodeList[pattern[guessCounter]].color) {
    if (currentTimer != null) clearInterval(currentTimer); //Stop a timer if its running
    if (progress == guessCounter) { //If we're at the end of our turn
      if (progress == pattern.length - 1) { //If we're at the end of the pattern
        if (neverending) {
          //We continously just add a node at the end of the list for an unlimited game          
          let newNode = Math.floor(Math.random() * difficulty.size);
          pattern.push(newNode);
          progress++;
          addScore();
          playClueSequence();
        } else {
          //If we're playing a limited game, then go ahead and finish
          addScore();
          winGame();
        }
      } else {
        //Continue the playback for the next node in the pattern
        progress++;
        addScore();
        playClueSequence();
      }
    } else {
      //Keep guessing
      guessCounter++;
      addScore();
      if (timer) startTimer();
    }
  } else {
    //Take a life or end the game
    minusLife();
    if (lifes <= 0) {
      if (currentTimer != null) clearInterval(currentTimer);
      loseGame();
    }
  }
}


// Sound Synthesis Functions
function playTone(node, len) {
  o.frequency.value = node.tone;
  g.gain.setTargetAtTime(volume, context.currentTime, 0.01)
  tonePlaying = true
  setTimeout(function () {
    stopTone()
  }, len)
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime, 0.01)
  tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)