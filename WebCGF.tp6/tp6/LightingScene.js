var degToRad = Math.PI / 180.0;

var previousTime = 0;
var updateFreq = 1 / 30.0; //30 FPS

function LightingScene() {
	CGFscene.call(this);
};

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 119.0 / 255.0, 190.0 / 255.0, 1.0); //Ocean blue
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.floor = new MyQuad(this, 0, 2.5, 0, 3); //Sea floor is 16x16
	this.cylinder = new MyCylinder(this, 20, 20);
	this.cylinderTop = new MyCircle(this, 20);
	this.clock = new MyClock(this);
	this.clockBack = new MyCircle(this, 12);
	this.submarine = new MySubmarine(this);
	
	//Textures
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.05, 0.05, 0.05, 1.0);
	this.floorAppearance.setDiffuse(0.5, 0.5, 0.5, 1.0);
	this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("../resources/images/oceanFloor.jpg");
	
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.clockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
	this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.clockAppearance.setShininess(10);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	
	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.columnAppearance.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.columnAppearance.setSpecular(0.55, 0.55, 0.55, 1.0);
	this.columnAppearance.setShininess(120);
	this.columnAppearance.loadTexture("../resources/images/marble.jpg");
	
	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.clockHandBlack = new CGFappearance(this);
	this.clockHandBlack.setAmbient(0.0, 0.0, 0.0, 1.0);
	this.clockHandBlack.setDiffuse(0.01, 0.01, 0.01, 1.0);
	this.clockHandBlack.setSpecular(0.50, 0.50, 0.50, 1.0);
	this.clockHandBlack.setShininess(32);
	
	this.clockHandYellow = new CGFappearance(this);
	this.clockHandYellow.setAmbient(0.0, 0.0, 0.0, 1.0);
	this.clockHandYellow.setDiffuse(0.5, 0.5, 0.0, 1.0);
	this.clockHandYellow.setSpecular(0.60, 0.60, 0.50, 1.0);
	this.clockHandYellow.setShininess(32);
	
	//Interface options
	//Button
	this.doClock = true;
	
	//Group
	this.Light_1 = true;
	this.Light_2 = true;
	this.Light_3 = true;
	this.Light_4 = true;
	this.Light_5 = true;
	
	//Slider
	//this.speed = 3;
	
	//Init update cycle
	this.setUpdatePeriod(updateFreq);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {

	this.setGlobalAmbientLight(0.0, 119.0 / 255.0, 190.0 / 255.0, 1.0); //Ocean blue ambient light

	//Top left light
	this.lights[0].setPosition(0.0, 8.0, 0.0, 1.0);
	this.lights[0].setVisible(true);

	//Top right light
	this.lights[1].setPosition(16.0, 8.0, 0.0, 1.0);
	this.lights[1].setVisible(true);

	//Bottom left
	this.lights[2].setPosition(0.0, 8.0, 16.0, 1.0);
	this.lights[2].setVisible(true);

	//Bottom right
	this.lights[3].setPosition(16.0, 8.0, 16.0, 1.0);
	this.lights[3].setVisible(true);
	
	//Center
	this.lights[4].setPosition(7.5, 8.0, 7.5, 1.0);
	this.lights[4].setVisible(true);

	//Light values for all lights
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setLinearAttenuation(0.1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setLinearAttenuation(0.1);
	this.lights[1].enable();
	
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setLinearAttenuation(0.1);
	this.lights[2].enable();
	
	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setLinearAttenuation(0.1);
	this.lights[3].enable();
	
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setLinearAttenuation(0.1);
	this.lights[4].enable();
};

LightingScene.prototype.updateLights = function() {
	
	var lightBool = [];
	lightBool.push(this.Light_1);
	lightBool.push(this.Light_2);
	lightBool.push(this.Light_3);
	lightBool.push(this.Light_4);
	lightBool.push(this.Light_5);
	
	for (i = 0; i < this.lights.length; i++) {
		
		if(i < lightBool.length) {
			this.lights[i].setVisible(lightBool[i]);
			if(lightBool[i]) {
				this.lights[i].enable();
			} else this.lights[i].disable();
		}
		this.lights[i].update();
	}
};

LightingScene.prototype.update = function(currTime) {
	if(this.doClock) {
		this.clock.update(currTime - previousTime, updateFreq);
	}
	previousTime = currTime;
};

LightingScene.prototype.Toggle_Clock = function () {
	this.doClock = !this.doClock;
};

LightingScene.prototype.subRotateLeft = function() {
	this.submarine.rotateLeft();
};

LightingScene.prototype.subRotateRight = function() {
	this.submarine.rotateRight();
};

LightingScene.prototype.subForward = function() {
	this.submarine.forward();
};

LightingScene.prototype.subBackward = function() {
	this.submarine.backward();
};

LightingScene.prototype.display = function() {
	
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();
	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	// ---- BEGIN Primitive drawing section
	
	//Submarine
	this.pushMatrix();
	this.translate(this.submarine.getCoords()[0], this.submarine.getCoords()[1], this.submarine.getCoords()[2]);
	this.rotate(Math.PI + this.submarine.getAngle(), 0, 1, 0);
	this.translate(0.0, 0.0, -1.0);
	this.submarine.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
	this.translate(8.0, 5.0, 0.0);
	this.scale(0.60, 0.60, 0.20);
	this.clockAppearance.apply();
	this.clock.display();
	this.popMatrix();

	//Clock back
	this.pushMatrix();
	this.translate(8.0, 5.0, 0.0);
	this.scale(0.60, 0.60, 0.20);
	this.rotate(Math.PI, 0, 1, 0);
	this.clockBack.display();
	this.popMatrix();
	
	//Cylinder Top
	this.pushMatrix();
	this.translate(8.0, 8.0, -0.5);
	this.scale(0.5, 8.0, 0.5);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.cylinderTop.display();
	this.popMatrix();

	//Cylinder Bottom
	this.pushMatrix();
	this.translate(8.0, 0.0, -0.5);
	this.scale(0.5, 8.0, 0.5);
	this.rotate(Math.PI / 2, 1, 0, 0);
	this.cylinderTop.display();
	this.popMatrix();
	
	//Cylinder
	this.pushMatrix();
	this.translate(8.0, 0.0, -0.5);
	this.scale(0.5, 8.0, 0.5);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.columnAppearance.apply();
	this.cylinder.display();
	this.popMatrix();
	
	//Floor
	this.pushMatrix();
	this.translate(8, 0, 8);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(16, 16, 0.2);
	this.floorAppearance.apply();
	this.floor.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};