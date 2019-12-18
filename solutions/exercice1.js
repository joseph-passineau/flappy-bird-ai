import * as tf from '@tensorflow/tfjs';

import { GAME_HEIGHT, GAME_WIDTH, MAX_VELOCITY } from '../src/constants';

import { Bird } from '../src/bird';
import { Brain } from '../src/brain';

// The size of the population
export const POPULATION_SIZE = 100;

/*
    Create the population
    It should consist of birds.
    A bird needs a brain.
    A brain is a Neural Network
*/
export function CreatePopulation() {
	const birds = [];
	for (let i = 0; i < POPULATION_SIZE; i++) {
		const model = CreateModel();
		const brain = new Brain(model);
		birds.push(new Bird(brain));
	}

	return birds;
}

/*
    Create the Tensorflow Model.
    This is what the brain needs, and a brain is what a bird needs.
*/
export function CreateModel() {
	const model = tf.sequential();

	const hidden = tf.layers.dense({
		units: 8,
		inputShape: [5],
		activation: 'sigmoid'
	});
	model.add(hidden);

	const output = tf.layers.dense({
		units: 2,
		activation: 'softmax'
	});
	model.add(output);

	return model;
}

/*
    Make our bird see and use its brain.
    This is where we get game inputs and have the brain/model make a decision.
*/
export function Think(bird, closestPipe) {
	const inputs = [];
	inputs.push(bird.y / GAME_HEIGHT);
	inputs.push(closestPipe.top / GAME_HEIGHT);
	inputs.push(closestPipe.bottom / GAME_HEIGHT);
	inputs.push(closestPipe.x / GAME_WIDTH);
	inputs.push(bird.velocity / MAX_VELOCITY);

	const output = bird.brain.predict(inputs);
	if (output[0] > output[1]) {
		bird.up();
	}
} 