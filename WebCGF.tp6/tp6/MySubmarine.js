/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MySubmarine(scene) {
	
	CGFobject.call(this, scene);
	
	this.angle = 0;
	this.coords = vec3.fromValues(8.0, 4.0, 8.0);
	this.turningMult = 2.0; //Turning multiplier, 1.0 equals 1°
	this.moveMult = 0.25; //Movement multiplier
	
	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function() {
	
	this.vertices = [ 0.5, 0.3, 0.0,
					  -0.5, 0.3, 0.0,
					  0.0, 0.3, 2.0 ];

	this.normals = [ 0, 1, 0,
		             0, 1, 0,
		             0, 1, 0 ];

	this.indices = [ 0, 1, 2 ];
		
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MySubmarine.prototype.rotateLeft = function() {
	this.angle += this.turningMult * Math.PI / 180.0;
	if(this.angle > 2 * Math.PI) {
		this.angle -= 2 * Math.PI;
	}
};

MySubmarine.prototype.rotateRight = function() {
	this.angle -= this.turningMult * Math.PI / 180.0;
	if(this.angle < -2 * Math.PI) {
		this.angle += 2 * Math.PI;
	}
};

MySubmarine.prototype.forward = function() {
	this.coords = vec3.fromValues(this.coords[0] - this.moveMult * Math.sin(this.angle), this.coords[1], this.coords[2] - this.moveMult * Math.cos(this.angle));
};

MySubmarine.prototype.backward = function() {
	this.coords = vec3.fromValues(this.coords[0] + this.moveMult * Math.sin(this.angle), this.coords[1], this.coords[2] + this.moveMult * Math.cos(this.angle));
};

MySubmarine.prototype.getAngle = function() {
	return this.angle;
};

MySubmarine.prototype.getCoords = function() {
	return this.coords;
};