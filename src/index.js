import * as p5 from 'p5';

import { Game } from './game';

new p5(sketch => {
	let game;
	sketch.setup = () => {
		game = new Game(sketch);
		game.setup();
	};

	sketch.draw = () => {
		game.draw();
	};
});