import gamectrl, {XBoxButton} from 'esm-gamecontroller.js';
import {app} from './app-shell/app-shell.js';
import {astate} from './state.js';
import {sleep} from './utils.js';

const REPEATER_TIMEOUT = 80;
const REPEATER_SPEED = 400;

let upKeyRepeaterTimeout: number;
let upKeyRepeaterInterval: number;
let downKeyRepeaterTimeout: number;
let downKeyRepeaterInterval: number;

window.addEventListener('blur', () => {
	clearTimeout(upKeyRepeaterTimeout);
	clearInterval(upKeyRepeaterInterval);
	clearTimeout(downKeyRepeaterTimeout);
	clearInterval(downKeyRepeaterInterval);
});

gamectrl.on('connect', async (gamepad) => {
	function noTrigger() {
		return !gamepad.pressed.button6 && !gamepad.pressed.button7;
	}
	function isSecondary() {
		return gamepad.pressed.button6 && !gamepad.pressed.button7;
	}

	function LEFT_FUNCTION() {
		if (noTrigger()) {
			astate.difficulty--;
		}
	}
	async function RIGHT_FUNCTION() {
		if (noTrigger()) {
			astate.difficulty++;
		}
	}

	gamepad.axeThreshold = [0.4];

	gamepad.before(XBoxButton.DPAD_LEFT, () => {
		upKeyRepeaterTimeout = setTimeout(() => {
			upKeyRepeaterInterval = setInterval(() => {
				LEFT_FUNCTION();
			}, REPEATER_SPEED);
		}, REPEATER_TIMEOUT);
		LEFT_FUNCTION();
	});
	gamepad.after(XBoxButton.DPAD_LEFT, () => {
		clearTimeout(upKeyRepeaterTimeout);
		clearInterval(upKeyRepeaterInterval);
	});

	gamepad.before(XBoxButton.DPAD_RIGHT, () => {
		upKeyRepeaterTimeout = setTimeout(() => {
			upKeyRepeaterInterval = setInterval(() => {
				RIGHT_FUNCTION();
			}, REPEATER_SPEED);
		}, REPEATER_TIMEOUT);
		RIGHT_FUNCTION();
	});
	gamepad.after(XBoxButton.DPAD_RIGHT, () => {
		clearTimeout(upKeyRepeaterTimeout);
		clearInterval(upKeyRepeaterInterval);
	});

	gamepad.before(XBoxButton.B, () => {
		if (noTrigger()) {
			app.mainButton?.click();
		}
	});

	// gamepad.before(XBoxButton.A, () => {
	// 	window.history.back();
	// });
});
