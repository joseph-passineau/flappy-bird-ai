import * as tf from '@tensorflow/tfjs';
import { sketch } from './index';

const MODEL_INPUT_NODES_SIZE = 5;
const MODEL_HIDDEN_NODES_SIZE = 8;
const MODEL_OUPUT_NODES_SIZE = 2;

export class Brain {
	constructor(model) {
		if(model) {
			this.model = model;
		}
		else {
			this.model = this.createModel();
		}	
	}

	dispose() {
		this.model.dispose();
	}

	predict(inputs) {
		return tf.tidy(() => {
			const inputData = tf.tensor2d([inputs]);
			const result = this.model.predict(inputData);
			const outputs = result.dataSync();
			return outputs;
		});
	}

	copy() {
		return tf.tidy(() => {
			const modelCopy = this.createModel();
			const weights = this.model.getWeights();
			const weightCopies = [];
			for (const weigth of weights) {
				weightCopies.push(weigth.clone());
			}
			modelCopy.setWeights(weightCopies);
			return new Brain(modelCopy);
		});
	}
    
	mutate(rate) {
		tf.tidy(() => {
			const weights = this.model.getWeights();
			const mutatedWeights = [];
			for (let i = 0; i < weights.length; i++) {
				let tensor = weights[i];
				let shape = weights[i].shape;
				let values = tensor.dataSync().slice();
				for (let j = 0; j < values.length; j++) {
					if (sketch.random(1) < rate) {
						let w = values[j];
						values[j] = w + sketch.randomGaussian();
					}
				}
				let newTensor = tf.tensor(values, shape);
				mutatedWeights[i] = newTensor;
			}
			this.model.setWeights(mutatedWeights);
		});
	}
    
	createModel() {
		const model = tf.sequential();
        
		const hidden = tf.layers.dense({
			units: MODEL_HIDDEN_NODES_SIZE,
			inputShape: [MODEL_INPUT_NODES_SIZE],
			activation: 'sigmoid'
		});   
		model.add(hidden);
        
		const output = tf.layers.dense({
			units: MODEL_OUPUT_NODES_SIZE,
			activation: 'softmax'
		});
		model.add(output);
        
		return model;
	}
}