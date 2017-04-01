
function TPscene() {
	
    CGFscene.call(this);
}

TPscene.prototype = Object.create(CGFscene.prototype);
TPscene.prototype.constructor = TPscene;

TPscene.prototype.init = function (application) {
	
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); //Sets "background" color to black
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE); //Enables culling of back faces
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.spider = new MyOBJ(this, "spider.obj");
};

TPscene.prototype.initLights = function () {
	
	this.lights[0].setPosition(15.0, 2.0, 5.0, 1.0);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].enable();
    this.lights[0].update();
};

TPscene.prototype.initCameras = function () {
	
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

TPscene.prototype.setDefaultAppearance = function () {
	
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

TPscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformations)
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// ---- BEGIN object drawing/transformation

	this.scale(0.25, 0.25, 0.25);
	this.spider.display();
	
	// ---- END object drawing/transformation
};

//-----------------------------------------------
// OBJ IMPORT FUNCTIONS
//-----------------------------------------------

//Return array with all the text from a simple text file
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

//Return vertices and indices imported from "file" OBJ
function importOBJ(file) {
	
	var text = readTextFile(file);
	var lines = text.split(/\r?\n/);
	var positions = [];
	var normals = [];
	var fpos = [];
	var fnor = [];
	
	//Import vertex info (positions and normals)
	for(var i = 0; i < lines.length; i++) {
		var splitted = lines[i].trimRight().split(/\s+/g);
		if(splitted.length > 0) {
			switch(splitted[0]) {
			case 'v':
				positions.push(vec3.fromValues(
				parseFloat(splitted[1]),
				parseFloat(splitted[2]),
				parseFloat(splitted[3])));
			    break;
			case 'vn':
				normals.push(vec3.fromValues(
				parseFloat(splitted[1]),
				parseFloat(splitted[2]),
				parseFloat(splitted[3])));
			    break;
			case 'f':
		        var f1 = splitted[1].split('/');
		        var f2 = splitted[2].split('/');
		        var f3 = splitted[3].split('/');
		        var posAdjust = 1;
		        var norAdjust = 1;
			    fpos.push(positions[f1[0] - posAdjust]);
		        fpos.push(positions[f2[0] - posAdjust]);
		        fpos.push(positions[f3[0] - posAdjust]);
		        fnor.push(normals[f1[2] - norAdjust]);
		        fnor.push(normals[f2[2] - norAdjust]);
		        fnor.push(normals[f3[2] - norAdjust]);
			    break;
			default:
				break;
			}
		}
	}

	//alert(fpos.length);
	//alert(fnor.length);
	
	return [fpos, fnor];
}