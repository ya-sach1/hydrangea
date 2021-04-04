import { EOL } from 'os';
import { IColours, ILoggerOptions } from './Interfaces';
import { Utilities } from './Util';
import type { RGBColour } from './Types';

export class Logger {
	/**
	 * The logger utilities.
	 * @protected
	 * @readonly
	 */
	protected readonly _util: Utilities = new Utilities();
	/**
	 * Default colours to use
	 * @protected
	 * @readonly
	 */
	protected readonly _colours: IColours = {
		info: [143, 188, 187],
		debug: [161, 188, 138],
		error: [191, 97, 106],
		warn: [235, 203, 139],
		foreground: [139, 132, 121],
	};
	/**
	 * Format for the logger to use
	 * @protected
	 * @readonly
	 */
	protected readonly _format?: string;

	/**
	 * Creates a new logger
	 * @param _options The logger options
	 * @public
	 */
	public constructor(protected _options: ILoggerOptions) {
		this._options.namespace = this._util.toDotCase(this._options.namespace);

		if (this._options.format) this._format = this._options.format.toLowerCase();
		if (this._options.customColours) this._colours = { ...this._colours, ...this._options.customColours };
	}

	/**
	 * Default write method
	 * @param colour RGB colour for the level and message
	 * @param level The log level
	 * @param message The message
	 * @protected
	 * @method
	 * @returns this
	 */
	protected write = (colour: RGBColour, level: string, ...message: unknown[]): this => {
		this._format
			? process.stdout.write(`${this.formatLogString(this._format, level, colour, message)}${EOL}`)
			: process.stdout.write(`${this._util.rgb(this._colours.foreground, new Date().toLocaleString())} ${this._util.rgb(colour, level.toUpperCase())} (${this._options.namespace}) ${this._util.rgb(colour, message)}${EOL}`);
		return this;
	};

	/**
	 * Format a string based on the format provided by the user
	 * @param string The format string
	 * @param level The log level
	 * @param colour RGB colour for the level and message
	 * @param message The message
	 * @protected
	 * @method
	 * @returns string
	 */
	protected formatLogString = (string: string, level: string, colour: RGBColour, ...message: unknown[]): string =>
		string
			.replace(/({date})/g, this._util.rgb(this._colours.foreground, new Date().toLocaleString()))
			.replace(/({level})/g, this._util.rgb(colour, level.toUpperCase()))
			.replace(/({namespace})/g, this._options.namespace)
			.replace(/({message})/g, this._util.rgb(colour, message));

	/**
	 * Create an info log.
	 * @param message What to print, duh!
	 * @public
	 * @method
	 * @returns this
	 */
	public info = (...message: string[]): this => this.write(this._colours.info, 'info ', message);
	/**
	 * Create a debug log.
	 * @param message What to print, duh!
	 * @public
	 * @method
	 * @returns this
	 */
	public debug = (...message: string[]): this => this.write(this._colours.debug, 'debug', message);
	/**
	 * Create an error log.
	 * @param message What to print, duh!
	 * @public
	 * @method
	 * @returns this
	 */
	public error = (...message: string[]): this => this.write(this._colours.error, 'error', message);
	/**
	 * Create a warn log.
	 * @param message What to print, duh!
	 * @public
	 * @method
	 * @returns this
	 */
	public warn = (...message: string[]): this => this.write(this._colours.warn, 'warn ', message);

	/**
	 * Change the current instance namespace
	 * @param name The new namespace
	 * @public
	 * @method
	 * @returns this
	 */
	public setName = (name: string): this => {
		this._options.namespace = this._util.toDotCase(name);
		return this;
	};
}
