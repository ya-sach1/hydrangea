interface ILoggerOptions {
	namespace: string;
	customColours?: Partial<IColours>;
}

interface IColours {
	info: [number, number, number];
	debug: [number, number, number];
	error: [number, number, number];
	warn: [number, number, number];
	foreground: [number, number, number];
}

export { ILoggerOptions, IColours };
