/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyUnitCubeQuad(scene) {
	
	CGFobject.call(this, scene);
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {
	
	//Face names are in reference to the default camera view on page load
	//Front-left
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.5);
	this.quad.display();
	this.scene.popMatrix();
	
	//Front-right
	this.scene.pushMatrix();
	this.scene.translate(0.5, 0.0, 0.0);
	this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Top
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.5, 0.0);
	this.scene.rotate(Math.PI/2, -1.0, 0.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Bottom
	this.scene.pushMatrix();
	this.scene.translate(0.0, -0.5, 0.0);
	this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Back-left
	this.scene.pushMatrix();
	this.scene.translate(-0.5, 0.0, 0.0);
	this.scene.rotate(Math.PI/2, 0.0, -1.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Back-right
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, -0.5);
	this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
};