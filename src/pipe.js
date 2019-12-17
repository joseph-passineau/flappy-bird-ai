import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import { sketch } from './index';

const PIPE_SPACING = 125;
const PIPE_SPEED = 6;
const PIPE_WIDTH = 80;

export class Pipe {
	constructor() {
		this.spacing = PIPE_SPACING;
		this.top = sketch.random(GAME_HEIGHT / PIPE_SPEED, (3 / 4) * GAME_HEIGHT);
		this.bottom = GAME_HEIGHT - (this.top + this.spacing);
		this.x = GAME_WIDTH;
		this.width = PIPE_WIDTH;
		this.speed = PIPE_SPEED;
	}
  
	hits(bird) {
		if (bird.y < this.top || bird.y > GAME_HEIGHT - this.bottom) {
			if (bird.x > this.x && bird.x < this.x + this.width) {
				return true;
			}
		}
		return false;
	}
  
	draw() {
		sketch.fill(255);
		sketch.rectMode(sketch.CORNER);
		sketch.rect(this.x, 0, this.width, this.top);
		sketch.rect(this.x, GAME_HEIGHT - this.bottom, this.width, this.bottom);
	}
  
	update() {
		this.x -= this.speed;
	}
  
	isOffScreen() {
		if (this.x < -this.width) {
			return true;
		} else {
			return false;
		}
	}
}