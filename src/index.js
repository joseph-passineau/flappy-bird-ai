import * as p5 from 'p5';
import * as tf from '@tensorflow/tfjs';

import { Game } from './game';

let mySketch;

new p5(sk => {
	mySketch = sk;
	tf.setBackend('cpu');
	let game = new Game();
	sk.setup = () => {	
		game.setup();
	};

	sk.draw = () => {
		game.draw();
	};
});

export const sketch = mySketch;