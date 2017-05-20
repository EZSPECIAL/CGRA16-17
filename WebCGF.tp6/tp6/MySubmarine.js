/**
 * MySubmarine
 *
 * Constructs a submarine centered on the origin pointing in -XX.
 *
 * @see        MyCylinder
 * @see        MyLamp
 * @see        MyCircle
 * @see        MyTrap
 * @see        MyUnitCubeQuad
 */
function MySubmarine(scene) {
	
	CGFobject.call(this, scene);
	
	this.cylinder = new MyCylinder(this.scene, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the cylinder
	this.hemiSphere = new MyLamp(this.scene, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the hemisphere
	this.circle = new MyCircle(this.scene, 20, 20);
	this.trap = new MyTrap(this.scene, 0, 1, 0, 1, false);
	this.cube = new MyUnitCubeQuad(this.scene);
	
	this.yaw = 0; //Rotation around Y axis
	this.propellerAngle = 0.0;
	this.pscopeHeight = 0.75;
	this.coords = vec3.fromValues(8.0, 5.0, 8.0);
	this.turningMult = 2.0; //Turning multiplier, 1.0 equals 1° per keypress
	this.moveMult = 0.0; //Current movement speed in units/second
	this.elevSpeed = 0.6; //Vertical movement speed
	this.state = {noAnim: 0, turnLeft: 1, turnRight: 2, upwards: 3, downwards: 4, pUp: 5, pDown: 6};
	this.currState = this.state.noAnim;
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
	
	/**
	 * Submarine constants for size
	 */

	var bodyCylW = 6.00;
	var bodyCylH = 1.20;
	var bodyCylD = 0.75;
	
	var bodySphereW = 1.10;
	var bodySphereH = 1.20;
	var bodySphereD = 0.75;
	
	var topCylW = 0.75;
	var topCylH = 1.80;
	var topCylD = 0.55;
	
	var pscopeTowerW = topCylW * 0.10;
	var pscopeTowerH = topCylH * this.pscopeHeight;
	var pscopeTowerD = topCylD * 0.10;
	
	var pscopeScopeW = topCylH * 0.75 * 0.15; //0.75 = max pscopeHeight
	var pscopeScopeH = pscopeTowerW;
	var pscopeScopeD = pscopeTowerD;
	
	var topDPlaneW = 0.60;
	var topDPlaneH = 0.15;
	var topDPlaneD = 2.00;
	
	var backDPlaneW = 0.60;
	var backDPlaneH = 0.15;
	var backDPlaneD = 3.00;
	
	var rudderW = 0.60;
	var rudderH = backDPlaneD * (2.25 / 1.80);
	var rudderD = 0.15;
	
	var propellerW = 0.40;
	var propellerH = 0.35;
	var propellerD = 0.35;
	
	var propellerPrismW = 0.070;
	var propellerPrismH = 0.070;
	var propellerPrismD = propellerD * 1.95;
	
	var propellerSphereW = 0.070;
	var propellerSphereH = propellerPrismH;
	var propellerSphereD = propellerPrismH;

	var propellerAdjust = 0.05;
	
	/**
	 * Submarine position control
	 */
	
	this.scene.pushMatrix();
	this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);
	this.scene.rotate(Math.PI + this.yaw, 0, 1, 0);

	/**
	 * Submarine body
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
	
	//Top cylinder
	this.scene.pushMatrix();
	this.scene.translate(-topCylW, bodyCylH, 0.0);
	this.scene.scale(topCylW, topCylH, topCylD);
	//Centering
	this.scene.translate(0.0, -0.5, 0.0);
	this.scene.rotate(Math.PI / 2, -1, 0, 0);
	this.cylinder.display();
	this.scene.popMatrix();
	
	//Top cylinder lid
	this.scene.pushMatrix();
	this.scene.translate(-topCylW, bodyCylH + topCylH / 2.0, 0.0);
	this.scene.scale(topCylW, topCylH, topCylD);
	//Centering
	this.scene.rotate(Math.PI / 2, -1, 0, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	/**
	 * Submarine periscope
	 */
	
	//Periscope tower
	this.scene.pushMatrix();
	this.scene.translate(pscopeTowerW / 2.0 - 1.50 * topCylW, pscopeTowerH / 2.0 + bodyCylH + topCylH / 2.0, 0.0);
	this.scene.scale(pscopeTowerW, pscopeTowerH, pscopeTowerD);
	//Centering
	this.scene.translate(0.0, -0.5, 0.0);
	this.scene.rotate(Math.PI / 2, -1, 0, 0);
	this.cylinder.display();
	this.scene.popMatrix();
	
	//Periscope tower lid
	this.scene.pushMatrix();
	this.scene.translate(pscopeTowerW / 2.0 - 1.50 * topCylW, pscopeTowerH + bodyCylH + topCylH / 2.0, 0.0);
	this.scene.scale(pscopeTowerW, pscopeTowerH, pscopeTowerD);
	//Centering
	this.scene.rotate(Math.PI / 2, -1, 0, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	//Periscope tower scope
	this.scene.pushMatrix();
	this.scene.translate(-pscopeScopeW / 2.0 + pscopeTowerW / 2.0 - 1.50 * topCylW, -pscopeScopeH + bodyCylH + topCylH / 2.0 + pscopeTowerH, 0.0);
	this.scene.scale(pscopeScopeW, pscopeScopeH, pscopeScopeD);
	//Centering
	this.scene.translate(0.5, 0.0, 0.0);
	this.scene.rotate(Math.PI / 2, 0, -1, 0);
	this.cylinder.display();
	this.scene.popMatrix();
	
	//Periscope scope lid
	this.scene.pushMatrix();
	this.scene.translate(-pscopeScopeW + pscopeTowerW / 2.0 - 1.50 * topCylW, -pscopeScopeH + bodyCylH + topCylH / 2.0 + pscopeTowerH, 0.0);
	this.scene.scale(pscopeScopeW, pscopeScopeH, pscopeScopeD);
	//Centering
	this.scene.rotate(Math.PI / 2, 0, -1, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	/**
	 * Submarine diving planes / Rudder
	 */
	
	//Top cylinder diving plane
	this.scene.pushMatrix();
	this.scene.translate(-topCylW / 2.0 - topDPlaneW / 2.0, topCylH / 2.0 + bodyCylH / 2.0 + topDPlaneH / 2.0, 0.0);
	if(this.currState == this.state.upwards) {
		this.scene.rotate(-Math.PI / 6, 0, 0, 1);
	} else if(this.currState == this.state.downwards) {
		this.scene.rotate(Math.PI / 6, 0, 0, 1);
	}
	this.scene.scale(topDPlaneW, topDPlaneH, topDPlaneD);
	//Centering
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.rotate(-Math.PI / 2, 1, 0, 0);
	this.trap.display();
	this.scene.popMatrix();
	
	//Back diving plane
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 + backDPlaneW / 2.0, 0.0, 0.0);
	if(this.currState == this.state.upwards) {
		this.scene.rotate(-Math.PI / 6, 0, 0, 1);
	} else if(this.currState == this.state.downwards) {
		this.scene.rotate(Math.PI / 6, 0, 0, 1);
	}
	this.scene.scale(backDPlaneW, backDPlaneH, backDPlaneD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	this.trap.display();
	this.scene.popMatrix();
	
	//Rudder
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 + rudderW / 2.0, 0.0, 0.0);
	if(this.moveMult != 0) {
		if(this.currState == this.state.turnLeft) {
			this.scene.rotate(-Math.PI / 6, 0, 1, 0);
		} else if(this.currState == this.state.turnRight) {
			this.scene.rotate(Math.PI / 6, 0, 1, 0);
		}
	}
	this.scene.scale(rudderW, rudderH, rudderD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.trap.display();
	this.scene.popMatrix();
	
	/**
	 * Submarine propeller
	 */
	
	this.scene.gl.disable(this.scene.gl.CULL_FACE);
	
	//Propeller cylinder #1
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0, -backDPlaneH - propellerH, bodyCylD + propellerD - propellerAdjust);
	this.scene.scale(propellerW, propellerH, propellerD);
	//Centering
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.translate(0.0, 0.0, -0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	
	//Propeller cylinder #2
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0, -backDPlaneH - propellerH, -bodyCylD - propellerD + propellerAdjust);
	this.scene.scale(propellerW, propellerH, propellerD);
	//Centering
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.translate(0.0, 0.0, -0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	
	this.scene.gl.enable(this.scene.gl.CULL_FACE);
	
	//Propeller prism #1
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0, -backDPlaneH - propellerH, bodyCylD + propellerD - propellerAdjust);
	this.scene.rotate(this.propellerAngle, 1, 0, 0);
	this.scene.scale(propellerPrismW, propellerPrismH, propellerPrismD);
	this.cube.display();
	this.scene.popMatrix();
	
	//Propeller sphere #1
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0 + propellerPrismW / 2.0, -backDPlaneH - propellerH + propellerPrismH / 2.0, bodyCylD + propellerD - propellerAdjust);
	this.scene.scale(propellerSphereW, propellerSphereH, propellerSphereD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.scene.translate(0.5, 0.0, 0.0);
	this.hemiSphere.display();
	this.scene.popMatrix();
	
	//Propeller sphere lid #1
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0 + propellerPrismW / 2.0, -backDPlaneH - propellerH, bodyCylD + propellerD - propellerAdjust);
	this.scene.scale(propellerSphereW, propellerSphereH, propellerSphereD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	//Propeller prism #2
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0, -backDPlaneH - propellerH, -bodyCylD - propellerD + propellerAdjust);
	this.scene.rotate(-this.propellerAngle, 1, 0, 0);
	this.scene.scale(propellerPrismW, propellerPrismH, propellerPrismD);
	this.cube.display();
	this.scene.popMatrix();

	//Propeller sphere #2
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0 + propellerPrismW / 2.0, -backDPlaneH - propellerH + propellerPrismH / 2.0, -bodyCylD - propellerD + propellerAdjust);
	this.scene.scale(propellerSphereW, propellerSphereH, propellerSphereD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 0, 1);
	this.scene.translate(0.5, 0.0, 0.0);
	this.hemiSphere.display();
	this.scene.popMatrix();
	
	//Propeller sphere lid #2
	this.scene.pushMatrix();
	this.scene.translate(bodyCylW / 2.0 - propellerW / 2.0 + propellerPrismW / 2.0, -backDPlaneH - propellerH, -bodyCylD - propellerD + propellerAdjust);
	this.scene.scale(propellerSphereW, propellerSphereH, propellerSphereD);
	//Centering
	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	this.circle.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
};

