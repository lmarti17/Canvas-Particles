//////////////////////////
// Class app
//////////////////////////

var App = function() {

	this.init();
}

App.prototype.init = function() {
	this.canvas = new Canvas();
}

$(document).ready(function() {

	var app = new App();

})