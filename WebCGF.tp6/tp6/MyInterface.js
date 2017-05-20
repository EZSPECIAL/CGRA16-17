/**
 * MyInterface
 *
 * Constructs a CGFInterface for handling keyboard/mouse input and GUI events.
 */
function MyInterface() {
	
	CGFinterface.call(this);
	
	this.state = {noAnim: 0, turnLeft: 1, turnRight: 2, upwards: 3, downwards: 4, pUp: 5, pDown: 6};
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
	
	//Call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

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
	
	//GUI Group to control additional info
	var group_debug = this.gui.addFolder("Info");
	
	group_debug.open();
	group_debug.add(this.scene, 'Bezier_tangent_RED');
	group_debug.add(this.scene, 'Init_orient_GREEN');
	group_debug.add(this.scene, 'Rotation_axis_BLUE');
	group_debug.add(this.scene, 'Bezier_points');

	//GUI Dropdown box to control submarine texture
	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList);
	
	return true;
};

/**
 * Handles received events.
 *
 * @param      {event}  event
 */
MyInterface.prototype.processKeyboard = function(event) {
	
	var keyCode = event.which || event.keyCode;

	switch(keyCode) {
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
		this.scene.subIncSpeed();
	break;
	//s or S
	case (83):
	case (115):
		this.scene.subDecSpeed();
	break;
	//f or F
	case (70):
	case (102):
		this.scene.spawnTorpedo();
	break;
	//r or R
	case (82):
	case (114):
		this.scene.resetTargets();
	break;
	};
};

/**
 * Handles released keyboard keys events.
 *
 * @param      {event}  event
 */
MyInterface.prototype.processKeyUp = function(event) {
	
	var keyCode = event.which || event.keyCode;

	switch(keyCode) {
	//Any of the mapped keys is released
	case (65):
	case (97):
	case (68):
	case (100):
	case (76):
	case (108):
	case (80):
	case (112):
	case (81):
	case (113):
	case (69):
	case (101):
		this.scene.subEventNotify(this.state.noAnim);
	break;
	};
};

/**
 * Handles pressed keyboard keys events.
 *
 * @param      {event}  event
 */
MyInterface.prototype.processKeyDown = function(event) {
	
	var keyCode = event.which || event.keyCode;

	switch(keyCode) {
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