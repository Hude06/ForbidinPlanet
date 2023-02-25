let canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let currentKey = new Map();
let mode = "splash"
let navKeys = new Map();
class Splash {
    constructor() {
        this.arrowLeft = new Image();
        this.arrowRight = new Image();
        this.arrowLeft.src = "./Assets/arrowLeft.png";
        this.arrowRight.src = "./Assets/arrowRight.png";
        this.x = 15
        this.y = canvas.height/2;
        this.up = false
        this.down = false
        this.scale = 1;
    }
    draw() {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "black"
        ctx.font = 30*this.scale + "px VT323";
        ctx.fillText("Forbidden Plannet!", canvas.width / 2-95*this.scale, canvas.height / 2 - 40 * this.scale);
        ctx.fillText("Press Space To Start!", canvas.width / 2-108*this.scale, canvas.height / 2 - 10 * this.scale)
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.arrowLeft,canvas.width/2+125 * this.scale + this.x,this.y * this.scale + 75,512/15 * this.scale ,512/15*this.scale)
        ctx.drawImage(this.arrowRight,canvas.width/2-160 * this.scale + this.x,this.y * this.scale + 75,512/15 * this.scale ,512/15*this.scale)
    }
    animate() {
        if (this.up === false) {
            setTimeout(() => {
                this.y += 1;
                this.up = true
                this.down = false
                return
            }, 120)
        }
        if (this.down === false) {
            setTimeout(() => {
                this.y -= 1;
                this.down = true;
                this.up = false;
                return
            }, 120)
        }
    }

}
class Point {
	constructor(x,y) {
		this.x = x
		this.y = y
	}
}
class Rect {
	constructor(x,y,w,h) {
		this.w = w
		this.h = h
		this.x = x
		this.y = y
	}
	intersects(rect2) {
		let TL = new Point(this.x,this.y);
		let TR = new Point(this.x + this.w, this.y);
		let BL = new Point(this.x,this.y + this.h);
		let BR = new Point(this.x + this.w, this.y + this.h);
		if (rect2.contains(TL)) {
			return true
		} else if(rect2.contains(TR)) {
			return true
		} else if(rect2.contains(BL)) {
			return true
		} else if (rect2.contains(BR)) {
			return true
		} else {
			return false
		}
        
	}
	contains(pt) {
        if (pt.x < this.x)
        return false;
        if (pt.y < this.y)
        return false;
        if (pt.x > this.x + this.w)
        return false;
        if (pt.y > this.y + this.h)
        return false;
    return true;
	}
}
class Player {
    constructor() {
        this.image = new Image();
        this.image.src = "./Assets/astro.png"
        this.scale = 8;
        this.bounds = new Rect(500,10,10 * this.scale,10 * this.scale);
        this.color = "Red"
        this.speed = 2;
        this.direction = "back";
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
    colison() {
        if (enemy.bounds.intersects(this.bounds)) {
            enemy.mad = true;
        }
    } 
    animate() {
        if (this.direction === "left") {
            this.image.src = "./Assets/astroLeft.png"
        }
        if (this.direction === "right") {
            this.image.src = "./Assets/astroRight.png"
        }
        if (this.direction === "back") {
            this.image.src = "./Assets/astro.png"
        }
    }
}
class Enemy {
    constructor() {
        this.alive = true;
        this.scale = 2;
        this.speed = 1;
        this.mad = false;
        this.image = new Image();
        this.image.src = "./Assets/GostNice.png"
        this.bounds = new Rect(300,100,32*this.scale,32*this.scale);
    }
    draw() {
        if (this.alive === true) {
            ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
    }
    animate() {
        if (this.mad === true) [
            this.image.src = "./Assets/GostMean.png"
        ]
    }
    follow() {
        if (this.mad === true) {
            if (this.bounds.x > player.bounds.x+10) {
                this.bounds.x -= this.speed;
            }
            if (this.bounds.x < player.bounds.x+10) {
                this.bounds.x += this.speed;
            }
            if (this.bounds.y < player.bounds.y+10) {
                this.bounds.y += this.speed -0.5;
            }
            if (this.bounds.y > player.bounds.y+10) {
                this.bounds.y -= this.speed -0.5;
            }
        }
    }
}
class Heart {
    constructor() {
        this.image = new Image();
        this.image.src = "./Assets/Heart.png"
        this.x = -10
        this.y = -30
        this.w = 10
        this.h = 10
        this.health = 5;
        this.scale = 2.5;
    }
    draw() {
        for(let i = 0; i < this.health; i++) {
            ctx.drawImage(this.image,this.x + i*this.scale*15,this.y,32*this.scale,32*this.scale)
        }
    }
    looseHealth(h) {
        this.health -= h;
    }
    colison() {
        if (enemy.bounds.intersects(player.bounds)) {

        }
    }
}
class ToolBar {
    constructor() {
        this.x = 10
        this.y = 500
        this.size = 30;
        this.barLength = 8
    }

