import * as p5 from 'p5';

import { Game } from './game';

new p5(sketch => {
	let game = new Game(sketch);
	sketch.setup = () => {	
		game.setup();
	};

	sketch.draw = () => {
		game.draw();
	};
});