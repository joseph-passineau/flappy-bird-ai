import { GAME_HEIGHT, GAME_WIDTH } from './constants';

export class Pipe {
	constructor(sketch) {
		this.sketch = sketch;
		this.spacing = 125;
		this.top = this.sketch.random(GAME_HEIGHT / 6, (3 / 4) * GAME_HEIGHT);
		this.bottom = GAME_HEIGHT - (this.top + this.spacing);
		this.x = GAME_WIDTH;
		this.w = 80;
		this.speed = 6;
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
  
	offscreen() {
		if (this.x < -this.w) {
			return true;
		} else {
			return false;
		}
	}
}