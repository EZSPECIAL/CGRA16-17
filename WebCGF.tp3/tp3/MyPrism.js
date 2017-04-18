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

	for(var i = 0; i < this.slices; i++) {
		vertices.push(Math.cos(increment * i), Math.sin(increment * i), 0);
		vertices.push(Math.cos(increment * i), Math.sin(increment * i), 0);
		vertices.push(Math.cos(increment * i), Math.sin(increment * i), 1);
		vertices.push(Math.cos(increment * i), Math.sin(increment * i), 1);

		normals.push(Math.cos(increment * (i + 0.5)), Math.sin(increment * (i + 0.5)), 0);
		normals.push(Math.cos(increment * (i - 0.5)), Math.sin(increment * (i - 0.5)), 0);
		normals.push(Math.cos(increment * (i + 0.5)), Math.sin(increment * (i + 0.5)), 0);
		normals.push(Math.cos(increment * (i - 0.5)), Math.sin(increment * (i - 0.5)), 0);
	}

	for(var n = 0; n < 2; n++) {
		for(var i = 0; i < this.slices; i++) {
			if(i + 1 == this.slices) {
				indices.push(i * 4 + n);
				indices.push(2 + n);
				indices.push(i * 4 + 2 + n);
				indices.push(0 + n);
				indices.push(2 + n);
				indices.push(i * 4 + n);
			} else {
				indices.push(i * 4 + n);
				indices.push(i * 4 + 6 + n);
				indices.push(i * 4 + 2 + n);
				indices.push(i * 4 + 4 + n);
				indices.push(i * 4 + 6 + n);
				indices.push(i * 4 + n);
			}
		}
	}

	this.vertices = vertices;
	this.normals = normals;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};