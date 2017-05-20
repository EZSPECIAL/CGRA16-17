/**
 * MyTarget
 *
 * Constructs a target using a circle on top of a trapezoid.
 *
 * @see        MyTrap
 * @see        MyCircle
 * @param      {number}  x       Coordinate on X axis.
 * @param      {number}  y       Coordinate on Y axis.
 * @param      {number}  z       Coordinate on Z axis.
 */
function MyTarget(scene, x, y, z) {
	
	CGFobject.call(this, scene);
	
	this.trap = new MyTrap(this.scene, 0, 1, 0, 1, true); //Create untextured trapezoid
	this.circle = new MyCircle(this.scene, 20, 20);
	this.coords = vec3.fromValues(x, y, z);
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {
	
	this.scene.pushMatrix();
	this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);

	//Circle
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.105, 0.0);
	this.scene.scale(0.4, 1.0, 0.4);
	this.scene.rotate(-Math.PI / 2, 1, 0, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	//Trapezoid
	this.scene.pushMatrix();
	this.scene.scale(1.0, 0.2, 1.0);
	this.scene.rotate(Math.PI, 0, 0, 1);
	this.trap.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
};

/**
 * Gets the coordinates.
 *
 * @return     {vec3}  Coordinates.
 */
MyTarget.prototype.getCoords = function() {
	return this.coords;
};