    draw() {
        this.x = canvas.width /2 - 23*this.barLength
        this.y = canvas.height - 40
        ctx.lineWidth = 2
        ctx.strokeStyle = "white"
        for (let i = 0; i < this.barLength; i++) {
            ctx.strokeRect(this.x + i * 45,this.y,this.size,this.size,)
        }
    }
}
class BackPack {
    constructor () {
        this.visable = false;
        this.w = 800
        this.h = 550;
    }
    draw() {
        if (this.visable === true) {
            log("RUNNING")
            ctx.fillStyle = "white"
            ctx.globalAlpha = 0.9;
            ctx.fillRect(canvas.width/2 - this.w/2,canvas.height/2 - this.h/2,this.w,this.h)
            ctx.globalAlpha = 1.0;
        }
    }
}
class Items {
    constructor() {
        this.moon = new Image();
        this.moon.src = "./Assets/Planet.png"
        this.spaceShip = new Image();
        this.spaceShip.src = "Assets/spaceShip.png";
    }
}
let item = new Items();
function test_rects() {
	let rect = new Rect(30,25,20,20)
	console.assert(rect.contains(new Point(0,0))==false)
	//Top
	console.assert(rect.contains(new Point(30,5))==false)
	//Inside
	console.assert(rect.contains(new Point(30,30))==true)
	//Right
	console.assert(rect.contains(new Point(50,10))==false)
	//Left
	console.assert(rect.contains(new Point(5,10))==false)
	//Botom
	console.assert(rect.contains(new Point(25,60))==false)
	let rect2 = new Rect(40,30,20,20)
	console.assert(rect.intersects(rect2)==true)
	console.assert(rect2.intersects(rect)==true)
    if (rect.intersects(rect2) || rect2.intersects(rect)) {
        log("WORKS")
    }
	console.log("TESTS PASS")
}
test_rects();
function log(s) {
    console.log(s)

}
function fillRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
let keyboardEnabled = true;
let toolbar = new ToolBar()
let heart = new Heart();
let enemy = new Enemy();
let player = new Player();
let splash = new Splash();
let backpack = new BackPack();


function keyboardLoop() {
    if (keyboardEnabled) {}

    if (mode === "splash") {
        if (currentKey.get(" ") === true) {
            mode = "game"
        }   
    }

    if (mode === "game") {
        if (keyboardEnabled) {
            if (currentKey.get("w") === true) {
                player.direction = "forward"
                player.animate();
                player.bounds.y -= player.speed
              } 
              if (currentKey.get("s") === true) {
                player.direction = "back"
                player.animate();
                player.bounds.y += player.speed
              } 
              if (currentKey.get("a") === true) {
                player.direction = "left"
                player.animate();
                player.bounds.x -= player.speed
              } 
              if (currentKey.get("d") === true) {
                player.direction = "right"
                player.animate();
                player.bounds.x += player.speed
              } 
        }
        if (navKeys.get("e") === true) {
            backpack.visable = !backpack.visable
            keyboardEnabled = false
        }
        if (backpack.visable === false) {
            keyboardEnabled = true

        }
    }
}
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);
        navKeys.set(event.key, true);

      });
      window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
        navKeys.set(event.key, false);
    
      });    
}
function ResizeCanvas() {
    canvas.width = window.innerWidth -30
    canvas.height = window.innerHeight -30
}
function clearScreen() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
function loop() {
    clearScreen();
    keyboardLoop();
    if (mode === "game") {
        player.colison();
        heart.colison();
        enemy.follow();
        enemy.animate();
        enemy.draw();
        player.draw();
        heart.draw();
        toolbar.draw();
        backpack.draw();
    }
    if (mode === "splash") {
        splash.draw();
        splash.animate();
    }
    navKeys.clear();
    requestAnimationFrame(loop);
}
function init() {
    window.addEventListener("load", (e) => {
        ResizeCanvas()
      })
      window.addEventListener("resize", (e) => {
        ResizeCanvas();
    
    })
    keyboardInit();
    loop();
}
init();