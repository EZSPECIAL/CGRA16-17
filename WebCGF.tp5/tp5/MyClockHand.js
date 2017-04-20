/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyClockHand(scene) {
	
	CGFobject.call(this, scene);
	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.initBuffers = function() {
	
	this.vertices = [ -0.5, 0.0, 0.0,
					  0.5, 0.0, 0.0,
					  -0.5, 1.0, 0.0,
					  0.5, 1.0, 0.0 ];

	this.normals = [ 0, 0, 1,
		             0, 0, 1,
		             0, 0, 1,
		             0, 0, 1 ];

	this.indices = [ 0, 1, 2,
		             1, 3, 2 ];
		
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle) {
	this.angle = angle * Math.PI / 180.0;
};

MyClockHand.prototype.rotateAngle = function() {
	this.scene.rotate(this.angle, 0, 0, -1);
};

MyClockHand.prototype.getAngle = function() {
	return (this.angle * 180.0 / Math.PI);
};