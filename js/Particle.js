//////////////////////////
// Class Particle
//////////////////////////

var Particle = function(canvas) {

	this.canvas = canvas;
	this.properties = {};
	this.init();

};

Particle.prototype.init = function() {

	this.properties.radius = Math.floor(Math.random() * 5);
	this.properties.colors = ["#1460A8", "#3A8AC1", "#8CB8D8", "#F1F2F4", "#0C0A0D"];
	this.properties.color = this.properties.colors[this.getRandom(0, 4)];
	this.properties.x = this.giveDestinationX();
	this.properties.y = this.giveDestinationY();
	this.updatePosition(); // Give tween when particle created

	// Draw the Particle when instanced
	this.draw();

}

// Method which draw a Particle
Particle.prototype.draw = function() {

	this.canvas.ctx.beginPath();
	this.canvas.ctx.arc(this.properties.x, this.properties.y, this.properties.radius, 0, 2 * Math.PI, false);
	this.canvas.ctx.fillStyle = this.properties.color;
	this.canvas.ctx.fill();

}

Particle.prototype.updatePosition = function() {

	var self = this;
	this.properties.tween = TweenLite.to(this.properties, this.getRandom(5, 10), {
		bezier: {
			curviness: 5,
			values: [{
				x: self.getRandom(0, self.canvas.Canvas.width),
				y: self.getRandom(0, self.canvas.Canvas.height)
			}, {
				x: self.getRandom(0, self.canvas.Canvas.width),
				y: self.getRandom(0, self.canvas.Canvas.height)
			}]
		},
		ease: Power1.easeInOut,
		x: self.getRandom(0, self.canvas.Canvas.width),
		y: self.getRandom(0, self.canvas.Canvas.height)
	});
}

// Method wich return a new X position for the object
Particle.prototype.giveDestinationX = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.width);
}

// Method wich return a new Y position for the object
Particle.prototype.giveDestinationY = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.height);
}

Particle.prototype.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// End of the class Particle