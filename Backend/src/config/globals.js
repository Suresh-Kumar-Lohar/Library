import chalk from 'chalk';
import { STATUS_CODES } from './constants.js';
import mongoose from './database.js';

global.chalk = chalk;
global.STATUS_CODES = STATUS_CODES;
global.mongoose = mongoose;
