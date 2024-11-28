
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

// Starts the game
$(document).keypress(function() {

  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Button clicks
$(".btn").click(function() {

let userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
checkAsnwer(userClickedPattern.length -1);
});

// Won or lost checker and functionality
function checkAsnwer(currentLevel) {

if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
console.log("Success")
if (userClickedPattern.length === gamePattern.length) {
  setTimeout(function() {
    nextSequence();
    }, 1000);
  }
  }else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


// Game sequence
function nextSequence() {

  userClickedPattern = [];
  level++;

$("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// Sounds
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}
// Animation
function animatePress(currentColor) {

$("#" + currentColor).addClass("pressed");

setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
