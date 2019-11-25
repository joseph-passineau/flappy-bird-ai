import { GAME_GRAVITY, GAME_HEIGHT } from './constants';

const BIRD_X_POSITION = 64;
const BIRD_LIFT = 12;

export class Bird {
	constructor(sketch) {
		this.sketch = sketch;
		this.reset();
	}

	dispose() {

	}
  
	draw() {
		this.sketch.stroke(255);
		this.sketch.fill(255, 100);
		this.sketch.ellipse(this.x, this.y, BIRD_X_POSITION / 2, BIRD_X_POSITION / 2);
	}
  
	up() {
		this.velocity += this.lift;
	}
  
	think() {
		if(Math.random() >= 0.9) {
			this.up();
		}
	}
  
	isOffScreen() {
		return this.y > GAME_HEIGHT || this.y < 0;
	}

	makeBaby() {
		return new Bird(this.sketch);
	}
  
	update() {
		this.score++;
  
		this.velocity += this.gravity;
		this.y += this.velocity;
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