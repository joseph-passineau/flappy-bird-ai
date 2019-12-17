import { GAME_GRAVITY, GAME_HEIGHT } from './constants';

import { sketch } from './index';
import { Think } from '../exercices/exercice1';
import { MakeBaby } from '../exercices/exercice2';
import { Mutate } from '../exercices/exercice3';

const BIRD_X_POSITION = 64;
const BIRD_LIFT = 12;

export class Bird {
	constructor(brain) {
		this.brain = brain;	
		this.reset();
		this.red = Math.floor(Math.random()*256);
		this.green = Math.floor(Math.random()*256);
		this.blue = Math.floor(Math.random()*256);
	}

	dispose() {
		if(this.brain)
		{
			this.brain.dispose();
		}
	}
  
	draw() {
		sketch.stroke(255);
		sketch.fill(this.red, this.green, this.blue);
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

		Think(this, closestPipe);
	}
  
	isOffScreen() {
		return this.y > GAME_HEIGHT || this.y < 0;
	}

	makeBaby() {
		const babyBird = MakeBaby(this);
		Mutate(babyBird);
		babyBird.red = this.red;
		babyBird.green = this.green;
		babyBird.blue = this.blue;
		babyBird.changeColor();

		return babyBird;
	}

	distanceToPipe(pipe) {
		return pipe.x + pipe.width - this.x;
	}
  
	update() {
		this.score++;
  
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	changeColor() {
		const colorToChange = Math.floor(Math.random() * 3) + 1;
		const colorChange = Math.random() < 0.5 ? -1 : 1;

		switch(colorToChange){
		case 1:
			this.red + colorChange;
			break;
		case 2:
			this.blue + colorChange;
			break;
		case 3:
			this.green + colorChange;
			break;
		}
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