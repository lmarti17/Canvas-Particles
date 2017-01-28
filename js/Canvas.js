//////////////////////////
// Canvas Class
//////////////////////////

var Canvas = function(app) {

	this.canvas = {};
	this.init();

}

Canvas.prototype.init = function() {

	this.canvas.Canvas = document.getElementById('canvas');
	this.canvas.ctx = this.canvas.Canvas.getContext('2d');
	this.canvas.Canvas.width = document.documentElement.clientWidth;
	this.canvas.Canvas.height = document.documentElement.clientHeight;
	this.canvas.particleArray = this.generateArray(200);

	this.loopArray();
}

Canvas.prototype.generateArray = function(numberParticle) {
	var tab = [];
	for (var i = 0; i < numberParticle; i++) {
		tab[i] = new Particle(this.canvas);
	};
	return tab;
};

Canvas.prototype.drawArray = function() {

	this.canvas.ctx.clearRect(0, 0, this.canvas.Canvas.width, this.canvas.Canvas.height);
	this.canvas.particleArray.forEach(function(e) {
		e.draw();
	});
};

Canvas.prototype.updateArray = function() {

	this.canvas.particleArray.forEach(function(e) {
		if (e.properties.tween.progress() >= 0.95) {
			e.updatePosition();
		}
	})
};

Canvas.prototype.loopArray = function() {

	this.drawArray();
	this.updateArray();
	window.requestAnimationFrame(this.loopArray.bind(this));
}

// End of the class Canvas
