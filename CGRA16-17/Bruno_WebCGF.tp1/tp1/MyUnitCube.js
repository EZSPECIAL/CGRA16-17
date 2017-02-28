/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};


MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor = MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,  //BB   0 
            0.5, -0.5, -0.5,   //BR   1 
            0.5, -0.5, 0.5,    //BF   2 
            -0.5, -0.5, 0.5,   //BL   3 
			
            -0.5, 0.5, -0.5,  //TB   4 
            0.5, 0.5, -0.5,   //TR   5 
            0.5, 0.5, 0.5,   //TF   6 
            -0.5, 0.5, 0.5	  //TL   
            ];  

	this.indices = [
			2, 7, 3, 6, 7, 2,   //Front-left
			1, 6, 2, 5, 6, 1,   //Front-right
			6, 4, 7, 5, 4, 6,   //Top
			1, 3, 0, 2, 3, 1,   //Bottom
			3, 4, 0, 7, 4, 3,   //Back-left
			0, 5, 1, 4, 5, 0
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};