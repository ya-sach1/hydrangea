export class Utilities {
	/**
	 * Convert a string to dot.case
	 * @param string The string to dot-caseify
	 * @returns string
	 */
	public toDotCase = (string: string): string =>
		string
			.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
			.replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}_${b.toLowerCase()}`)
			.replace(/[^A-Za-z0-9]+|_+/g, '.')
			.toLowerCase();

	/**
	 * Return the RGB ANSI escape code.
	 * @param param0 RGB Colour
	 * @param args The text to colour
	 * @returns string
	 */
	public rgb = ([r, g, b]: [number, number, number], ...args: unknown[]): string => `\x1b[38;2;${r};${g};${b}m${args.join(' ')}\x1b[0m`;
}
