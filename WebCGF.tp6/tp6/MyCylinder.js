/**
 * MyCylinder
 *
 * Constructs a unit cylinder resting on the XY plane centered on the Z axis.
 */
function MyCylinder(scene, slices, stacks, texH, texV) {
	
	CGFobject.call(this,scene);

	texH = typeof texH !== 'undefined' ? texH : 1.0;
	texV = typeof texV !== 'undefined' ? texV : 1.0;
	
	this.slices = slices;
	this.stacks = stacks;
	this.texH = texH;
	this.texV = texV;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

	var vertices = [];
	var normals = [];
	var texCoords = [];
	var indices = [];
	var increment = 2 * Math.PI / this.slices;
	var height_inc = 1.0 / this.stacks;

	for(var i = 0; i <= this.slices; i++) {
		for(var j = 0; j <= this.stacks; j++) {
			vertices.push(Math.cos(increment * i), Math.sin(increment * i), height_inc * j);
			normals.push(Math.cos(increment * i), Math.sin(increment * i), 0);
			texCoords.push(this.texH * i / this.slices, 1 - this.texV * j / this.stacks);
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
	this.texCoords = texCoords;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};