/**
 * MyInterface
 * @constructor
 */

function MyInterface() {
	
	CGFinterface.call(this);
	
	this.state = {noAnim: 0, turnLeft: 1, turnRight: 2, upwards: 3, downwards: 4, pUp: 5, pDown: 6};
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
	
	group.add(this.scene, 'Light_1');
	group.add(this.scene, 'Light_2');
	group.add(this.scene, 'Light_3');
	group.add(this.scene, 'Light_4');
	group.add(this.scene, 'Light_5');

	//GUI Dropdown box to control submarine texture
	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList);
	
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
	
	var keyCode = event.which || event.keyCode;

	switch (keyCode) {
	//a or A
	case (65):
	case (97):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	//d or D
	case (68):
	case (100):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	//l or L
	case (76):
	case (108):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	//p or P
	case (80):
	case (112):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	//q or Q
	case (81):
	case (113):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	//e or E
	case (69):
	case (101):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	};
};

MyInterface.prototype.processKeyDown = function(event) {
	
	var keyCode = event.which || event.keyCode;

	switch (keyCode) {
	//a or A
	case (65):
	case (97):
		this.scene.subEventNotify(this.state.turnLeft);
	break;
	//d or D
	case (68):
	case (100):
		this.scene.subEventNotify(this.state.turnRight);
	break;
	//l or L
	case (76):
	case (108):
		this.scene.subEventNotify(this.state.pDown);
	break;
	//p or P
	case (80):
	case (112):
		this.scene.subEventNotify(this.state.pUp);
	break;
	//q or Q
	case (81):
	case (113):
		this.scene.subEventNotify(this.state.upwards);
	break;
	//e or E
	case (69):
	case (101):
		this.scene.subEventNotify(this.state.downwards);
	break;
	};
};