import * as tf from '@tensorflow/tfjs';

import { GAME_HEIGHT, GAME_WIDTH, MAX_VELOCITY } from '../src/constants';

import { Bird } from '../src/bird';
import { Brain } from '../src/brain';

// The size of the population
// TODO: Should probably be a bit bigger
export const POPULATION_SIZE = 1;


/*
    Create the population
    It should consist of birds.
    A bird needs a brain.
    A brain is a Neural Network
*/
export function CreatePopulation() {

	// TODO: Iterate and create x number of birds.
	const birds = [];
	birds.push(new Bird());

	return birds;
}


/*
    Create the Tensorflow Model.
    This is what the brain needs, and a brain is what a bird needs.
*/
export function CreateModel() {

	// TODO: Nothing to do here. Move along
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
	
	Hint: 
		bird.velocity, bird.y, closestPipe.top, closestPipe.bottom, closestPipe.x
		Normalize it all
		Use bird.brain.predict()

*/
export function Think(bird, closestPipe) {

	// TODO: Create the inputs

	// TODO: Pass the inputs to the bird.brain.predict()

	// TODO: Determine if the bird should go up or do nothing
	if (Math.random() >= 0.9) {
		bird.up();
	}
} 