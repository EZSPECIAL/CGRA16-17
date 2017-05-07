/**
 * MyInterface
 * @constructor
 */

function MyInterface() {
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	
	//Call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	//Init GUI. For more information on the methods, check:
	//http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();
	
	//GUI Button for controlling clock animation
	
	this.gui.add(this.scene, 'Toggle_Clock');	

	//GUI Group to control lights
	
	var group = this.gui.addFolder("Lights");
	group.open();
	
	//Scene member variables
	
	group.add(this.scene, 'Light_1');
	group.add(this.scene, 'Light_2');
	group.add(this.scene, 'Light_3');
	group.add(this.scene, 'Light_4');
	group.add(this.scene, 'Light_5');

	//Add a slider
	//Must be a numeric variable of the scene, initialized in scene.init e.g.
	//this.speed=3;
	//min and max values can be specified as parameters

	//this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	
	var keyCode = event.which || event.keyCode;

	switch (keyCode) {
	//a or A
	case (65):
	case (97):
		this.scene.subRotateLeft();
	break;
	//d or D
	case (68):
	case (100):
		this.scene.subRotateRight();
	break;
	//w or W
	case (87):
	case (119):
		this.scene.subForward();
	break;
	//s or S
	case (83):
	case (115):
		this.scene.subBackward();
	break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	//stub
};

MyInterface.prototype.processKeyDown = function(event) {
	//stub
};