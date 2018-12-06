let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imgX = 0;
let playerX = 0;
let playerY = 0;
let speed = 15;
let velY = 0;
let velX = 0;
let friction = 0.85;
let key = [];
let player = new Player(playerX, playerY, document.getElementById("pl-img"));

function draw(){
	
	let fgImg = document.getElementById("fg-img");
	let bgImg = document.getElementById("bg-img");
	let treeImg = document.getElementById("tree-img");
	let plImg = document.getElementById("pl-img");
	
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

	if(key[32]) player.shoot();
	move();
	window.requestAnimationFrame(draw);
}

	document.body.addEventListener("keydown", function (e) {
    key[e.keyCode] = true;
	});
	
	document.body.addEventListener("keyup", function (e) {
    key[e.keyCode] = false;
	});
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

	velY *= friction;
	player.y += velY;
	velX*= friction;
	player.x += velX;

	if(player.x >= 700) player.x = 700;
	else if (player.x <= -20) player.x = -20;

	if(player.y >= 500) player.y = 500;
	else if (player.y <= -25) player.y = -25;
}
window.requestAnimationFrame(draw);

function Player(x, y, img){
	this.x = x;
	this.y = y;
	this.img = img;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, 128, 128);
	}

	this.shoot = function(){
		console.log('space');
		let bullet = 128;
		ctx.drawImage(document.getElementById("kula-img"), (this.x + bullet), (this.y + 64), 32, 32);

	}
}