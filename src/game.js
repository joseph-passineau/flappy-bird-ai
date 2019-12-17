import { GAME_HEIGHT, GAME_MAX_TICKS, GAME_WIDTH } from './constants';
import { CreatePopulation, POPULATION_SIZE } from '../exercices/exercice1';
import { CalculateFitness, BirdSelection } from '../exercices/exercice2';

import { Pipe } from './pipe';
import { sketch } from './index';

export class Game {
	constructor() {
		this.birds = [];
		this.pipes = [];
		this.ticks = 0;
		this.generation = 1;
		this.bestScore = 0;
	}

	setup() {
		sketch.createCanvas(GAME_WIDTH, GAME_HEIGHT);
		this.slider = sketch.createSlider(1, 10, 1);
		this.birds = CreatePopulation();
	}

	draw() {
		const aliveBirds = this.birds.filter(bird => bird.isAlive);

		for (let n = 0; n < this.slider.value(); n++) {
			this.update();
			this.calculate();

			for (let bird of aliveBirds) {
				bird.think(this.pipes);
				bird.update();
			}
		}

		if (aliveBirds.length === 0 || this.ticks >= GAME_MAX_TICKS) {
			this.nextGeneration();
		}

		sketch.background(0);

		for (let bird of aliveBirds) {
			bird.draw();
		}

		for (let pipe of this.pipes) {
			pipe.draw();
		}

		sketch.text(`Generation ${this.generation}`, 0, 10);
		sketch.text(`Birds alive ${aliveBirds.length}`, 0, 30);
		sketch.text(`Score ${this.ticks}`, 0, 50);
		sketch.text(`Best Score ${this.bestScore}`, 0, 70);

		this.drawBirdsLegend();
	}

	drawBirdsLegend() {

		// Order by color
		var colorOrderedBirds = this.birds.map((bird, i) => {
			return { color: this.rgbToHsl([bird.red, bird.green, bird.blue]), index: i };
		}).sort((c1, c2) => {
			return c1.color[0] - c2.color[0];
		}).map((data) => {
			return this.birds[data.index];
		});

		sketch.noStroke();
		for (const [birdIndex, bird] of colorOrderedBirds.entries()) {
			if (bird.isAlive) {
				sketch.fill(bird.red, bird.green, bird.blue);
			}
			else {
				sketch.fill(0, 0);
			}
			sketch.rect(5, GAME_HEIGHT - 2 - (birdIndex * 2), 10, 2);

			sketch.fill(bird.red, bird.green, bird.blue);
			sketch.rect(0, GAME_HEIGHT - 2 - (birdIndex * 2), 5, 2);
		}
	}

	update() {
		if (this.ticks % 75 == 0) {
			this.pipes.push(new Pipe());
		}
		this.ticks++;

		for (let pipe of this.pipes) {
			pipe.update();
		}
	}

	calculate() {
		for (const [pipeIndex, pipe] of this.pipes.entries()) {
			for (const bird of this.birds) {
				if (pipe.hits(bird) || bird.isOffScreen()) {
					bird.isAlive = false;
				}
			}

			if (pipe.isOffScreen()) {
				this.pipes.splice(pipeIndex, 1);
			}
		}
	}

	nextGeneration() {
		this.generation++;

		if (this.bestScore < this.ticks) {
			this.bestScore = this.ticks;
		}

		CalculateFitness(this.birds);

		const newBirds = [];
		for (let i = 0; i < POPULATION_SIZE; i++) 
		{
			const chosenBird = BirdSelection(this.birds);
			const babyBird = chosenBird.makeBaby();
			newBirds.push(babyBird);
		}

		this.reset();
		this.birds = newBirds;
	}

	reset() {
		this.ticks = 0;
		this.pipes = [];
		for (const bird of this.birds) {
			bird.dispose();
		}
	}

	// https://stackoverflow.com/a/11923973/5115252
	rgbToHsl(color) {
		var r = color[0] / 255, g = color[1] / 255, b = color[2] / 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0;
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return new Array(h * 360, s * 100, l * 100);
	}
}