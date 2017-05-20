/**
 * MyExplosion
 *
 * Constructs a hemisphere that keeps increasing in size.
 *
 * @see        MyLamp
 * @param      {number}  x       Coordinate on X axis.
 * @param      {number}  y       Coordinate on Y axis.
 * @param      {number}  z       Coordinate on Z axis.
 */
function MyExplosion(scene, x, y, z) {
	
	CGFobject.call(this, scene);
	
	this.hemiSphere = new MyLamp(this.scene, 20, 20, 1, 1); //Distribute texture evenly throughout the surface of the hemisphere
	this.coords = vec3.fromValues(x, y, z);
	this.scaleFactor = vec3.fromValues(0.4, 0.4, 0.4);
	this.animSpeed = 0.55; //How much the scale factor increases per second
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {
	
	this.scene.pushMatrix();
	this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);
	this.scene.scale(this.scaleFactor[0], this.scaleFactor[1], this.scaleFactor[2]);
	this.hemiSphere.display();
	this.scene.popMatrix();
};

/**
 * Updates the hemisphere animation, increasing the scale factor according to the seconds elapsed since the last update.
 * Checks if animation is finished by checking against a limit scale factor.
 *
 * @param      {number}   dTime       Seconds between updates.
 * @param      {number}   updateFreq  Frequency of update. (microseconds)
 * @return     {boolean}  True if animation is finished.
 */
MyExplosion.prototype.update = function(dTime, updateFreq) {
	
	if(dTime * 1000 < updateFreq + 100) { //Remove very high values
		this.scaleFactor = vec3.fromValues(this.scaleFactor[0] + this.animSpeed * dTime, this.scaleFactor[1] + this.animSpeed * dTime, this.scaleFactor[2] + this.animSpeed * dTime);
	}
	if(this.scaleFactor[0] > 1.40) {
		return true;
	} else return false;
};