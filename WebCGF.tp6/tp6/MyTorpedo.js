/**
 * MyTorpedo
 *
 * Constructs a torpedo centered on the origin pointing in -XX.
 *
 * @see        MyCylinder
 * @see        MyLamp
 * @see        MyTrap
 * @see        MyUnitCubeQuad
 * @see        MyBezierPoint
 * @param      {number}  x          Coordinate on X axis.
 * @param      {number}  y          Coordinate on Y axis.
 * @param      {number}  z          Coordinate on Z axis.
 * @param      {number}  initAngle  Initial angle.
 * @param      {number}  id         Unique ID.
 */
function MyTorpedo(scene, x, y, z, initAngle, id) {
	
	CGFobject.call(this, scene);
	
	this.id = id;
	
	this.cylinder = new MyCylinder(this.scene, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the cylinder
	this.hemiSphere = new MyLamp(this.scene, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the hemisphere
	this.trap = new MyTrap(this.scene, 0, 1, 0, 1, false);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.bezier = new MyBezierPoint(this.scene);
	
	this.coords = vec3.fromValues(x, y, z);
	this.yaw = initAngle;
	this.previousCoords = vec3.fromValues(0, 0, 0);
	this.bezierTangent = vec3.fromValues(0, 0, 0);
	this.angleAnim = 0;
	this.currTarget = 0;
	this.distance = 0;
	this.animTime = 0;
	this.P1; this.P2; this.P3; this.P4;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {
	
	/**
	 * Torpedo constants for size
	 */

	var bodyCylW = 1.50;
	var bodyCylH = 0.35;
	var bodyCylD = 0.35;
	
	var bodySphereW = 0.40;
	var bodySphereH = 0.35;
	var bodySphereD = 0.35;

	var backDPlaneW = 0.30;
	var backDPlaneH = 0.15;
	var backDPlaneD = 1.50;
	
	var rudderW = 0.30;
	var rudderH = 1.50;
	var rudderD = 0.15;
	
	/**
	 * Torpedo position control
	 */
	
	this.scene.pushMatrix();
	this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);

	/**
	 * Calculate rotation of torpedo so its orientation coincides with Bezier tangent. Axis/angle representation is used.
	 * 
	 * Two vectors with the same origin can be rotated so one of them coincides with the other. The cosine of the angle
	 * between vectors can be calculated as the dot product of the normalized vectors, Math.acos gives angle in radians.
	 * The axis of rotation of two vectors can be calculated with the cross product since it gives a vector orthogonal to both vectors.
	 * In cases where the angle is 180, the cross product is 0 and there's an infinite number of orthogonal vectors.
	 */

	var torpedoInitOrient = vec3.fromValues(-1, 0, 0); //Torpedo initial orientation, -XX
	var angle = this.scene.vec3_angle(torpedoInitOrient, this.bezierTangent); //Angle between the initial orientation and the Bezier tangent
	
	//Draw vectors on screen
	this.scene.vec3_log(this.bezierTangent, this.coords, (this.id - 1) * 3);
	this.scene.vec3_log(torpedoInitOrient, this.coords, (this.id - 1) * 3 + 1);
	
	if(Math.abs(angle) < 0.001) { //Ignore very small angles
		
		this.scene.rotate(0, 0, 0, 1);
		this.scene.vec3_log(vec3.fromValues(0, 0, 1), this.coords, (this.id - 1) * 3 + 2);
	} else {

		var axis = vec3.create();
		this.scene.vec3_axis(axis, torpedoInitOrient, this.bezierTangent); //Calculate rotation axis of the two vectors
		
		//Draw rotation axis on screen
		this.scene.vec3_log(axis, this.coords, (this.id - 1) * 3 + 2);
		
		//After rotating, the torpedo axis coincides with the Bezier tangent, this can be used to make the torpedo rotate around its axis
		this.scene.rotate(this.angleAnim, this.bezierTangent[0], this.bezierTangent[1], this.bezierTangent[2]);
		
		if(axis[0] == 0 && axis[1] == 0 && axis[2] == 0) {
			this.scene.rotate(angle, 0, 1, 0); //If cross product is 0 any rotation axis orthogonal to initial orientation works, +YY is used
		} else this.scene.rotate(angle, axis[0], axis[1], axis[2]);
	}
	
	/**
	 * Torpedo body
	 */
	
	//Body cylinder
	this.scene.pushMatrix();
	this.scene.scale(bodyCylW, bodyCylH, bodyCylD);
	//Centering
	this.scene.translate(-0.5, 0.0, 0.0);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.cylinder.display();
	this.scene.popMatrix();
	
	//Body hemispheres
	this.scene.pushMatrix();
	this.scene.translate(-bodyCylW / 2.0 - bodySphereW / 2.0, 0.0, 0.0);
	this.scene.scale(bodySphereW, bodySphereH, bodySphereD);
	//Centering
	this.scene.translate(0.5, 0.0, 0.0);
	this.scene.rotate(Math.PI / 2, 0, 0, 1);
	this.hemiSphere.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 + bodySphereW / 2.0, 0.0, 0.0);
	this.scene.scale(bodySphereW, bodySphereH, bodySphereD);
	//Centering
	this.scene.translate(-0.5, 0.0, 0.0);
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.hemiSphere.display();
	this.scene.popMatrix();
	
	/**
	 * Torpedo diving planes / Rudder
	 */

    //Color torpedo fins differently if showing Bezier control points
	if(this.scene.Bezier_points) {
		var color = this.scene.color((this.id - 1) % 3);
		this.scene.vectorColor.setDiffuse(color[0], color[1], color[2], 1.0);
		this.scene.vectorColor.apply();
	}
	
	//Back diving plane
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 + backDPlaneW / 2.0, 0.0, 0.0);
	this.scene.scale(backDPlaneW, backDPlaneH, backDPlaneD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	this.trap.display();
	this.scene.popMatrix();
	
	//Rudder
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 + rudderW / 2.0, 0.0, 0.0);
	this.scene.scale(rudderW, rudderH, rudderD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.trap.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
	
	/**
	 * Torpedo Bezier control points
	 */
	
	if(!this.scene.Bezier_points) return;
	
	var pointScale = 0.35;
	
	this.scene.pushMatrix();
	this.scene.translate(this.P1[0], this.P1[1], this.P1[2]);
	this.scene.scale(pointScale, pointScale, pointScale);
	this.bezier.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(this.P2[0], this.P2[1], this.P2[2]);
	this.scene.scale(pointScale, pointScale, pointScale);
	this.bezier.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(this.P3[0], this.P3[1], this.P3[2]);
	this.scene.scale(pointScale, pointScale, pointScale);
	this.bezier.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(this.P4[0], this.P4[1], this.P4[2]);
	this.scene.scale(pointScale, pointScale, pointScale);
	this.bezier.display();
	this.scene.popMatrix();
};

/**
 * Sets the target.
 *
 * @param      {number}  target  Index of target in targets array.
 */
MyTorpedo.prototype.setTarget = function(target) {
	this.currTarget = target;
};

/**
 * Gets the target.
 *
 * @return     {number}  Index of target in targets array.
 */
MyTorpedo.prototype.getTarget = function() {
	return this.currTarget;
};

/**
 * Gets the id.
 *
 * @return     {number}  Unique ID.
 */
MyTorpedo.prototype.getID = function() {
	return this.id;
};

/**
 * Calculates straight line distance between torpedo and target, stores in torpedo member variables.
 */
MyTorpedo.prototype.distanceToTarget = function() {
	var tCoords = this.scene.targets[this.currTarget].getCoords();
	this.distance = Math.sqrt(Math.pow(this.coords[0] - tCoords[0], 2) + Math.pow(this.coords[1] - tCoords[1], 2) + Math.pow(this.coords[2] - tCoords[2], 2));
};

/**
 * Calculates control points for Bezier curve, stores in torpedo member variables.
 */
MyTorpedo.prototype.controlPoints = function() {
	
	var tCoords = this.scene.targets[this.currTarget].getCoords();
	this.P1 = vec3.fromValues(this.coords[0], this.coords[1], this.coords[2]); //Same as torpedo coords
	this.P2 = vec3.fromValues(this.P1[0] + 6 * Math.cos(this.yaw), this.coords[1], this.P1[2] + 6 * -Math.sin(this.yaw)) //6 units in front of the submarine
	this.P3 = vec3.fromValues(tCoords[0], tCoords[1] + 3, tCoords[2]); //3 units above target
	this.P4 = vec3.fromValues(tCoords[0], tCoords[1], tCoords[2]); //Same as target coords;
};

/**
 * Updates torpedo movement by using elapsed time since the last update.
 * 
 * @param      {number}  dTime       Seconds between updates.
 * @param      {number}  updateFreq  Frequency of update. (microseconds)
 */
MyTorpedo.prototype.updateMovement = function(dTime, updateFreq) {
	
	if(dTime * 1000 < updateFreq + 100) { //Remove very high values

		var animTimeInc = 1.0 / this.distance; //distance = total seconds of animation
		this.animTime = this.scene.clamp(this.animTime + animTimeInc * dTime, 0, 1); //Increment total animation time but clamp it to 1 at max
		this.previousCoords = vec3.fromValues(this.coords[0], this.coords[1], this.coords[2]);

		//Update torpedo coords according to Bezier curve
		this.calcBezier(this.animTime, 0);
		this.calcBezier(this.animTime, 1);
		this.calcBezier(this.animTime, 2);

		//Approximate Bezier tangent
		this.bezierTangent = vec3.fromValues(this.coords[0] - this.previousCoords[0], this.coords[1] - this.previousCoords[1], this.coords[2] - this.previousCoords[2]);

		//Torpedo animation update
		this.angleAnim += Math.PI / 6.0 * dTime;
		if(this.angleAnim >= 2 * Math.PI) {
			this.angleAnim -= 2 * Math.PI;
		}
	}
};

/**
 * Calculates Bezier curve coords.
 *
 * @param      {number}  currT   Current time in Bezier.
 * @param      {number}  index   Index of coord to update.
 */
MyTorpedo.prototype.calcBezier = function(currT, index) {

	this.coords[index] = Math.pow(1 - currT, 3) * this.P1[index] +
	                     3 * currT * Math.pow(1 - currT, 2) * this.P2[index] +
	                     3 * Math.pow(currT, 2) * (1 - currT) * this.P3[index] +
	                     Math.pow(currT, 3) * this.P4[index];
};

/**
 * Verifies if collision with target happened and returns index to target.
 *
 * @return     {number}  Index to target in targets array or -1 if no collision.
 */
MyTorpedo.prototype.verifyCollision = function() {

	//Verifies if torpedo is at the end of Bezier curve
	if(this.animTime >= 1.0) {
		return this.currTarget;
	} else return -1;
};