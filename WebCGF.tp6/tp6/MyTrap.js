/**
 * MyTrap
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTrap(scene, minS, maxS, minT, maxT) {
	
	CGFobject.call(this, scene);
	
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.adjS = 0.1 * (maxS - minS);
	
	this.initBuffers();
};

MyTrap.prototype = Object.create(CGFobject.prototype);
MyTrap.prototype.constructor = MyTrap;

MyTrap.prototype.initBuffers = function() {
	
	this.vertices = [ -0.5, 0.5, -0.5,
		              -0.4, 0.5, -0.5,
		              0.4, 0.5, -0.5,
		              0.5, 0.5, -0.5,
		              -0.4, -0.5, -0.5,
		              0.4, -0.5, -0.5,
		              -0.5, 0.5, 0.5,
		              -0.4, 0.5, 0.5,
		              0.4, 0.5, 0.5,
		              0.5, 0.5, 0.5,
		              -0.4, -0.5, 0.5,
		              0.4, -0.5, 0.5,
		              -0.5, 0.5, -0.5,
		              -0.4, -0.5, -0.5,
		              -0.5, 0.5, 0.5,
		              -0.4, -0.5, 0.5,
		              0.5, 0.5, -0.5,
		              0.4, -0.5, -0.5,
		              0.5, 0.5, 0.5,
		              0.4, -0.5, 0.5,
		              -0.5, 0.5, -0.5,
		              -0.5, 0.5, 0.5,
		              0.5, 0.5, -0.5,
		              0.5, 0.5, 0.5,
		              -0.4, -0.5, -0.5,
		              -0.4, -0.5, 0.5,
		              0.4, -0.5, -0.5,
		              0.4, -0.5, 0.5 ];
	
	this.normals = [0, 0, -1,
		            0, 0, -1,
		            0, 0, -1,
		            0, 0, -1,
		            0, 0, -1,
		            0, 0, -1,
		            0, 0, 1,
		            0, 0, 1,
		            0, 0, 1,
		            0, 0, 1,
		            0, 0, 1,
		            0, 0, 1,
		            -1, 0, 0,
		            -1, 0, 0,
		            -1, 0, 0,
		            -1, 0, 0,
		            1, 0, 0,
		            1, 0, 0,
		            1, 0, 0,
		            1, 0, 0,
		            0, 1, 0,
		            0, 1, 0,
		            0, 1, 0,
		            0, 1, 0,
		            0, -1, 0,
		            0, -1, 0,
		            0, -1, 0,
		            0, -1, 0 ];

    this.texCoords = [ this.maxS, this.minT,
    	               this.maxS - this.adjS, this.minT,
    	               this.minS + this.adjS, this.minT,
    	               this.minS, this.minT,
    	               this.maxS - this.adjS, this.maxT,
    	               this.minS + this.adjS, this.maxT,
    	               this.minS, this.minT,
    	               this.minS + this.adjS, this.minT,
    	               this.maxS - this.adjS, this.minT,
                       this.maxS, this.minT,
    	               this.minS + this.adjS, this.maxT,
    	               this.maxS - this.adjS, this.maxT,
    	               this.minS, this.minT,
    	               this.minS, this.maxT,
    	               this.maxS, this.minT,
    	               this.maxS, this.maxT,
    	               this.maxS, this.minT,
    	               this.maxS, this.maxT,
    	               this.minS, this.minT,
    	               this.minS, this.maxT,
    	               this.minS, this.minT,
    	               this.minS, this.maxT,
    	               this.maxS, this.minT,
    	               this.maxS, this.maxT,
    	               this.minS, this.maxT,
    	               this.minS, this.minT,
    	               this.maxS, this.maxT,
    	               this.maxS, this.minT ]
    
    this.indices = [ 0, 1, 4,
    	             1, 5, 4,
    	             1, 2, 5,
    	             2, 3, 5,
    	             6, 10, 7,
    	             7, 10, 11,
    	             7, 11, 8,
    	             8, 11, 9,
    	             12, 13, 15,
    	             12, 15, 14,
    	             18, 19, 17,
    	             18, 17, 16,
    	             20, 21, 23,
    	             20, 23, 22,
    	             24, 27, 25,
    	             24, 26, 27 ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};