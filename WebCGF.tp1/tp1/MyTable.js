/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTable(scene) {
	
	CGFobject.call(this, scene);
	this.cube = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

//Draws table centered on origin and resting on XZ plane
MyTable.prototype.display = function() {
	
	//Position whole table on XZ plane
	this.scene.pushMatrix();
	this.scene.translate(0.0, 3.5, 0.0);
	
	//Tabletop
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.3 / 2.0, 0.0);
	this.scene.scale(5.0, 0.3, 3.0);
	this.cube.display();
	this.scene.popMatrix();
	
	//Table leg names are in reference to the default camera view on page load
	//Front table leg
	this.scene.pushMatrix();
	this.scene.translate(2.5 - 0.3 / 2.0, -(3.5 / 2.0), 1.5 - 0.3 / 2.0);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	//Left table leg
	this.scene.pushMatrix();
	this.scene.translate(-(2.5 - 0.3 / 2.0), -(3.5 / 2.0), 1.5 - 0.3 / 2.0);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	//Right table leg
	this.scene.pushMatrix();
	this.scene.translate(2.5 - 0.3 / 2.0, -(3.5 / 2.0), -(1.5 - 0.3 / 2.0));
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	//Back table leg
	this.scene.pushMatrix();
	this.scene.translate(-(2.5 - 0.3 / 2.0), -(3.5 / 2.0), -(1.5 - 0.3 / 2.0));
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	this.scene.popMatrix();
};