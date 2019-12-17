import { Bird } from '../src/bird';
import { Brain } from '../src/brain';
import { GAME_HEIGHT, GAME_WIDTH } from '../src/constants';
import * as tf from '@tensorflow/tfjs';


// The size of the population
export const POPULATION_SIZE = 1;


/*
    Create the population
    It should consist of birds.
    A bird needs a brain.
    A brain is a Neural Network
*/
export function CreatePopulation() {
    const birds = [];
    birds.push(new Bird());

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
    if(Math.random() >= 0.9) {
        bird.up();
    }
} 