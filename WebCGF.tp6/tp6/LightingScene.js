var degToRad = Math.PI / 180.0;
var previousTime = 0;
var updateFreq = 16.67; //60 FPS

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
	this.cylinder = new MyCylinder(this, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the cylinder
	this.cylinderTop = new MyCircle(this, 20);
	this.clock = new MyClock(this);
	this.clockBack = new MyCircle(this, 12);
	this.submarine = new MySubmarine(this);
	this.targets = [];
	this.targets.push(new MyTarget(this, 1.0, 0.1, 15));
	this.targets.push(new MyTarget(this, 15, 0.1, 1.0));
	this.targets.push(new MyTarget(this, 15, 0.1, 15));
	this.torpedos = [];
	this.explosions = [];
	this.vectors = [];

	// Materials
	this.materialDefault = new CGFappearance(this);
	this.vectorColor = new CGFappearance(this);
	
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
	
	this.targetAppearance = new CGFappearance(this);
	this.targetAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.targetAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
	this.targetAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.targetAppearance.setShininess(10);
	this.targetAppearance.loadTexture("../resources/images/target.png");
	
	this.explosionAppearance = new CGFappearance(this);
	this.explosionAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.explosionAppearance.setDiffuse(0.45, 0.45, 0.45, 1.0);
	this.explosionAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.explosionAppearance.setShininess(10);
	this.explosionAppearance.loadTexture("../resources/images/explosion.jpg");
	
	this.submarineAppearances = [];
	
	this.subMetal = new CGFappearance(this);
	this.subMetal.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.subMetal.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.subMetal.setSpecular(0.55, 0.55, 0.55, 1.0);
	this.subMetal.setShininess(120);
	this.subMetal.loadTexture("../resources/images/metal.jpg");
	
	this.subGrid = new CGFappearance(this);
	this.subGrid.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.subGrid.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.subGrid.setSpecular(0.55, 0.55, 0.55, 1.0);
	this.subGrid.setShininess(120);
	this.subGrid.loadTexture("../resources/images/rust.jpg");
	
	this.subCamo = new CGFappearance(this);
	this.subCamo.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.subCamo.setDiffuse(0.55, 0.55, 0.55, 1.0);
	this.subCamo.setSpecular(0.25, 0.25, 0.25, 1.0);
	this.subCamo.setShininess(20);
	this.subCamo.loadTexture("../resources/images/camo.png");
	
	this.submarineAppearances.push(this.materialDefault);
	this.submarineAppearances.push(this.subMetal);
	this.submarineAppearances.push(this.subCamo);
	this.submarineAppearances.push(this.subGrid);
	
	//Interface options
	//Button
	this.doClock = true;
	
	//Group - lights control
	this.Light_1 = true;
	this.Light_2 = true;
	this.Light_3 = true;
	this.Light_4 = true;
	this.Light_5 = true;
	
	//Group - info control
	this.Bezier_tangent_RED = true;
	this.Init_orient_GREEN = true;
	this.Rotation_axis_BLUE = true;
	this.Bezier_points = true;
	
	//Dropdown
	this.submarineAppearanceList = {Default: 0, Metal: 1, Camo: 2, Rust: 3};
	this.currSubmarineAppearance = 3;
	
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

/**
 * Updates every scene element.
 *
 * @param      {number}  currTime  The current system time.
 */
LightingScene.prototype.update = function(currTime) {

    //Update clock
	if(this.doClock) this.clock.update(currTime - previousTime, updateFreq);

    //Update submarine
	this.submarine.updateMovement((currTime - previousTime) / 1000.0, updateFreq);
	
	//Update torpedos
	for(i = 0; i < this.torpedos.length; i++) {

		if(this.torpedos[i] == undefined) continue; //Skip deleted torpedos

		this.torpedos[i].updateMovement((currTime - previousTime) / 1000.0, updateFreq);
		var explodeIndex = this.torpedos[i].verifyCollision();

		//If collision happened
		if(explodeIndex != -1) {

			var eCoords = this.targets[explodeIndex].getCoords();
			this.explosions.push(new MyExplosion(this, eCoords[0], eCoords[1], eCoords[2]));
			
			//Deactivate vectors corresponding to deleted torpedo
			var id = this.torpedos[i].getID() - 1;
			this.vectors[id * 3].setActive(false);
			this.vectors[id * 3 + 1].setActive(false);
			this.vectors[id * 3 + 2].setActive(false);

            //Delete torpedo and target
			delete this.targets[this.torpedos[i].getTarget()];
			delete this.torpedos[i];
		}
	}
	
	//Updates explosions
	var newExplosions = [];
	for(i = 0; i < this.explosions.length; i++) {

		var endAnim = this.explosions[i].update((currTime - previousTime) / 1000.0, updateFreq);

		//Keep explosions that haven't ended
		if(!endAnim) newExplosions.push(this.explosions[i]);
	}
	
	this.explosions = newExplosions;
	previousTime = currTime;
};

/**
 * Resets targets, torpedos and vectors to initial state.
 */
LightingScene.prototype.resetTargets = function() {

	var found = 0;

	//Counts amount of targets destroyed
	for(i = 0; i < this.targets.length; i++) {
		if(this.targets[i] == undefined) found++;
	}

	//If targets destroyed equals the total amount of targets then resets
	if(found == this.targets.length) {

		var newTargets = [];
		newTargets.push(new MyTarget(this, 1.0, 0.1, 15));
		newTargets.push(new MyTarget(this, 15, 0.1, 1.0));
		newTargets.push(new MyTarget(this, 15, 0.1, 15));
		this.targets = newTargets;
		this.torpedos = [];
		this.vectors = [];
	}
};

/**
 * Toggles clock animation.
 */
LightingScene.prototype.Toggle_Clock = function() {
	this.doClock = !this.doClock;
};

/**
 * Calls submarine rotate left method.
 */
LightingScene.prototype.subRotateLeft = function() {
	this.submarine.rotateLeft();
};

/**
 * Calls submarine rotate right method.
 */
LightingScene.prototype.subRotateRight = function() {
	this.submarine.rotateRight();
};

/**
 * Calls submarine increment speed method.
 */
LightingScene.prototype.subIncSpeed = function() {
	this.submarine.incSpeed();
};

/**
 * Calls submarine decrement speed method.
 */
LightingScene.prototype.subDecSpeed = function() {
	this.submarine.decSpeed();
};

/**
 * Notifies submarine of state changes.
 *
 * @param      {event}  event
 */
LightingScene.prototype.subEventNotify = function(event) {
	this.submarine.stateM(event);
};

/**
 * Spawns torpedo below submarine, assigns a target and ID to it.
 */
LightingScene.prototype.spawnTorpedo = function() {

	//Don't allow more torpedos than targets
	if(this.targets.length > this.torpedos.length) {

		var nextID = this.nextID(); //Next unused torpedo ID

		this.torpedos.push(new MyTorpedo(this, this.submarine.getCoords()[0], this.submarine.getCoords()[1] - 1.20 - 0.35, this.submarine.getCoords()[2], this.submarine.getYaw(), nextID));
		this.torpedos[this.torpedos.length - 1].setTarget(this.torpedos.length - 1);
		this.torpedos[this.torpedos.length - 1].distanceToTarget();
		this.torpedos[this.torpedos.length - 1].controlPoints();

		//Failsafe so vectors are guaranteed to be active when needed by the torpedo
		if(!(this.vectors[(nextID - 1) * 3] == undefined)) {
			this.vectors[(nextID - 1) * 3].setActive(true);
			this.vectors[(nextID - 1) * 3 + 1].setActive(true);
			this.vectors[(nextID - 1) * 3 + 2].setActive(true);
		}
	}
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
	this.submarineAppearances[this.currSubmarineAppearance].apply();
	this.submarine.display();
	this.popMatrix();
	
	//Targets
	this.pushMatrix();
	this.targetAppearance.apply();
	for(i = 0; i < this.targets.length; i++) {
		if(this.targets[i] == undefined) continue;
		this.targets[i].display();
	}
	this.popMatrix();
	
	//Torpedos
	this.pushMatrix();
	this.materialDefault.apply();
	for(i = 0; i < this.torpedos.length; i++) {
		if(this.torpedos[i] == undefined) continue;
		this.submarineAppearances[this.currSubmarineAppearance].apply();
		this.torpedos[i].display();
	}
	this.popMatrix();
	
	//Explosions
	this.pushMatrix();
	this.explosionAppearance.apply();
	for(i = 0; i < this.explosions.length; i++) {
		this.explosions[i].display();
	}
	this.popMatrix();
	
	//Vectors
	this.pushMatrix();
	this.materialDefault.apply();
	for(i = 0; i < this.vectors.length; i++) {
		if(i % 3 == 0 && !this.Bezier_tangent_RED) continue;
		if(i % 3 == 1 && !this.Init_orient_GREEN) continue;
		if(i % 3 == 2 && !this.Rotation_axis_BLUE) continue;
		this.vectors[i].display();
	}
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
	this.materialDefault.apply();
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

//---------------------------------
//
// Helper functions
// 
//---------------------------------

/**
 * Clamps a value between min and max.
 *
 * @param      {number}  x       Number to clamp.
 * @param      {number}  minVal  The minimum value.
 * @param      {number}  maxVal  The maximum value.
 * @return     {number}  Clamped value.
 */
LightingScene.prototype.clamp = function(x, minVal, maxVal) {
	return Math.min(Math.max(x, minVal), maxVal);
};

/**
 * Calculates the angle between two 3D vectors.
 *
 * @param      {vec3}  vec3_a  Vector a.
 * @param      {vec3}  vec3_b  Vector b.
 * @return     {number}  Angle in radians.
 */
LightingScene.prototype.vec3_angle = function(vec3_a, vec3_b) {
	
    var tempA = vec3.fromValues(vec3_a[0], vec3_a[1], vec3_a[2]);
    var tempB = vec3.fromValues(vec3_b[0], vec3_b[1], vec3_b[2]);
    
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
    
    var cosine = vec3.dot(tempA, tempB);
    
    return Math.acos(cosine);
};

/**
 * Calculates the rotation axis between two 3D vectors.
 *
 * @param      {vec3}  vec3_result  The rotation axis returned.
 * @param      {vec3}  vec3_a       Vector a.
 * @param      {vec3}  vec3_b       Vector b.
 * @return     {vec3}  Rotation axis.
 */
LightingScene.prototype.vec3_axis = function(vec3_result, vec3_a, vec3_b) {
	
    var tempA = vec3.fromValues(vec3_a[0], vec3_a[1], vec3_a[2]);
    var tempB = vec3.fromValues(vec3_b[0], vec3_b[1], vec3_b[2]);
    
    vec3.cross(vec3_result, vec3_a, vec3_b);
    vec3.normalize(vec3_result, vec3_result);
    
    return vec3_result;
};

/**
 * Logs a vector as a MyVector scene element.
 *
 * @param      {vec3}  vec3_a       Vector to log.
 * @param      {vec3}  vec3_coords  Object coordinates to which the vector belongs.
 * @param      {number}  index      Index in vectors array to use.
 */
LightingScene.prototype.vec3_log = function(vec3_a, vec3_coords, index) {

	if(index < 0) return;

	if(this.vectors.length - 1 >= index) {
		this.vectors[index].updateVec(vec3_a, vec3_coords); //Update vector if index exists
	} else {
		this.vectors.push(new MyVector(this, vec3_a, vec3_coords, this.color(index % 3))); //Create new vector if index doesn't exist
	}
};

/**
 * Common colors.
 *
 * @param      {number/string}  color   Color by index or name.
 * @return     {vec3}           Color.
 */
LightingScene.prototype.color = function(color) {

	switch(color) {
	case "red":
	case 0:
		return vec3.fromValues(255, 0, 0);
	break;
	case "green":
	case 1:
		return vec3.fromValues(0, 255, 0);
	break;
	case "blue":
	case 2:
		return vec3.fromValues(0, 0, 255);
	break;
	default:
		return vec3.fromValues(0, 0, 0);
	break;
	}
};

/**
 * Checks next available ID for torpedos.
 *
 * @return     {number}  ID available.
 */
LightingScene.prototype.nextID = function() {

	var i = 0;

	//Finds first free index in torpedos array
	for(i; i < this.torpedos.length; i++) {
		if(this.torpedos[i] == undefined) {
			return i + 1;
		}
	}
	
	return i + 1; //If no free index, returns current max ID + 1
};