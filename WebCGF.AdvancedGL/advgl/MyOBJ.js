/**
 * MyOBJ
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyOBJ(scene, filename) {
	
	CGFobject.call(this, scene);
	this.filename = filename;
	this.initBuffers();
};

MyOBJ.prototype = Object.create(CGFobject.prototype);
MyOBJ.prototype.constructor = MyOBJ;

MyOBJ.prototype.initBuffers = function() {
	
	var data = importOBJ(this.filename);
	var vertexCount = data[0].length;
	
	var vertices = [];
	var normals = [];
	var indices = [];
	
	for(var i = 0; i < vertexCount; i++) {
		vertices.push(data[0][i][0]);
		vertices.push(data[0][i][1]);
		vertices.push(data[0][i][2]);
		normals.push(data[1][i][0]);
		normals.push(data[1][i][1]);
		normals.push(data[1][i][2]);
		indices.push(i);
	}

	this.vertices = vertices;
	this.normals = normals;
	this.indices = indices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};