import { GAME_HEIGHT, GAME_WIDTH } from './constants';

const PIPE_SPACING = 125;
const PIPE_SPEED = 6;
const PIPE_WIDTH = 80;

export class Pipe {
	constructor(sketch) {
		this.sketch = sketch;
		this.spacing = PIPE_SPACING;
		this.top = this.sketch.random(GAME_HEIGHT / PIPE_SPEED, (3 / 4) * GAME_HEIGHT);
		this.bottom = GAME_HEIGHT - (this.top + this.spacing);
		this.x = GAME_WIDTH;
		this.w = PIPE_WIDTH;
		this.speed = PIPE_SPEED;
	}
  
	hits(bird) {
		if (bird.y < this.top || bird.y > GAME_HEIGHT - this.bottom) {
			if (bird.x > this.x && bird.x < this.x + this.w) {
				return true;
			}
		}
		return false;
	}
  
	draw() {
		this.sketch.fill(255);
		this.sketch.rectMode(this.sketch.CORNER);
		this.sketch.rect(this.x, 0, this.w, this.top);
		this.sketch.rect(this.x, GAME_HEIGHT - this.bottom, this.w, this.bottom);
	}
  
	update() {
		this.x -= this.speed;
	}
  
	isOffScreen() {
		if (this.x < -this.w) {
			return true;
		} else {
			return false;
		}
	}
}