/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

	var vertices = [];
	var normals = [];
	var indices = [];
	var increment = 2 * Math.PI / this.slices;
	var height_inc = 1.0 / this.stacks;


	for(var i = 0; i < this.slices; i++) {
		for(var j = 0; j <= this.stacks; j++) {
			vertices.push(Math.cos(increment * i), Math.sin(increment * i), height_inc * j);

			normals.push(Math.cos(increment * i), Math.sin(increment * i), 0);
		}
	}

	for(var i = 0; i < this.slices; i++) {
		var i_inc = (this.stacks + 1) * i;
		for(var j = 0; j < this.stacks; j++) {
			if(i + 1 == this.slices) {
				indices.push(i_inc + j);
				indices.push(j + 1);
				indices.push(i_inc + j + 1);

				indices.push(j);
				indices.push(j + 1);
				indices.push(i_inc + j);
			} else {
				indices.push(i_inc + j);
				indices.push(i_inc + j + (this.stacks + 1) + 1);
				indices.push(i_inc + j + 1);

				indices.push(i_inc + j + (this.stacks + 1));
				indices.push(i_inc + j + (this.stacks + 1) + 1);
				indices.push(i_inc + j);
			}
		}
	}

	this.vertices = vertices;
	this.normals = normals;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};