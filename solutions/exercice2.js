import { Bird } from '../src/bird';

/* 
    Calculate the fitness of the birds
    The bird has a .fitness property that you can set.
*/
export function CalculateFitness(birds) {

	let sum = birds.reduce((previous, current) => previous + current.score, 0);

	for (const bird of birds) {
		bird.fitness = bird.score / sum;
	}
}


/* 
    Calculate the fitness of the birds
    Use Roulette Selection

    Hint:
    Order the birds by descending fitness.
*/
export function BirdSelection(birds) {
	birds = birds.sort((a, b) => (a.fitness < b.fitness) ? 1 : -1);

	let seed = Math.random();

	for (const bird of birds) {
		if (seed < bird.fitness) {
			return bird;
		}
		seed -= bird.fitness;
	}
}

/*
    Make a baby bird
    Copy the parent bird brain and give it to a new bird

    Hint:
    Bird brain has a copy method: brain.copy();
    This simply creates a new TensorFlow model, with the same weights.
*/
export function MakeBaby(bird) {
	const newBrain = bird.brain.copy();
	const babyBird = new Bird(newBrain);
	babyBird.score = bird.score;
	return babyBird;
}