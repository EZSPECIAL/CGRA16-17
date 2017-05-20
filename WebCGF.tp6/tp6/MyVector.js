/**
 * MyVector
 *
 * Constructs an elongated rectangular prism for representing vectors
 *
 * @see        MyUnitCubeQuad
 * @param      {vec3}  vec3_log     Vector to visualize.
 * @param      {vec3}  vec3_coords  Object coordinates to which the vector belongs.
 * @param      {vec3}  vec3_color   Vector color.
 */
function MyVector(scene, vec3_log, vec3_coords, vec3_color) {
	
	CGFobject.call(this, scene);

	this.cube = new MyUnitCubeQuad(this.scene);
	this.finalOrient = vec3_log;
	this.coords = vec3_coords;
	this.color = vec3_color;
	this.active = true;
};

MyVector.prototype = Object.create(CGFobject.prototype);
MyVector.prototype.constructor = MyVector;

MyVector.prototype.display = function() {
	
	if(!this.active) return;
	
	this.scene.pushMatrix();
	this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);

	// ---- BEGIN Calculate angle and axis for orienting the vector (see MyTorpedo.display() for explanation)
	var initOrient = vec3.fromValues(1, 0, 0); //+XX axis
	var angle = this.scene.vec3_angle(initOrient, this.finalOrient);
	
	if(Math.abs(angle) < 0.001) {
		this.scene.rotate(0, 0, 0, 1);
	} else {
		var axis = vec3.create();
		this.scene.vec3_axis(axis, initOrient, this.finalOrient);
		if(axis[0] == 0 && axis[1] == 0 && axis[2] == 0) {
			this.scene.rotate(angle, 0, 1, 0);
		} else this.scene.rotate(angle, axis[0], axis[1], axis[2]);
	}
	// ---- END Calculate angle and axis for orienting the vector (see MyTorpedo.display() for explanation)

	this.scene.scale(1.35, 0.05, 0.05);
	this.scene.translate(0.5, 0.0, 0.0);
	this.scene.vectorColor.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
	this.scene.vectorColor.apply();
	this.cube.display();
	this.scene.popMatrix();
};

/**
 * Updates vector and coordinates.
 *
 * @param      {vec3}  vec3_log     Vector to visualize.
 * @param      {vec3}  vec3_coords  Object coordinates to which the vector belongs.
 */
MyVector.prototype.updateVec = function(vec3_log, vec3_coords) {
	this.finalOrient = vec3_log;
	this.coords = vec3_coords;
};

/**
 * Sets active state.
 *
 * @param      {bool}  bool    True if vector is active.
 */
MyVector.prototype.setActive = function(bool) {
	this.active = bool;
};