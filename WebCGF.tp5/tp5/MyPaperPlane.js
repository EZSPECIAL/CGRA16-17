/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPaperPlane(scene) {
	
	CGFobject.call(this, scene);
	
	this.x = 12;
	this.y = 4.3;
	this.z = 8;
	this.state = 0;
	
	this.initBuffers();
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function() {
	
	this.vertices = [ 0.5, 0.0, 0.5,
		              0.5, 0.0, 0.0,
		              -0.5, 0.0, 0.0,
		              0.5, 0.0, -0.5,
		              0.5, -0.5, 0.0,
		              0.5, -0.5, 0.0 ];

	this.normals = [ 0, 1, 0,
		             0, 1, 0,
		             0, 1, 0,
		             0, 1, 0,
		             0, 0, 1,
		             0, 0, -1 ];
	
	this.indices = [ 0, 1, 2,
					 1, 3, 2,
					 4, 1, 2,
					 5, 1, 2 ];
		
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

/**
 * States
 * 0 - plane is flying towards the window wall
 * 1 - plane has hit the window wall and is falling
 * 2 - plane has hit the floor and stopped
 */

MyPaperPlane.prototype.update = function(currTime, updateFreq) {
	
	//Change state to falling if windows is hit
	if(this.x <= 0.5 && this.state == 0) {
		this.state = 1;
	}
	
	//Change state to stopped if floor is hit
	if(this.y <= 0.5 && this.state == 1) {
		this.state = 2;
		this.y = 0.5;
	}
	
	if(currTime < updateFreq + 100) { //Remove very high values
		if(this.state == 0) {
			this.x -= currTime / 1000;
			this.y += 1.7 / 12 * currTime / 1000;
		} else if(this.state == 1) {
			this.y -= currTime / 1000;
		}
	}
};

MyPaperPlane.prototype.updatePos = function() {
	this.scene.translate(this.x, this.y, this.z);
	if(this.state > 0) {
		this.scene.rotate(Math.PI / 2, 0, 0, -1);
	}
};