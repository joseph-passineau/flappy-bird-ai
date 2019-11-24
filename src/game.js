import { GAME_HEIGHT, GAME_WIDTH, POPULATION_SIZE } from './constants';

import { Bird } from './bird';
import { Pipe } from './pipe';

let counter = 0;

export class Game {
	constructor(sketch) {
		this.sketch = sketch;
		this.birds = [];
		this.pipes = [];
		this.deadBirds = [];
	}

	setup() {
		this.sketch.createCanvas(GAME_WIDTH, GAME_HEIGHT);
		this.slider = this.sketch.createSlider(1, 10, 1);
		for (let i = 0; i < POPULATION_SIZE; i++) {
			this.birds[i] = new Bird(this.sketch);
		}
	}

	draw() {
		for (let n = 0; n < this.slider.value(); n++) {
			this.createNewPipe();
			this.detectColissions();

			for (let bird of this.birds) {
				bird.think(this.pipes);
				bird.update();
			}
		}
  
		this.sketch.background(0);
   
		for (let bird of this.birds) {
			bird.draw();
		}
  
		for (let pipe of this.pipes) {
			pipe.draw();
		}
	}

	createNewPipe() {
		if (counter % 75 == 0) {
			this.pipes.push(new Pipe(this.sketch));
		}
		counter++;
	}

	detectColissions() {
		for (let i = this.pipes.length - 1; i >= 0; i--) {
			this.pipes[i].update();
  
			for (let j = this.birds.length - 1; j >= 0; j--) {
				if (this.pipes[i].hits(this.birds[j])) {
					this.deadBirds.push(this.birds.splice(j, 1)[0]);
				}
			}
  
			if (this.pipes[i].offscreen()) {
				this.pipes.splice(i, 1);
			}
		}
  
		for (let i = this.birds.length - 1; i >= 0; i--) {
			if (this.birds[i].offScreen()) {
				this.deadBirds.push(this.birds.splice(i, 1)[0]);
			}
		}
	}
}