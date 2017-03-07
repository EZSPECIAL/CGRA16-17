/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
};


MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function () {


	this.scene.pushMatrix();
	this.scene.translate(0.0, 3.5, 0.0);


	//Tampo
	this.scene.pushMatrix();
	this.scene.scale(5, 0.3, 3);
	this.scene.translate(0.0, 0.3/2, 0.0);
	this.cube.display();
	this.scene.popMatrix();
	
	//Pernas
	
	//Frente
	this.scene.pushMatrix();
	this.scene.translate(2.5-0.3/2, -3.5/2, 1.5-0.3/2.0);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();

	//Tras
	this.scene.pushMatrix();
	this.scene.translate(-2.5+0.3/2, -3.5/2, -1.5+0.3/2);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();

	
	//Esquerda
	this.scene.pushMatrix();
	this.scene.translate(-2.5+0.3/2, -3.5/2, 1.5-0.3/2);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	//Direita
	this.scene.pushMatrix();
	this.scene.translate(2.5-0.3/2, -3.5/2, -1.5+0.3/2);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
	
};