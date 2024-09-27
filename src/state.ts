import {ReactiveController, state} from '@snar/lit';
import {PropertyValues} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {getRandomNumber} from './utils.js';

@saveToLocalStorage('maths-attack:state')
class AppState extends ReactiveController {
	@state() difficulty = 1;
	@state() a: number = null;
	@state() b: number = null;
	@state() showAnswer = false;

	updated(changed: PropertyValues<this>) {
		if (
			changed.has('difficulty') &&
			(changed.get('difficulty') !== undefined || this.a === null)
		) {
			this.newRound();
		}
	}

	getAnswer() {
		return this.a * this.b;
	}

	newRound() {
		this.showAnswer = false;
		switch (this.difficulty) {
			case 1:
				this.a = getRandomNumber(1, 9);
				this.b = getRandomNumber(1, 9);
				break;
			case 2:
				this.a = getRandomNumber(1, 9);
				this.b = getRandomNumber(10, 99);
				break;
			case 3:
				this.a = getRandomNumber(10, 99);
				this.b = getRandomNumber(10, 99);
				break;
			case 4:
				this.a = getRandomNumber(10, 99);
				this.b = getRandomNumber(100, 999);
				break;
			case 5:
				this.a = getRandomNumber(100, 999);
				this.b = getRandomNumber(100, 999);
				break;
			case 6:
				this.a = getRandomNumber(100, 999);
				this.b = getRandomNumber(1000, 9999);
				break;
			case 7:
				this.a = getRandomNumber(1000, 9999);
				this.b = getRandomNumber(1000, 9999);
				break;
			case 8:
				this.a = getRandomNumber(1000, 9999);
				this.b = getRandomNumber(10000, 99999);
				break;
			case 9:
				this.a = getRandomNumber(10000, 99999);
				this.b = getRandomNumber(10000, 99999);
				break;
		}
	}
}

export const astate = new AppState();
