//Variables
let canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
	imgX = 0,
	playerX = 0,
	playerY = 0,
	speed = 15,
	velY = 0,
	velX = 0,
	friction = 0.85,
	key = [],
	bullets = [],
	fgImg = document.getElementById("fg-img"),
	bgImg = document.getElementById("bg-img"),
	treeImg = document.getElementById("tree-img"),
	plImg = document.getElementById("pl-img"),
	bulletImg = document.getElementById("kula-img"),
	player = new Player(playerX, playerY, plImg);

window.onload = init;

function init(){
	setInterval(gameLoop, 15);

	document.body.addEventListener("keydown", function (e) {
    key[e.keyCode] = true;
	});
	
	document.body.addEventListener("keyup", function (e) {
    key[e.keyCode] = false;
	});
}

function gameLoop(){
	draw();
	move();
	drawBullets();
}

function draw(){
	//Resets the canvas
	ctx.clearRect(0, 0, 800, 800);
	//Renders the background
	ctx.drawImage(bgImg, imgX, 0, 800, 600);
	ctx.drawImage(bgImg, (imgX + 800), 0, 800, 600);
	//renders the foreground
	ctx.drawImage(fgImg, imgX, 0, 800, 600);
	ctx.drawImage(fgImg, (imgX + 800), 0, 800, 600);
	//Renders the player
	player.draw();
	//renders the trees
	/*ctx.drawImage(treeImg, imgX, 0, 800, 600);
	ctx.drawImage(treeImg, (imgX + 800), 0, 800, 600);*/

	imgX -= 2;
	
	if(imgX <= -800) imgX = 0;
}

function move(){
	if(key[68]){
		if(velX < speed){
			velX++;
		}
	}

	if(key[65]){
		if(velX > -speed){
			velX--;
		}
	}

	if(key[83]){
		if(velY < speed){
			velY++;
		}
	}

	if(key[87]){
		if(velY > -speed){
			velY--;
		}
	}

	if(key[32]){
		bullets.push([player.x + 128, player.y + 64, 5, 20]);
	}

	velY *= friction;
	player.y += velY;
	velX*= friction;
	player.x += velX;

	if(player.x >= 700) player.x = 700;
	else if (player.x <= -20) player.x = -20;

	if(player.y >= 500) player.y = 500;
	else if (player.y <= -25) player.y = -25;
}


function drawBullets(){
	 if (bullets.length)
    	for (var i = 0; i < bullets.length; i++) {
      	ctx.fillStyle = '#f00';
     	ctx.fillRect(bullets[i][0],bullets[i][1],bullets[i][2],bullets[i][3])
    }
}

function Player(x, y, img){
	this.x = x;
	this.y = y;
	this.img = img;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, 128, 128);
	}
}