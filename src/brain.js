import * as tf from '@tensorflow/tfjs';

import { CreateModel } from '../exercices/exercice1';
import { sketch } from './index';

export class Brain {
	constructor(model) {
		this.model = model;
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
			const modelCopy = CreateModel();
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
}