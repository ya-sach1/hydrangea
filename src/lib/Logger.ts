import { colours, rgb } from 'leeks.js';

import { IColours, ILoggerOptions } from './Interfaces';
import { Utilities } from './Util';

export class Logger {
	protected readonly _util: Utilities = new Utilities();
	protected readonly _colours: IColours = {
		info: [143, 188, 187],
		debug: [161, 188, 138],
		error: [191, 97, 106],
		warn: [235, 203, 139],
	};

	public constructor(private _options: ILoggerOptions) {
		this._options.namespace = this._util.toDotCase(this._options.namespace);

		if (this._options.customColours) this._colours = { ...this._colours, ...this._options.customColours };
	}

	protected write = (colour: [number, number, number], level: string, ...message: string[]): this => {
		process.stdout.write(`${colours.blackBright(new Date().toLocaleString())} ${rgb(colour, level.toUpperCase())} (${this._options.namespace}) ${rgb(colour, message.join(''))}\n`);
		return this;
	};

	public info = (...message: string[]): this => this.write(this._colours.info, 'info ', ...message);
	public debug = (...message: string[]): this => this.write(this._colours.debug, 'debug', ...message);
	public error = (...message: string[]): this => this.write(this._colours.error, 'error', ...message);
	public warn = (...message: string[]): this => this.write(this._colours.warn, 'warn ', ...message);

	public setName = (name: string): this => {
		this._options.namespace = this._util.toDotCase(name);
		return this;
	};
}
