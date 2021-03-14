export class Utilities {
	public toDotCase = (string: string): string =>
		string
			.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
			.replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}_${b.toLowerCase()}`)
			.replace(/[^A-Za-z0-9]+|_+/g, '.')
			.toLowerCase();
}
