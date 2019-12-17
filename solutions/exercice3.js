const BIRD_MUTATION_DECAY_RATE_PERCENTAGE = 0.1;
const BIRD_MUTATION_INITIAL_VALUE = 10;

/*
    Mutate the bird brain

    Hint:
    Use fix numbers first (ex: 0.1, 0.01, 0.001)
    
    Challenge:
    Try using a exponential Decay to calculate mutation
*/
export function Mutate(bird) {
    const mutationRate = CalculateMutationRate(bird);	
    bird.brain.mutate(mutationRate);
} 

function CalculateMutationRate(bird) {
    // Calculation rate using exponential Decay
    return (Math.pow((1-(BIRD_MUTATION_DECAY_RATE_PERCENTAGE/100)), bird.score) * BIRD_MUTATION_INITIAL_VALUE) / 100;
}