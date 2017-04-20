var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var previousTime = 0;
var updateFreq = 1 / 30.0; //30 FPS

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.windowWall = new MyQuad(this, 0.0 - 1.375, 1.0 + 1.375, 0.0 - 0.5, 1.0 + 0.5);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0.9175, 1.0);
	this.prismTop = new MyCircle(this, 8);
	this.cylinderTop = new MyCircle(this, 8);
	this.clock = new MyClock(this);
	this.paperPlane = new MyPaperPlane(this);
	
	//Textures
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setAmbient(0.21, 0.12, 0.05, 1.0);
	this.tableAppearance.setDiffuse(0.71, 0.42, 0.18, 1.0);
	this.tableAppearance.setSpecular(0.20, 0.14, 0.08, 1.0);
	this.tableAppearance.setShininess(20);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.05, 0.05, 0.05, 1.0);
	this.floorAppearance.setDiffuse(0.5, 0.5, 0.5, 1.0);
	this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.slidesAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
	this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.boardAppearance.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.boardAppearance.setSpecular(0.55, 0.55, 0.55, 1.0);
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.clockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
	this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.clockAppearance.setShininess(10);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	
	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialChrome = new CGFappearance(this);
	this.materialChrome.setAmbient(0.25, 0.25, 0.25, 1.0);
	this.materialChrome.setDiffuse(0.40, 0.40, 0.40, 1.0);
	this.materialChrome.setSpecular(0.77, 0.77, 0.77, 1.0);
	this.materialChrome.setShininess(77);

	this.materialCyan = new CGFappearance(this);
	this.materialCyan.setAmbient(0.1, 0.18, 0.17, 0.8);
	this.materialCyan.setDiffuse(0.39, 0.74, 0.69, 0.8);
	this.materialCyan.setSpecular(0.29, 0.30, 0.30, 0.8);
	this.materialCyan.setShininess(13);
	
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
	
	//Init update cycle
	this.setUpdatePeriod(updateFreq);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {

	this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

	//Positions for four lights
	this.lights[0].setPosition(4.0, 6.0, 1.0, 1.0);
	this.lights[0].setVisible(true);

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true);

	this.lights[2].setPosition(0.1, 5.0, 7.5, 1.0);
	this.lights[2].setVisible(true);

	this.lights[0].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime - previousTime, updateFreq);
	this.paperPlane.update(currTime - previousTime, updateFreq);
	previousTime = currTime;
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
	
	//Clock
	this.pushMatrix();
	this.translate(7.25, 7.25, 0.0);
	this.scale(0.60, 0.60, 0.20);
	this.clockAppearance.apply();
	this.clock.display();
	this.popMatrix();
	
	//Prism Top
	this.pushMatrix();
	this.translate(14.0, 8.0, 14.0);
	this.scale(1.0, 8.0, 1.0);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.prismTop.display();
	this.popMatrix();

	//Cylinder Top
	this.pushMatrix();
	this.translate(1.05, 8.0, 14.0);
	this.scale(1.0, 8.0, 1.0);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.cylinderTop.display();
	this.popMatrix();
	
	this.gl.disable(this.gl.CULL_FACE);
	
	//Prism
	this.pushMatrix();
	this.translate(14.0, 0.0, 14.0);
	this.scale(1.0, 8.0, 1.0);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.prism.display();
	this.popMatrix();
	
	//Cylinder
	this.pushMatrix();
	this.translate(1.05, 0.0, 14.0);
	this.scale(1.0, 8.0, 1.0);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.cylinder.display();
	this.popMatrix();

	this.gl.enable(this.gl.CULL_FACE);
	
	//Floor
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.floorAppearance.apply();
	this.floor.display();
	this.popMatrix();

	//Left Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	this.windowAppearance.apply();
	this.windowWall.display();
	this.popMatrix();

	//Plane Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.materialCyan.apply();
	this.wall.display();
	this.popMatrix();

	//First Table
	this.pushMatrix();
	this.translate(5, 0, 8);
	this.table.display();
	this.popMatrix();

	this.gl.disable(this.gl.CULL_FACE);
	
	//Paper Plane
	this.pushMatrix();
	this.paperPlane.updatePos();
	this.paperPlane.display();
	this.popMatrix();
	
	this.gl.enable(this.gl.CULL_FACE);
	
	//Second Table
	this.pushMatrix();
	this.translate(12, 0, 8);
	this.table.display();
	this.popMatrix();

	//Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.slidesAppearance.apply();
	this.boardA.display();
	this.popMatrix();

	//Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};