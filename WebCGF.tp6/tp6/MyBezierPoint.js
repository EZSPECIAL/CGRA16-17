/**
 * MyBezierPoint
 * 
 * Constructs a diamond shape used to visualize bezier control points.
 */
function MyBezierPoint(scene) {

	CGFobject.call(this,scene);
	this.initBuffers();
};

MyBezierPoint.prototype = Object.create(CGFobject.prototype);
MyBezierPoint.prototype.constructor = MyBezierPoint;

MyBezierPoint.prototype.initBuffers = function() {
	
    this.vertices = [-0.5, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0, -0.5, 0, 0, 0, 0.5, 0, 0, -0.5];
    this.indices = [1, 4, 0, 1, 2, 4, 1, 5, 2, 1, 0, 5, 3, 0, 4, 3, 4, 2, 3, 2, 5, 3, 5, 0];
    this.normals = [1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1];
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};