/**
 * Rotates submarine left if submarine isn't stopped.
 */
MySubmarine.prototype.rotateLeft = function() {
	
	if(Math.abs(this.moveMult) > 0) {
		this.yaw += this.turningMult * Math.PI / 180.0;

		//Clamp angle between 0 and 2 * Math.PI
		if(this.yaw > 2 * Math.PI) {
			this.yaw -= 2 * Math.PI;
		}
	}
};

/**
 * Rotates submarine right if submarine isn't stopped.
 */
MySubmarine.prototype.rotateRight = function() {
	
	if(Math.abs(this.moveMult) > 0) {
		this.yaw -= this.turningMult * Math.PI / 180.0;

		//Clamp angle between 0 and 2 * Math.PI
		if(this.yaw < -2 * Math.PI) {
			this.yaw += 2 * Math.PI;
		}
	}
};

/**
 * Increase submarine speed.
 */
MySubmarine.prototype.incSpeed = function() {
	this.moveMult += 0.5;
	this.moveMult = this.scene.clamp(this.moveMult, -3.0, 3.0);
};

/**
 * Decrease submarine speed.
 */
MySubmarine.prototype.decSpeed = function() {
	this.moveMult -= 0.5;
	this.moveMult = this.scene.clamp(this.moveMult, -3.0, 3.0);
};

