var coords;
var si;
var x, y, vx, vy, ax, ay;
var asteroids;
var shipBound, ship;
var astWidth, astHeight;
var score = 0;
var scoreE;
var instrTime = 700;
var gameMusic;

function init() {

    /*
      gameMusic.mp3 - Attribution
      "Mistake the Getaway" Kevin MacLeod (incompetech.com)
      Licensed under Creative Commons: By Attribution 3.0
      http://creativecommons.org/licenses/by/3.0/
      Direct Link: http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100699.
      */

    gameMusic = new Audio("gameMusic.mp3");
    gameMusic.play();
    gameMusic.loop = true;

    coords = document.getElementById("coords");
    shipBound = document.getElementById("shipBound");

    shipBound.style.top = "50%";
    shipBound.style.left = "50%";

    scoreE = document.getElementById("score");


    ship = document.getElementById("ship");
    ship.style.width = window.screen.height / 20;
    ship.style.top = -ship.height / 2 + "px";
    ship.style.left = -ship.width / 2 + "px";

    scoreE.style.top = -scoreE.height / 2 + "px";
    scoreE.style.left = -scoreE.width / 2 + "px";

    x = shipBound.offsetLeft;
    y = shipBound.offsetTop;

    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;

    ship.addEventListener("touchmove", touchHandler, false);



    asteroids = document.getElementsByClassName("asteroids1");
    si = setInterval("gameClock()", 25);
    initAst();

}

function gameClock() {
    move();
    moveAst();
    countUp();
    instr();
}
function touchHandler(event) {

    x = event.touches[0].pageX;
    y = event.touches[0].pageY;

}
if (window.DeviceMotionEvent != undefined) {
    window.ondevicemotion = function (e) {
        ax = event.accelerationIncludingGravity.x / 30;
        ay = event.accelerationIncludingGravity.y / 30;

    }
}

function move() {

    vx = vx - ax;
    vy = vy + ay;

    vx = vx * 0.98;
    vy = vy * 0.98;

    shipBound.style.left = parseInt(x + vx) + "px";
    shipBound.style.top = parseInt(y + vy) + "px";

    x = shipBound.offsetLeft;
    y = shipBound.offsetTop;
}

function initAst() {

    astWidth = ship.width * 3;
    astHeight = ship.height * 2.5;

    for (var i = 0; i < asteroids.length; i = i + 1) {

        asteroids[i].style.width = astWidth + "px";
        asteroids[i].style.height = astHeight + "px";

        asteroids[i].x = Math.round(Math.random() * (window.screen.width * 0.93));
        asteroids[i].y = Math.round(Math.random() * (window.screen.height * 0.93));


        asteroids[i].vx = Math.round((Math.random() - 0.5) * 2);
        asteroids[i].vy = Math.round((Math.random() - 0.5) * 2);

        asteroids[i].style.left = asteroids[i].x;
        asteroids[i].style.top = asteroids[i].y;

        asteroids[i].xA = asteroids[i].offsetLeft;
        asteroids[i].yA = asteroids[i].offsetTop;
    }

}

function moveAst() {

    for (var i = 0; i < asteroids.length; i = i + 1) {
        var ast = asteroids[i];

        if (ast.vx == 0) {
            ast.vx = Math.round((Math.random() - 0.5) * 2);
        }
        if (ast.vy == 0) {
            ast.vy = Math.round((Math.random() - 0.5) * 2);
        }
        ast.x += ast.vx;
        ast.y += ast.vy;


        asteroids[i].style.left = ast.x + "px";
        asteroids[i].style.top = ast.y + "px";

        asteroids[i].xA = asteroids[i].offsetLeft;
        asteroids[i].yA = asteroids[i].offsetTop;
            
        //coords.innerHTML = 'x: ' + parseInt(x) + ', y: ' + parseInt(y) + 'xA: ' + asteroids[i].xA + 'yA: ' + asteroids[i].yA;
          
          
          
        hitTest(ast);
    }

    offScreen();

}

function instr() {

    instrTime--;
    if (instrTime < 0) {
        document.getElementById("instr").innerHTML = "";
    }

}

function offScreen() {
    for (var i = 0; i < asteroids.length; i = i + 1) {
        var ast = asteroids[i];

        if (ast.x > document.documentElement.clientWidth * 1.5) {
            ast.x = -astWidth;
        }
        if (ast.x < -astWidth * 5) {
            ast.x = document.documentElement.clientWidth;
        }
        if (ast.y > document.documentElement.clientHeight * 1.5) {
            ast.y = -astHeight;
        }
        if (ast.y < -astHeight * 5) {
            ast.y = document.documentElement.clientHeight;
        }
    }


    if (x > document.documentElement.clientWidth) {
        x = -ship.width;
    }
    if (x < -ship.width) {
        x = document.documentElement.clientWidth;
    }
    if (y > document.documentElement.clientHeight) {
        y = -ship.height;
    }
    if (y < -ship.height) {
        y = document.documentElement.clientHeight;
    }



}


function hitTest(ast) {

    var astWidth2 = astWidth * 7 / 8;
    var astHeight2 = astHeight * 7 / 8;
    var astX = ast.xA + astWidth * 1 / 8;
    var astY = ast.yA + astHeight * 1 / 8;
    if (x + ship.width / 2 > astX && x - ship.width / 2 < ast.xA + astWidth2) {

        if (y + ship.height / 2 > astY && y - ship.height / 2 < ast.yA + astHeight2) {

            document.location.href = "lose.html";

        }
		  }
}

function countUp() {

    score = score + 0.02;
    localStorage.setItem("gameScore", Math.floor(score));
    document.getElementById("score").innerHTML = Math.floor(score);
    scoreE.style.left = -scoreE.clientWidth / 2 + "px";


}