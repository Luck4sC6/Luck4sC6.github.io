//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerSpeedY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    speedY : playerSpeedY
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    speedX : 1,
    speedY : 2
}

let player2= {
    x : boardWidth - playerWidth -10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    speedY : playerSpeedY
}

function reset() {
    player1Score = 0;
    player2Score = 0;
    resetGame(1);
}
let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw player1
    context.fillStyle = "darkblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);


    //player 1
    context.fillStyle = "darkblue";
    //player1.y += player1.speedY;
    let nextPlayer1Y = player1.y + player1.speedY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player2
    //player2.y += player2.speedY;
    let nextPlayer2Y = player2.y + player2.speedY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //ball
    context.fillStyle = "black";
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //id ball touche top or botton
    if (ball.y <0 || (ball.y + ball.height >= boardHeight)) {
        ball.speedY *= -1; //reverse
    }

    //baunce back boll
    if (detectColision(ball, player1)) {
        if(ball.x <= player1.x + player1.width) {
            //left side of ball touches right side of player1
            ball.speedX *= -1; //flip x direction
        }
    }
    else if(detectColision(ball, player2)) {
        if(ball.x + ballWidth >= player2.x) {
            //right side of ball touches left side of player 2
            ball.speedX *= -1;
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if(ball.x + ballWidth > boardWidth) {
        player1Score ++;
        resetGame(-1);
    }

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 -45, 45);

    //draw dotted line middle
    for (let i = 10; i < board.height; i += 25) {
        //i starting y position, draw a square every 25 pixels down
        context.fillRect(board.width/2 - 10, i, 5, 5);
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight -1);
}


function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
        player1.speedY  = -3;
    }
    else if(e.code == "KeyS") {
        player1.speedY = 3;
    }
    //player2
    if (e.code == "ArrowUp") {
        player2.speedY  = -3;
    }
    else if(e.code == "ArrowDown") {
        player2.speedY = 3;
    }
}
function detectColision(a, b) {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
            a.x + a.width > b.x &&//a's top right corner passes b's top left corner
            a.y < b.y + b.height &&//a's top left corner doens't reach b's botton left corner
            a.y + a.height > b.y; //a's botton left corner passes b's top left corner
}

function resetGame(direction) {
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width : ballWidth,
        height : ballHeight,
        speedX : direction,
        speedY : 2
    }
}