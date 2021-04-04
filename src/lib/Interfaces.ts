import { RGBColour } from './Types';

interface ILoggerOptions {
	namespace: string;
	customColours?: Partial<IColours>;
	format?: string;
}

interface IColours {
	info: RGBColour;
	debug: RGBColour;
	error: RGBColour;
	warn: RGBColour;
	foreground: RGBColour;
}

export { ILoggerOptions, IColours };
