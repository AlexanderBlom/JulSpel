//Variables
let
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
	imgX = 0,
	imgY = 0,
	playerX = 0,
	playerY = 0,
	speed = 15,
	velY = 0,
	velX = 0,
	width = 1200,
	height= 600,
	friction = 0.85,
	key = [],
	bullets = [],
	enemies = [],
	fgImg = document.getElementById("fg-img"),
	bgImg = document.getElementById("bg-img"),
	treeImg = document.getElementById("tree-img"),
	plImg = document.getElementById("pl-img"),
	bulletImg = document.getElementById("kula-img"),
	enmyImg = document.getElementById("fiende-img"),
	expImg = document.getElementById("exp-img"),
	player = new Player(playerX, playerY, plImg),
	bulletDelay = 0,
	enemiesDelay = 0,
	maxEnemies = 5,
	life = 2,
	score = 0,
	pew = document.getElementById("pew"),
	kabpow = document.getElementById("kabpow"),
	death = document.getElementById("death"),
	snowImg = document.getElementById("snö-img");

window.onload = init;

function init(){
	document.body.addEventListener("keydown", function (e) {
    key[e.keyCode] = true;
	});
	
	document.body.addEventListener("keyup", function (e) {
    key[e.keyCode] = false;
	});
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(){
	if(bulletDelay) bulletDelay--;
	if(enemiesDelay) enemiesDelay--;
	draw();
	move();
	drawBullets();
	moveBullets();
	drawEnemies();
	moveEnemies();
	checkColl();
	drawScore();
	window.requestAnimationFrame(gameLoop);
}

function draw(){
	//Resets the canvas
	ctx.clearRect(0, 0, width, height);
	//Renders the background
	ctx.drawImage(bgImg, imgX, 0, width, height);
	ctx.drawImage(bgImg, (imgX + width), 0, width, height);
	//renders the player
	player.draw();
	//renders the foreground
//	ctx.drawImage(snowImg, 0, imgY, width, height);
//	ctx.drawImage(snowImg, 0, (imgY - height), width, height);
	

	imgX -= 2;
	imgY += 2;
	
	if(imgX <= -width) imgX = 0;
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
		if(!bulletDelay){
			pew.play();
			bullets.push({x : player.x + 128, y : player.y + 64, w : 50, h : 50});
			bulletDelay = 50;
		}
	}

	velY *= friction;
	player.y += velY;
	velX*= friction;
	player.x += velX;

	if(player.x >= 1100) player.x = 1100;
	else if (player.x <= -20) player.x = -20;

	if(player.y >= 500) player.y = 500;
	else if (player.y <= -25) player.y = -25;
}

function drawBullets(){
	 if (bullets.length)
    	for (var i = 0; i < bullets.length; i++) {
     	ctx.drawImage(bulletImg, bullets[i].x, bullets[i].y ,bullets[i].w ,bullets[i].h);
    }
}

function moveBullets(){
	for(var i = 0; i < bullets.length; i++){
		if(bullets[i].x < width){
			bullets[i].x += 10;
		}
		else if(bullets[i].x >= 800){
			bullets.splice(i, 1);
		}
	}	
}

function drawEnemies(){
	let randY = Math.random() * height -100;
	if (randY < 100) randY += 100;

	if(!enemiesDelay && enemies.length < maxEnemies){
		enemies.push({img : enmyImg, x : width -100, y : randY, w : 128, h: 64, alive : true});
		enemiesDelay = 100;
	}
	for(let i = 0; i < enemies.length; i++){
		if(enemies[i].alive){
			ctx.drawImage(enemies[i].img, enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
		}
	}
}

function moveEnemies(){
	for(let i = 0; i < enemies.length; i++){
		if(enemies[i].x > -128){
			enemies[i].x -= 7;
		}
		else if(enemies[i].x < -128){
			enemies[i].x = width - 100;
		}
	}
}

function checkColl(){
	for(let i = 0; i < bullets.length; i++){
		for(let j = 0; j < enemies.length; j++){
			if(bullets[i] && enemies[j])
				if(bullets[i].x >= enemies[j].x && bullets[i].x <= (enemies[j].x + 100) && 
					bullets[i].y >= (enemies[j].y - 20) && bullets[i].y <= (enemies[j].y + enemies[j].h)){
					
					kabpow.play();
					enemyDeath(enemies[j].x, enemies[j].y);			
					enemies.splice(j, 1);
					bullets.splice(i, 1);
					score++;
				}
		}
	}

	for(let i = 0; i < enemies.length; i++){
		if((player.x + 128) >= enemies[i].x && player.x <= (enemies[i].x + enemies[i].w) &&
			player.y <= enemies[i].y && (player.y + 128) >= enemies[i].y){
			player.x = 0;
			player.y = 0;
			enemies = [];
			death.play();
			score = 0;
			alert("Du förloade");
		}
	}
}

function enemyDeath(x, y){
	x2 = x;
	y2 = y;
	for(let i = 64; i < 500; i++){
		ctx.drawImage(expImg, x2, y2, 128, 128);
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle  = "#FFFFFF";
	ctx.fillText("Score: " + score, 8, 20);
}

function Player(x, y, img){
	this.x = x;
	this.y = y;
	this.img = img;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, 128, 128);
	}
}