/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
 	CGFobject.call(this, scene);

 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();

 	this.materialWood = new CGFappearance(this.scene);
	this.materialWood.setAmbient(1,1,0,1);
	this.materialWood.setDiffuse(0.5,0.2,0.1,1);
	this.materialWood.setSpecular(0.01,0.01,0.01,0.01);	
	this.materialWood.setShininess(120);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(1,0.25,1,1);
	this.materialMetal.setDiffuse(0.25,0.25,0.25,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);
 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display = function() {
 	// legs
 	this.scene.pushMatrix();
	this.materialMetal.apply();
 	this.scene.translate(2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	// table top

 	this.scene.pushMatrix();
	this.materialWood.apply();
 	this.scene.translate(0, 3.5, 0);
 	this.scene.scale(5, 0.3, 3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();
 }
