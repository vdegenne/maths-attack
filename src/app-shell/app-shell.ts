import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {withStyles} from 'lit-with-styles';
import styles from './app-shell.css?inline';
import {materialShellLoadingOff} from 'material-shell';
import {astate} from '../state.js';
import {withController} from '@snar/lit';
import {bindInput} from 'relit';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(astate)
export class AppShell extends LitElement {
	@query('#main-button') mainButton!: HTMLButtonElement;

	firstUpdated() {
		materialShellLoadingOff.call(this);
	}

	render() {
		return html`
			<div id="content">
				<md-elevated-button inert
					>${astate.a}
					<span class="font-light">×</span> ${astate.b}</md-elevated-button
				>

				<md-text-button
					?trailing-icon=${astate.showAnswer}
					id="main-button"
					@click=${() => {
						if (astate.showAnswer) {
							astate.newRound();
						} else {
							astate.showAnswer = true;
						}
					}}
				>
					${astate.showAnswer
						? html`${astate.getAnswer()}<md-icon slot="icon"
									>arrow_forward</md-icon
								>`
						: html`<md-icon slot="icon">remove_red_eye</md-icon>Answer`}
				</md-text-button>
			</div>

			<footer>
				<md-slider
					class="w-full"
					min="1"
					max="9"
					ticks
					labeled
					${bindInput(astate, 'difficulty')}
				></md-slider>
			</footer>
		`;
	}
}

export const app = (window.app = new AppShell());