/**
 * Updates submarine movement by using elapsed time since the last update.
 * 
 * @param      {number}  dTime       Seconds between updates.
 * @param      {number}  updateFreq  Frequency of update. (microseconds)
 */
MySubmarine.prototype.updateMovement = function(dTime, updateFreq) {

	if(dTime * 1000 < updateFreq + 100) { //Remove very high values
		
		//XZ Coords
		this.coords[0] += this.moveMult * Math.cos(this.yaw) * dTime;
		this.coords[2] += -this.moveMult * Math.sin(this.yaw) * dTime;
		
		//Elevation
		if(this.currState == this.state.upwards) {
			this.coords[1] += this.elevSpeed * dTime;
		} else if(this.currState == this.state.downwards) {
			this.coords[1] -= this.elevSpeed * dTime;
		}

		//Propeller
		this.propellerAngle += 2 * this.moveMult * 2 * Math.PI * dTime; //Min speed is 0.5 units/s so 2 * this.moveMult gives 1 rotation per second at that speed
		
		//Periscope
		if(this.currState == this.state.pUp) {
			this.pscopeHeight += this.elevSpeed * dTime;
		} else if(this.currState == this.state.pDown) {
			this.pscopeHeight -= this.elevSpeed * dTime;
		}
		this.pscopeHeight = this.scene.clamp(this.pscopeHeight, 0.10, 0.75); //Limits for periscope
	}
};

/**
 * Changes current state of the submarine.
 *
 * @param      {state}  state
 */
MySubmarine.prototype.stateM = function(state) {
	this.currState = state;
};

/**
 * Gets the coordinates.
 *
 * @return     {vec3}  Coordinates.
 */
MySubmarine.prototype.getCoords = function() {
	return this.coords;
}

/**
 * Gets the yaw.
 *
 * @return     {number}  Yaw in radians.
 */
MySubmarine.prototype.getYaw = function() {
	return this.yaw;
}