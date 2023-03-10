let canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let currentKey = new Map();
let mode = "splash"
let navKeys = new Map();
let mouseX = 10;
let mouseY = 10;
let backPackMap = [
    0,0,0,0,0,0,0,0,0,0
]
let keyboardEnabled = true;
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
        this.bounds = new Rect(250,200,10 * this.scale,10 * this.scale);
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
        if (this.direction === "front") {
            this.image.src = "./Assets/astroFront.png"
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
                this.health -=0.01;
            }
    }
    gainHealth() {
        if (enemy.bounds.intersects(player.bounds) === false) {
            if (this.health < 5) {
                this.health += 0.01;
            }
        }
    }
}
class O2 {
    constructor() {
        this.x = 25
        this.y = 50 
        this.w = 150
        this.inerW = 150;
        this.h = 10
        this.leak = 1;
    }

    draw() {
        ctx.strokeStyle  = "white"
        ctx.lineWidth = 2.5;
        ctx.strokeRect(this.x,this.y+0.5,this.w,this.h)
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x,this.y,this.inerW,this.h)
    }
    looseO2() {
        log(this.inerW)
        this.inerW -= this.leak/20;
        if (this.inerW <= 0) {
            this.inerW = 0;
        }
    }

}
let oxygen = new O2;
class ToolBar {
    constructor() {
        this.x = 15
        this.y = 100
        this.size = 35;
        this.barLength = 5
        this.rectON = 0
    }

    draw() {
        this.x = canvas.width - 255
        this.y = 20 
        ctx.lineWidth = 2
        ctx.strokeStyle = "black"
        ctx.fillStyle = "white"
        ctx.fillRect(this.x-10,this.y-10,235,56)
    
        for (let i = 0; i < this.barLength; i++) {
            ctx.strokeStyle = "black"

            ctx.strokeRect(this.x + i * 45,this.y,this.size,this.size,)
            ctx.strokeStyle = "red"
            ctx.strokeRect(this.x-2 + this.rectON * 45,this.y-2,this.size+5,this.size+5)

        }
        for (let i = 0; i < items.length; i++) {
            ctx.drawImage(items[i].image,this.x+items[i].bounds.x+i*45,this.y+items[i].bounds.y)
        }
    }
}
class BackPack {
    constructor () {
        this.visable = false;
        this.w = 300
        this.h = 160;
        this.windowX = canvas.width/2+100;
        this.windowY = canvas.height/2-185;
        this.x = 25
        this.scale = 50
        this.brick = 45;
    }
    draw() {
        this.windowX = canvas.width-310;
        this.windowY = canvas.height/2-310;
        if (this.visable === true) {
            log("RUNNING")
            ctx.fillStyle = "white"
            ctx.globalAlpha = 1;
            ctx.fillRect(this.windowX,this.windowY,this.w,this.h)
            ctx.strokeStyle = "black"

            ctx.lineWidth = 3
            for (let w = 0; w < 5; w++) {
                    ctx.strokeRect(this.windowX+29 + w * this.scale,this.windowY + 10 * this.scale,this.brick,this.brick)
                    for (let h = 0; h < 3; h++) {
                        ctx.strokeRect(this.windowX+29 + w * this.scale,this.windowY + 10 + h * this.scale,this.brick,this.brick)
                        ctx.globalAlpha = 1.0;
                }
            }
            for (let i = 0; i < items.length; i++) {
                ctx.drawImage(items[i].image,this.windowX + 33 + i * this.scale,this.windowY+13,32*1.2,32*1.2)
            }
        }
    }
}
class Item {
    constructor(src,x,y,scale) {
        this.bounds = new Rect(x,y,32*scale,32*scale);
        this.image = new Image();
        this.image.src = src;
        this.scale = scale
    }
    draw() {
        ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
    } 
}
function walls() {
    // log(canvas.width-100)
    log(player.bounds.x)
    if (player.bounds.x <= 0) 
    {
        player.bounds.x = 0;
    }
    if (player.bounds.x >= canvas.width-80) 
    {
        player.bounds.x = canvas.width-80;
    }
    if (player.bounds.y >= canvas.height-80) 
    {
        player.bounds.y = canvas.height-80;
    }
    if (player.bounds.y <= 0) 
    {
        player.bounds.y = 0;
    }
    
}
function mouse() {
    window.addEventListener("click", (e) => {
        mouseY = e.clientY;
        mouseX = e.clientX;
    })
}
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
    }
}
function log(s) {
    console.log(s)

}
function fillRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
//ITEMS
let moon = new Item("./Assets/Planet.png",1,0,5);
let gun = new Item("./Assets/Gun.png",2,5,3);
let items = [moon,gun];
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
            if (currentKey.get("w") === true || currentKey.get("ArrowUp")) {
                player.direction = "front"
                player.animate();
                player.bounds.y -= player.speed
              } 
              if (currentKey.get("1") === true || currentKey.get("ArrowUp")) {
                toolbar.rectON = 0;
              } 
              if (currentKey.get("2") === true || currentKey.get("ArrowUp")) {
                toolbar.rectON = 1;
              } 
              if (currentKey.get("3") === true || currentKey.get("ArrowUp")) {
                toolbar.rectON = 2;
              } 
              if (currentKey.get("4") === true || currentKey.get("ArrowUp")) {
                toolbar.rectON = 3;
              } 
              if (currentKey.get("5") === true || currentKey.get("ArrowUp")) {
                toolbar.rectON = 4;
              } 
              if (currentKey.get("s") === true|| currentKey.get("ArrowDown")) {
                player.direction = "back"
                player.animate();
                player.bounds.y += player.speed
              } 
              if (currentKey.get("a") === true|| currentKey.get("ArrowLeft")) {
                player.direction = "left"
                player.animate();
                player.bounds.x -= player.speed
              } 
              if (currentKey.get("d") === true|| currentKey.get("ArrowRight")) {
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
    mouse();
    if (mode === "game") {
        player.colison();
        heart.colison();
        enemy.follow();
        enemy.animate();
        heart.gainHealth();
        oxygen.looseO2();
        enemy.draw();
        player.draw();
        heart.draw();
        toolbar.draw();
        backpack.draw();
        oxygen.draw();
        
        walls();
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
    test_rects();
    keyboardInit();
    loop();
}
init();