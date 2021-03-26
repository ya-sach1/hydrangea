import { Logger } from '.';

const logger: Logger = new Logger({
	namespace: 'this is a test!',
});

logger.info('This is a').info('chained message!');
logger.setName('this is a new name :)').error('Whoops, what went wrong?!?!');
logger.debug('debug fam!');
logger.warn('Warn, cause why not?');
