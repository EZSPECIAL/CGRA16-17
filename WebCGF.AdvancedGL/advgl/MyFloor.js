/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyFloor(scene) {
	
	CGFobject.call(this, scene);
	this.cube = new MyUnitCubeQuad(this.scene);
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor = MyFloor;

//Draws floor centered on origin and resting on XZ plane
MyFloor.prototype.display = function() {
	
	//Floor
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.1 / 2.0, 0.0);
	this.scene.scale(8.0, 0.1, 6.0);
	this.cube.display();
	this.scene.popMatrix();
};