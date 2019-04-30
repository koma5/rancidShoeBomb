import * as d3 from 'd3';

class CirclesThing {
	constructor(options = {}) {
		Object.assign(this, {
			size: 300,
			steps: 15,
			seed: '',
			circleCountBoundary: [15, 20],
			colorPalette: ['#CF6EC5', '#45246B', '#A3E0D4', '#A6DB94'],
			radiusStepsBoundary: [1, 3]

		}, options);

		this.hashSeed = this.hashOfSeed(this.seed)();

		this.stepSize = this.size / this.steps;
		this.circleCount = this.getRandomInt(...this.circleCountBoundary);

		this.circlesData = []
		this.generateCirclesData();

	}

	generateCirclesData () {

		for (var i = this.circleCount; i > 0; i--) {

			var radiusSteps = this.getRandomInt(...this.radiusStepsBoundary);

			this.circlesData.push({
				x: this.getRandomInt(0, this.steps) * this.stepSize,
				y: this.getRandomInt(0, this.steps) * this.stepSize,
				radius: radiusSteps * this.stepSize,
				color: this.getRandomFromPalette()
			});

		}
	}

	draw() {

        this.svgElement = d3.select(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

		this.svgElement
			.attr("width", this.size)
			.attr("height", this.size);

		this.circles = this.svgElement.selectAll("circle")
			.data(this.circlesData)
			.enter()
			.append("circle");


		this.circleAttributes = this.circles
			.attr("cx", function(d) {return d.x;})
			.attr("cy", function(d) {return d.y;})
			.attr("r", function(d) {return d.radius;})
			.style("fill", function(d) {return d.color;})
			.style("opacity", 0.7);

	}

    addToBody() {
        document.body.appendChild(this.svgElement._groups[0][0]);
    }


	getRandomFromPalette() {
		return this.colorPalette[this.getRandomInt(0, this.colorPalette.length -1)];
	}

	getRandomInt(min, max) {
		/* if class is seeded use built in PRNG else use javascript random number generator */
		if (this.seed !== '') {
			var rand = this.mulberryPrng();
		}
		else {
			var rand = Math.random();
		}

		return Math.floor(rand * (max - min + 1) ) + min;
	}

	mulberryPrng() {
		/* thanks to bryc from stackoverflow https://stackoverflow.com/a/47593316 */
		var t = this.hashSeed += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}

	hashOfSeed(str) {
		for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
		h = h << 13 | h >>> 19;
		return function() {
			h = Math.imul(h ^ h >>> 16, 2246822507);
			h = Math.imul(h ^ h >>> 13, 3266489909);
			return (h ^= h >>> 16) >>> 0;
		}
	}



}

export default CirclesThing;
