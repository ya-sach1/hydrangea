import { Logger } from '.';

const logger: Logger = new Logger({
	namespace: 'this is a test!',
});

console.time('No format');

logger.info('This is a').info('chained message!');
logger.setName('this is a new name :)').error('Whoops, what went wrong?!?!');
logger.debug('debug fam!');
logger.warn('Warn, cause why not?');

console.timeEnd('No format');

const newLogger: Logger = new Logger({
	namespace: 'custom formatter',
	format: '{level} ({namespace}) i love sex tbh [{date}] {message}',
});

console.time('Format');

newLogger.info('This is a').info('chained message!');
newLogger.setName('this is a new name :)').error('Whoops, what went wrong?!?!');
newLogger.debug('debug fam!');
newLogger.warn('Warn, cause why not?');

console.timeEnd('Format');
