/**
 * MyClock
 * @constructor
 */

function MyClock(scene) {
	
	CGFobject.call(this, scene);
	this.clock = new MyCylinder(this.scene, 12, 1);
	this.clockTop = new MyCircle(this.scene, 12);
	this.clockSeconds = new MyClockHand(this.scene);
	this.clockMinutes = new MyClockHand(this.scene);
	this.clockHours = new MyClockHand(this.scene);
	
	var currDate = new Date(); 
	
	this.clockSeconds.setAngle(currDate.getSeconds() * 1.0 / 60.0 * 360.0);
	this.clockMinutes.setAngle(currDate.getMinutes() * 1.0 / 60.0 * 360.0);
	if(currDate.getHours() > 12) {
		this.clockHours.setAngle((currDate.getHours() - 12) * 1.0 / 12.0 * 360.0);
	} else this.clockHours.setAngle(currDate.getHours() * 1.0 / 12.0 * 360.0);
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

	//Clock
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1.0);
	this.clockTop.display();
	this.scene.popMatrix();
	
	//Clock seconds-hand
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1.05);
	this.clockSeconds.rotateAngle();
	this.scene.scale(0.065, 0.80, 1.0);
	this.scene.clockHandBlack.apply();
	this.clockSeconds.display();
	this.scene.popMatrix();
	
	//Clock minutes-hand
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1.04);
	this.clockMinutes.rotateAngle();
	this.scene.scale(0.065, 0.40, 1.0);
	this.scene.clockHandBlack.apply();
	this.clockMinutes.display();
	this.scene.popMatrix();
	
	//Clock hours-hand
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1.03);
	this.clockHours.rotateAngle();
	this.scene.scale(0.065, 0.40, 1.0);
	this.scene.clockHandYellow.apply();
	this.clockHours.display();
	this.scene.popMatrix();
	
	this.scene.materialDefault.apply();
	
	//Clock cylinder
	this.clock.display();
};

MyClock.prototype.update = function(currTime, updateFreq) {
	
	if(currTime < updateFreq + 100) { //Remove very high values
		this.clockSeconds.setAngle(this.clockSeconds.getAngle() + 1.0 / 60.0 * 360.0 * (currTime / 1000));
		this.clockMinutes.setAngle(this.clockMinutes.getAngle() + 1.0 / 60.0 / 60.0 * 360.0 * (currTime / 1000));
		this.clockHours.setAngle(this.clockHours.getAngle() + 1.0 / 60.0 / 60.0 / 12.0 * 360.0 * (currTime / 1000));
	}
};