$(document).ready(function() {

	$('h1').css('margin-top', $(window).height() * 0.4);

	// Classes and Methods

	//////////////////////////
	// Class app
	//////////////////////////

	var App = function() {}

	App.prototype.getRandom = function(min, max) {
		return Math.random() * (max - min) + min;
	}

	//////////////////////////
	// Canvas Class
	//////////////////////////

	var Canvas = function(app) {

		App.call(this); // Inherit from the Canvas class		

		this.Canvas = document.getElementById('canvas');
		this.ctx = this.Canvas.getContext('2d');
		this.Canvas.width = $(window).width();
		this.Canvas.height = $(window).height();
		this.ParticleArray = this.generateArray(200);
		console.log(this.ParticleArray);

	}

	Canvas.prototype.generateArray = function(numberParticle) {
		var tab = [];
		for (var i = 0; i < numberParticle; i++) {
			tab[i] = new Particle(this);
		};
		return tab;
	};

	Canvas.prototype.drawArray = function() {

		this.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
		this.ParticleArray.forEach(function(e) {
			e.draw();
		});
	};

	Canvas.prototype.updateArray = function() {

		var $this = this;
		this.ParticleArray.forEach(function(e) {
			if (e.tween.progress() >= 0.95) {
				e.tween = TweenLite.to(e, app.getRandom(10, 15), {
					bezier: {
						curviness: 5,
						values: [{
							x: app.getRandom(0, $this.Canvas.width),
							y: app.getRandom(0, $this.Canvas.height)
						}, {
							x: app.getRandom(0, $this.Canvas.width),
							y: app.getRandom(0, $this.Canvas.height)
						}]
					},
					ease: Power1.easeInOut,
					x: e.giveDestinationX(),
					y: e.giveDestinationY()
				});
			}
		})
	};

	Canvas.prototype.loopArray = function() {

		this.drawArray();
		this.updateArray();
		window.requestAnimationFrame(this.loopArray.bind(this));
	}


	//////////////////////////
	// Class Particle
	//////////////////////////

	var Particle = function(canvas) {
		this.canvas = canvas;

		this.radius = Math.random() * 5;
		this.colors = ["#1460A8", "#3A8AC1", "#8CB8D8", "#F1F2F4", "#0C0A0D"];
		this.color = this.colors[Math.floor(Math.random() * 4)];
		this.x = Math.floor(Math.random() * this.canvas.Canvas.width);
		this.y = Math.floor(Math.random() * this.canvas.Canvas.height);

		this.tween = TweenLite.to(this, app.getRandom(10, 15), {
			bezier: {
				curviness: 5,
				values: [{
					x: app.getRandom(0, this.canvas.Canvas.width),
					y: app.getRandom(0, this.canvas.Canvas.height)
				}, {
					x: app.getRandom(0, this.canvas.Canvas.width),
					y: app.getRandom(0, this.canvas.Canvas.height)
				}]
			},
			ease: Power1.easeInOut,
			x: this.giveDestinationX(),
			y: this.giveDestinationY()
		});

		// Draw the Particle when instanced
		this.draw();

	};

	// Method which draw a Particle
	Particle.prototype.draw = function() {

		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		this.canvas.ctx.fillStyle = this.color;
		this.canvas.ctx.fill();

	}

	// Method wich return a new X position for the object
	Particle.prototype.giveDestinationX = function() {
		return Math.floor(Math.random() * this.canvas.Canvas.width);
	}

	// Method wich return a new Y position for the object
	Particle.prototype.giveDestinationY = function() {
		return Math.floor(Math.random() * this.canvas.Canvas.height);
	}

	// End of the class Particle

	var app = new App();
	var canvas = new Canvas();
	canvas.loopArray();

})