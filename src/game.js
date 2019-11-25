import { GAME_HEIGHT, GAME_WIDTH, POPULATION_SIZE } from './constants';

import { Bird } from './bird';
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
		for (let i = 0; i < POPULATION_SIZE; i++) {
			this.birds.push(new Bird());
		}
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
  
		if(aliveBirds.length === 0) {
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

		if(this.bestScore < this.ticks){
			this.bestScore = this.ticks;
		}

		this.calculateFitness();
		this.birds = this.birds.sort((a, b) => (a.fitness > b.fitness) ? 1 : -1);

		const loosers = this.birds.splice(0, Math.ceil(this.birds.length / 2));

		for(const looser of loosers) {
			looser.dispose();
		}

		const babyBirds = [];
		for(const bird of this.birds) {
			const babyBird = bird.makeBaby();
			babyBirds.push(babyBird);
		}

		this.reset();
		this.birds = this.birds.concat(babyBirds);
	}

	calculateFitness() {
		let sum = this.birds.reduce((previous, current) => previous + current.score, 0);

		for (const bird of this.birds) {
			bird.fitness = bird.score / sum;
		}
	}

	reset() {
		this.ticks = 0;
		this.pipes = [];
		for(const bird of this.birds) {
			bird.reset();
		}
	}
}