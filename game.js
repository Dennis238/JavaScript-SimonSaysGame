

var gamePattern = new Array();
var userClickedPattern = new Array();
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;
//Empieza el juego
//PRESS ANY KEY TO Start

$(document).keypress(function(){
  if (started==false){
  $("#level-title").text("Level "+level);
  nextSequence();
  }
});


function nextSequence(){
  started = true;
  var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour = buttonColors[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
level=level+1;
$("#level-title").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
$("#"+currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
    nextSequence();
    }, 1000);
    userClickedPattern=[];
  }
}else{
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
userClickedPattern=[];
}
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
