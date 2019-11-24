import * as p5 from 'p5';

import { GAME_HEIGHT, GAME_WIDTH, POPULATION_SIZE } from './constants';

import { Bird } from './bird';
import { Pipe } from './pipe';

let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;

class App {
	constructor(sketch) {
		this.sketch = sketch;
    
	}

	setup(){
		this.sketch.createCanvas(GAME_WIDTH, GAME_HEIGHT);
		this.slider = this.sketch.createSlider(1, 10, 1);
		for (let i = 0; i < POPULATION_SIZE; i++) {
			birds[i] = new Bird(this.sketch);
		}
	}

	draw(){
		for (let n = 0; n < this.slider.value(); n++) {
			this.createNewPipe();
			this.detectColissions();

			for (let bird of birds) {
				bird.think(pipes);
				bird.update();
			}
		}
  
		this.sketch.background(0);
   
		for (let bird of birds) {
			bird.draw();
		}
  
		for (let pipe of pipes) {
			pipe.draw();
		}
	}

	createNewPipe() {
		if (counter % 75 == 0) {
			pipes.push(new Pipe(this.sketch));
		}
		counter++;
	}

	detectColissions() {
		for (let i = pipes.length - 1; i >= 0; i--) {
			pipes[i].update();
  
			for (let j = birds.length - 1; j >= 0; j--) {
				if (pipes[i].hits(birds[j])) {
					savedBirds.push(birds.splice(j, 1)[0]);
				}
			}
  
			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
			}
		}
  
		for (let i = birds.length - 1; i >= 0; i--) {
			if (birds[i].offScreen()) {
				savedBirds.push(birds.splice(i, 1)[0]);
			}
		}
	}
}

new p5(sketch => {
	let app;
	sketch.setup = () => {
		app = new App(sketch);
		app.setup();
	};

	sketch.draw = () => {
		app.draw();
	};
});