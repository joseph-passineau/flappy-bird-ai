import { Bird } from '../src/bird';

/* 
    Calculate the fitness of the birds
    The bird has a .fitness property that you can set.
*/
export function CalculateFitness(birds) {

	// TODO: set every bird .fitness property.
}


/* 
    Select the bird that will reproduce
    Use Roulette Selection

    Hint:
    Order the birds by descending fitness first.
    
*/
export function BirdSelection(birds) {

	// TODO: Return the lucky bird.
	return birds[Math.floor(Math.random() * birds.length)];
}


/*
    Make a baby bird
    Copy the parent bird brain and give it to a new bird

    Hint:
    Bird brain has a copy method: brain.copy();
    This simply creates a new TensorFlow model, with the same weights.
*/
export function MakeBaby(bird) {
	const babyBird = new Bird();

	return babyBird;
}