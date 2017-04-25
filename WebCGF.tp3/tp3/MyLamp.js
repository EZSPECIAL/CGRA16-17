/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

	var vertices = [];
	var normals = [];
	var indices = [];
	var phi_inc = 2 * Math.PI / this.slices;
	var theta_inc = Math.PI / 2 / this.stacks;

	//Repeats top vertex info for each slice
	for(var i = 0; i <= this.slices; i++) {
		for(var j = 0; j <= this.stacks; j++) {
			vertices.push(Math.sin(theta_inc * j) * Math.cos(phi_inc * i), Math.cos(theta_inc * j), Math.sin(theta_inc * j) * Math.sin(phi_inc * i));
			normals.push(Math.sin(theta_inc * j) * Math.cos(phi_inc * i), Math.cos(theta_inc * j), Math.sin(theta_inc * j) * Math.sin(phi_inc * i));
		}
	}

	for(var i = 0; i < this.slices; i++) {
		var i_inc = (this.stacks + 1) * i;
		for(var j = 0; j < this.stacks; j++) {
			indices.push(i_inc + j);
			indices.push(i_inc + j + (this.stacks + 1) + 1);
			indices.push(i_inc + j + 1);

			indices.push(i_inc + j + (this.stacks + 1));
			indices.push(i_inc + j + (this.stacks + 1) + 1);
			indices.push(i_inc + j);
		}
	}

	this.vertices = vertices;
	this.normals = normals;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};