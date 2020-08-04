var canvas;
var canvasContext;
var ballX=50;
var ballY=50;
var ballSpeedX=10;
var ballSpeedY=5;

var paddle1Y=250;
var paddle2Y=250;
const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;

const winningScore=20;
var showingWinScreen=false;

var player1Scores=0;
var player2Scores=0;

//for find mouse movement
function calculateMousePos(event){
  var rect=canvas.getBoundingClientRect();
  var root=document.documentElement;
  var mouseX=event.clientX-rect.left-root.scrollLeft;
  var mouseY=event.clientY-rect.top-root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
}

window.onload=function(){
  canvas=document.getElementById('gamecanvas');
  canvasContext=canvas.getContext('2d');

  var framesperSecond=30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  },1000/framesperSecond);

  canvas.addEventListener('mousemove',function(event){
    var mousepos=calculateMousePos(event);
    paddle1Y=mousepos.y-(PADDLE_HEIGHT)/2;
  });

  canvas.addEventListener('mousedown',function(event){
    if(showingWinScreen){
      player1Scores=0;
      player2Scores=0;
      showingWinScreen=false;
    }
  });
}

//to reset ball position
function resetBall(){
  if(player1Scores>winningScore || player2Scores>winningScore){
    showingWinScreen=true;
  }
  ballSpeedX=-ballSpeedX;
  ballX=canvas.width/2;
  ballY=canvas.height/2;
}

//computerMovement
function computerMovement(){
  paddle2YCenter=paddle2Y+(PADDLE_HEIGHT)/2;
  if(paddle2YCenter<ballY-35){
    paddle2Y+=6;
  }else if(paddle2YCenter>ballY+35){
    paddle2Y-=6;
  }
}

//move moveEverything
function moveEverything(){
  if(showingWinScreen){
    return;
  }
    computerMovement();
  //for x-axis movement
    ballX=ballX+ballSpeedX;
    if(ballX>canvas.width){
      if(ballY>paddle2Y && ballY< paddle2Y+PADDLE_HEIGHT){
        ballSpeedX=-ballSpeedX;
        player2Scores+=2;
      }
      else{
        player1Scores+=5;
        resetBall();
      }
    }
    if(ballX<0){
      if(ballY>paddle1Y && ballY< paddle1Y+PADDLE_HEIGHT){
        ballSpeedX=-ballSpeedX;
        player1Scores+=2;
      }
      else{
        player2Scores+=5;
        resetBall();
      }

    }
    //for y-axis movement
    ballY=ballY+ballSpeedY;
    if(ballY>canvas.height){
      ballSpeedY=-ballSpeedY;
    }
    if(ballY<0){
      ballSpeedY=-ballSpeedY;
    }
}

//draw midline
function drawNet(){
    for (var i = 0; i < canvas.height; i+=40) {
      colorRect(canvas.width/2-1,i,2,20,'white');
    }
}

function drawEverything(){
  //background
  colorRect(0,0,canvas.width,canvas.height,'black'); //(from left,from top,rectangle's width,rectangle's height)
  //to showing win message
  if(showingWinScreen){
    canvasContext.fillStyle='white';
    if(player1Scores>winningScore){
      canvasContext.fillText("You Win",canvas.width/2,canvas.height/2);
    }
    else if(player2Scores>winningScore){
      canvasContext.fillText("Computer Win",canvas.width/2,canvas.height/2);
    }

    canvasContext.fillText("Click to Continue",canvas.width/2,canvas.height-100);

    return;
  }

  drawNet();
  
  //left paddle
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //right paddle,computer's padle
  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,100,'white');
  //for ball
  colorCircle(ballX,ballY,10,'white');
  //scores of 1 player
  canvasContext.fillText("Scores "+player1Scores,100,100);
  //scores of computer
  canvasContext.fillText("Scores "+player2Scores,canvas.width-100,100);
}

//draw circle
function colorCircle(centerX,centerY,radius,drawColor){
  canvasContext.fillStyle=drawColor;
  canvasContext.beginPath();//to start the path
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);//(x-axis,y-axis,radius,angles(in radians)(0 to 2PI),true for 1 section)
  canvasContext.fill();
}

//draw rectangle
function colorRect(leftX,topY,width,height,drawcolor){
  canvasContext.fillStyle=drawcolor;
  canvasContext.fillRect(leftX,topY,width,height);
}
