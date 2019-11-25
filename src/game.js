import { GAME_HEIGHT, GAME_WIDTH, POPULATION_SIZE } from './constants';

import { Bird } from './bird';
import { Pipe } from './pipe';

let counter = 0;

export class Game {
	constructor(sketch) {
		this.sketch = sketch;
		this.birds = [];
		this.pipes = [];
	}

	setup() {
		this.sketch.createCanvas(GAME_WIDTH, GAME_HEIGHT);
		this.slider = this.sketch.createSlider(1, 10, 1);
		for (let i = 0; i < POPULATION_SIZE; i++) {
			this.birds.push(new Bird(this.sketch));
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

		this.sketch.background(0);
   
		for (let bird of aliveBirds) {
			bird.draw();
		}
  
		for (let pipe of this.pipes) {
			pipe.draw();
		}
	}

	update() {
		if (counter % 75 == 0) {
			this.pipes.push(new Pipe(this.sketch));
		}
		counter++;

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
		this.calculateFitness();
		this.birds = this.birds.sort((a, b) => (a.fitness < b.fitness) ? 1 : -1);

		const loosers = this.birds.splice(0, Math.ceil(this.birds.length / 2));

		for(const looser of loosers) {
			looser.dispose();
		}

		const babyBirds = [];
		for(const bird of this.birds) {
			const babyBird = bird.makeBaby();
			babyBirds.push(babyBird);
		}

		this.resetBirds();
		this.birds = this.birds.concat(babyBirds);
	}

	calculateFitness() {
		let sum = this.birds.reduce((previous, current) => previous + current.score, 0);

		for (const bird of this.birds) {
			bird.fitness = bird.score / sum;
		}
	}

	resetBirds() {
		for(const bird of this.birds) {
			bird.reset();
		}
	}
}