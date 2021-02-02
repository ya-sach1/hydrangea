import { colours, rgb } from 'leeks.js';
import { ILoggerOptions } from './Interfaces';

export default class Logger {
	private namespace: string;

	public constructor(options: ILoggerOptions) {
		this.namespace = this._toDotCase(options.namespace);
	}

	protected _toDotCase = (string: string): string => {
		return string
			.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
			.replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}_${b.toLowerCase()}`)
			.replace(/[^A-Za-z0-9]+|_+/g, '.')
			.toLowerCase();
	};

	protected write = (colour: [number, number, number], level: string, ...message: string[]): void => {
		process.stdout.write(
			`${colours.blackBright(new Date().toLocaleString())} ${rgb(colour, level.toUpperCase())} (${
				this.namespace
			}) ${rgb(colour, message.join(''))}\n`,
		);
	};

	public setName = (newName: string): this => {
		this.namespace = this._toDotCase(newName);
		return this;
	};

	public info = (...message: string[]): this => {
		this.write([143, 188, 187], 'info ', ...message);
		return this;
	};

	public debug = (...message: string[]): this => {
		this.write([161, 188, 138], 'debug', ...message);
		return this;
	};

	public error = (...message: string[]): this => {
		this.write([191, 97, 106], 'error', ...message);
		return this;
	};

	public warn = (...message: string[]): this => {
		this.write([235, 203, 139], 'warn ', ...message);
		return this;
	};
}
