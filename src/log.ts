import log4js from 'log4js';
log4js.configure('logconfig.json')
export const logger = log4js.getLogger()