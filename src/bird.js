import { GAME_GRAVITY, GAME_HEIGHT, GAME_WIDTH, GAME_MAX_SCORE } from './constants';

import { Brain } from './brain';
import { sketch } from './index';

const BIRD_X_POSITION = 64;
const BIRD_LIFT = 12;
const BIRD_MUTATION_DECAY_RATE_PERCENTAGE = 0.1;
const BIRD_MUTATION_INITIAL_VALUE = 10;

export class Bird {
	constructor(brain) {
		if(brain){
			this.brain = brain;
		}
		else {
			this.brain = new Brain();
		}		
		this.reset();
	}

	dispose() {
		this.brain.dispose();
	}
  
	draw() {
		sketch.stroke(255);
		sketch.fill(255, 100);
		sketch.ellipse(this.x, this.y, BIRD_X_POSITION / 2, BIRD_X_POSITION / 2);
	}
  
	up() {
		this.velocity += this.lift;
	}
  
	think(pipes) {

		let closestPipe = null;
		let closestDistance = Infinity;
		for (const pipe of pipes) {
			const distance = pipe.x + pipe.width - this.x;
			if (distance < closestDistance && distance > 0) {
				closestPipe = pipe;
				closestDistance = distance;
			}
		}

		const inputs = [];
		inputs.push(this.y / GAME_HEIGHT); // y position
		inputs.push(closestPipe.top / GAME_HEIGHT); // pipe top position
		inputs.push(closestPipe.bottom / GAME_HEIGHT); // pipe bottom position
		inputs.push(closestPipe.x / GAME_WIDTH); // pipe x position
		inputs.push(this.velocity / 10); // bird velocity

		const output = this.brain.predict(inputs);
		if(output[0] > output[1]) {
			this.up();
		}
	}
  
	isOffScreen() {
		return this.y > GAME_HEIGHT || this.y < 0;
	}

	makeBaby() {
		const brain = this.brain.copy();
		const mutationRate = this.calculateMutationRate();
		brain.mutate(mutationRate);
		return new Bird(brain);
	}

	distanceToPipe(pipe) {
		return pipe.x + pipe.width - this.x;
	}
  
	update() {
		this.score++;
  
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	calculateMutationRate() {
		// Calculation rate using exponential Decay
		return (Math.pow((1-(BIRD_MUTATION_DECAY_RATE_PERCENTAGE/100)), this.score) * BIRD_MUTATION_INITIAL_VALUE) / 100;
	}

	reset() {
		this.y = GAME_HEIGHT / 2;
		this.x = BIRD_X_POSITION;
  
		this.gravity = GAME_GRAVITY;
		this.lift = BIRD_LIFT * -1;
		this.velocity = 0;
		this.score = 0;
		this.isAlive = true;
	}
}