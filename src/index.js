// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new PIXI.WebGLRenderer(800, 550);
var interactive = true;

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var scene = new PIXI.Container(interactive);

var star;
var table;

// load the texture we need
PIXI.loader.add('room', 'assets/room.jpg');
PIXI.loader.add('table', 'assets/table.png');
PIXI.loader.add('mouse', 'assets/mouse.png');
PIXI.loader.add('hole', 'assets/hole.png');

PIXI.loader.load(function (loader, resources) {
    // This creates a texture from a 'room.png' image.
    room = new PIXI.Sprite(resources.room.texture);

    room.scale.x = 1;
    room.scale.y = 1;
    room.zIndex = 0;

    // Add the room to the scene we are building.
    scene.addChild(room);

    // This creates a texture from a 'table.png' image.
    table = new PIXI.Sprite(resources.table.texture);

    // Setup the position and scale of the table
    table.position.x = 200;
    table.position.y = 250;

    table.scale.x = 0.45;
    table.scale.y = 0.45;

    table.pivot.x = 100;
    table.pivot.y = 100;
    table.zIndex = 1;

    // Add the table to the scene we are building.
    scene.addChild(table);

    // This creates a texture from a 'hole.png' image.
    hole = new PIXI.Sprite(resources.hole.texture);

    // Setup the position and scale of the hole
    hole.position.x = 50;
    hole.position.y = 320;

    hole.scale.x = 0.18;
    hole.scale.y = 0.18;

    hole.rotation = 1.2;

    hole.pivot.x = 100;
    hole.pivot.y = 100;
    hole.zIndex = 2;

    hole.interactive = true;
    hole.click = function(mouseData){
	   console.log("MOUSE OVER!");
	}

    scene.addChild(hole);
    

    //var miceCount = gameData.mice.length; // how many mice we want

	for (var i = 0; i < miceCount; i ++) {
		var mouse = new Mouse(scene, resources.mouse.texture);
		mice.push(mouse);

		mouse.sprite.position.y = i * 50 + 150 + Math.random() * 100;
		mouse.speed = i + 1;
		mouse.sprite.zIndex = 3;
		mouse.leftBorder = 250;
		mouse.rightBorder = 500;
		
	}

	mice[0].sprite.zIndex = 0.5;
	mice[0].sprite.scale.x = .25;
	mice[0].sprite.scale.y = .25;
	mice[0].leftBorder = 20;
	mice[0].rightBorder = 600;
	mice[0].sprite.position.y = 360;


	scene.children.sort(function (a, b) {
		return a.zIndex - b.zIndex;
	});


    // kick off the animation loop (defined below)
    update();


});


var tableEdgeLeft = 250;
var tableEdgeRight = 500;


function Mouse(scene, texture) {
	this.sprite = new PIXI.Sprite(texture);
    this.movingRight = true;
	this.speed = 1;
	this.leftBorder = 0;
	this.rightBorder = 0;


	this.sprite.position.x = tableEdgeLeft;
    this.sprite.position.y = 300;

    this.sprite.scale.x = -1;
    this.sprite.scale.y = 1;

    this.sprite.pivot.x = 100;
    this.sprite.pivot.y = 100;
    
    // Add the mouse to the scene we are building.
    scene.addChild(this.sprite);

}



Mouse.prototype.move = function () {
	// TODO

	this.sprite.position.x += this.movingRight ? this.speed : -this.speed;

	if (this.movingRight && this.sprite.position.x >= this.rightBorder){
		this.movingRight = false;
		this.sprite.scale.x *= -1;
	}

	if (!this.movingRight && this.sprite.position.x <= this.leftBorder){
		this.movingRight = true;
		this.sprite.scale.x *= -1;
	}

};

var mice = [];
var miceCount = 3;

// Update will be called once every frame
function update() {

	for (var i = 0; i < miceCount; i ++) {
		var mouse = mice[i];
		mouse.move();
	}

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(scene);

    // start the timer for the next animation loop
    requestAnimationFrame(update);

    // mouse.position.x += 1
    
}

