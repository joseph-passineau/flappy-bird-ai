import { GAME_HEIGHT } from './constants';

export class Bird {
	constructor(sketch) {
		this.sketch = sketch;
		this.y = GAME_HEIGHT / 2;
		this.x = 64;
  
		this.gravity = 0.8;
		this.lift = -12;
		this.velocity = 0;
	}
  
	draw() {
		this.sketch.stroke(255);
		this.sketch.fill(255, 100);
		this.sketch.ellipse(this.x, this.y, 32, 32);
	}
  
	up() {
		this.velocity += this.lift;
	}
  
	think(pipes) {
		if(Math.random() >= 0.9) {
			this.up();
		}
	}
  
	offScreen() {
		return this.y > GAME_HEIGHT || this.y < 0;
	}
  
	update() {
		this.score++;
  
		this.velocity += this.gravity;
		this.y += this.velocity;
	}
}