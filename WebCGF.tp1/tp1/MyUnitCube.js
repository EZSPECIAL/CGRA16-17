/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyUnitCube(scene) {
	
	CGFobject.call(this, scene);
	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor = MyUnitCube;

MyUnitCube.prototype.initBuffers = function() {
	
	//Vertex names are in reference to the default camera view on page load
	this.vertices = [ 0.5, 0.5, 0.5,      //Top-front
					  0.5, 0.5, -0.5,     //Top-right
					  -0.5, 0.5, 0.5,     //Top-left
					  -0.5, 0.5, -0.5,    //Top-back
					  0.5, -0.5, 0.5,     //Bottom-front
					  0.5, -0.5, -0.5,    //Bottom-right
					  -0.5, -0.5, 0.5,    //Bottom-left
					  -0.5, -0.5, -0.5 ]; //Bottom-back

	//Face names are in reference to the default camera view on page load
	this.indices = [ 4, 2, 6, 0, 2, 4,   //Front-left
					 5, 0, 4, 1, 0, 5,   //Front-right
					 0, 3, 2, 1, 3, 0,   //Top
					 5, 6, 7, 4, 6, 5,   //Bottom
					 6, 3, 7, 2, 3, 6,   //Back-left
					 7, 1, 5, 3, 1, 7 ]; //Back-right
		
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};