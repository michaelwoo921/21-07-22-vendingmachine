import fs from 'fs'
import {start} from './input';
import * as dotenv from 'dotenv';
import { logger } from './log';

dotenv.config();
if( process.env.ENVIRONMENT === 'prod'){
  logger.level ='WARN';
} else {
  logger.level='ALL';
}

logger.debug(process.env.ENVIRONMENT);
logger.trace('Beginning program in dev environment');
start()




