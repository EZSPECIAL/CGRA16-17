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
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/


 	this.vertices = [];
 	this.indices = [];
	this.normals = [];
	var ang = (2*Math.PI)/this.slices;

	// STACKS
	for (var j = 0; j < this.stacks; j++) {
		// SLICES
		for (var i = 0; i < this.slices; i++) {
		
			this.vertices.push(Math.cos(i*ang));
			this.vertices.push(Math.sin(i*ang));
			this.vertices.push(j);

			this.vertices.push(Math.cos((i+1)*ang));
			this.vertices.push(Math.sin((i+1)*ang));
			this.vertices.push(j);

			this.vertices.push(Math.cos(i*ang));
			this.vertices.push(Math.sin(i*ang));
			this.vertices.push(j+1);

			this.vertices.push(Math.cos((i+1)*ang));
			this.vertices.push(Math.sin((i+1)*ang));
			this.vertices.push(j+1);



			this.indices.push(this.slices*4*j+4*i);
			this.indices.push(this.slices*4*j+4*i+1);
			this.indices.push(this.slices*4*j+4*i+2);

			this.indices.push(this.slices*4*j+4*i+3);
			this.indices.push(this.slices*4*j+4*i+2);
			this.indices.push(this.slices*4*j+4*i+1);

	
			this.normals.push(Math.cos(ang*(i+0.5)));
			this.normals.push(Math.sin(ang*(i+0.5)));
			this.normals.push(0);

			this.normals.push(Math.cos(ang*(i+0.5)));
			this.normals.push(Math.sin(ang*(i+0.5)));
			this.normals.push(0);
		
			this.normals.push(Math.cos(ang*(i+0.5)));
			this.normals.push(Math.sin(ang*(i+0.5)));
			this.normals.push(0);

			this.normals.push(Math.cos(ang*(i+0.5)));
			this.normals.push(Math.sin(ang*(i+0.5)));
			this.normals.push(0);
		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

console.log("Hi.");