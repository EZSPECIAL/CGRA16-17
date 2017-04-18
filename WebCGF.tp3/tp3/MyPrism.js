/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

	var vertices = [];
	var normals = [];
	var indices = [];
	var increment = 2 * Math.PI / this.slices;
	var height_inc = 1.0 / this.stacks;


	for(var i = 0; i < this.slices; i++) {
		for(var j = 0; j <= this.stacks; j++) {
			vertices.push(Math.cos(increment * i), Math.sin(increment * i), height_inc * j);
			vertices.push(Math.cos(increment * i), Math.sin(increment * i), height_inc * j);

			normals.push(Math.cos(increment * (i + 0.5)), Math.sin(increment * (i + 0.5)), 0);
			normals.push(Math.cos(increment * (i - 0.5)), Math.sin(increment * (i - 0.5)), 0);
		}
	}

	for(var i = 0; i < this.slices; i++) {
		var i_inc = (this.stacks + 1) * 2 * i;
		for(var j = 0; j < this.stacks; j++) {
			for(n = 0; n < 2; n++) {
				if(i + 1 == this.slices) {
					indices.push(i_inc + j * 2 + n);
					indices.push(j * 2 + 2 + n);
					indices.push(i_inc + j * 2 + 2 + n);
					
					indices.push(j * 2 + n);
					indices.push(j * 2 + 2 + n);
					indices.push(i_inc + j * 2 + n);
				} else {
					indices.push(i_inc + j * 2 + n);
					indices.push(i_inc + j * 2 + (this.stacks + 1) * 2 + 2 + n);
					indices.push(i_inc + j * 2 + 2 + n);
					
					indices.push(i_inc + j * 2 + (this.stacks + 1) * 2 + n);
					indices.push(i_inc + j * 2 + (this.stacks + 1) * 2 + 2 + n);
					indices.push(i_inc + j * 2 + n);
				}
			}
		}
	}

	this.vertices = vertices;
	this.normals = normals;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};