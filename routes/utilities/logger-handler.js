const loggerHandler = {};

const fs = require('fs');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const config = require('../config/config.js');
const mode = config.mode;

const logErrorName = config.logger.errorName;
let logErrorPath = config.logger.errorPath;
const clientLogErrorName = config.logger.errorClientName;
let clientLogErrorPath = config.logger.errorClientPath;


let logFolderSplit = logErrorPath.split('/');

let logFolder = '';
for (let i = 0; i < logFolderSplit.length - 1; i++) {
    logFolder = [logFolder, logFolderSplit[i], '/'].join('');
}

if (!fs.existsSync(logFolder)) {
    logErrorPath = logFolderSplit[logFolderSplit.length - 1];
    let clientLogErrorPathSplit = clientLogErrorPath.split('/');
    clientLogErrorPath = clientLogErrorPathSplit[clientLogErrorPathSplit.length - 1];
}

// LOGGER
if (mode === "production"){
  loggerHandler.logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `timestamp: `+info.timestamp + `\n` + info.message + `\n`)
    ),
    transports: [
      new DailyRotateFile({
        timestamp: winston.format.timestamp(),
        filename: logErrorName,
        dirname: logErrorPath,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
        level: 'error'
      })
    ]
  });
  
  // LOGGER
  loggerHandler.clientLog = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `timestamp: `+info.timestamp + `\n` + info.message + `\n`)
    ),
    transports: [
      new DailyRotateFile({
        timestamp: winston.format.timestamp(),
        filename: clientLogErrorName,
        dirname: clientLogErrorPath,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
        level: 'error'
      })
    ]
  });
  
}else{


  loggerHandler.logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `timestamp: `+info.timestamp + `\n` + info.message + `\n`)
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        timestamp: winston.format.timestamp(),
        filename: logErrorName,
        dirname: logErrorPath,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
        level: 'error'
      })
    ]
  });
  
  // LOGGER
  loggerHandler.clientLog = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `timestamp: `+info.timestamp + `\n` + info.message + `\n`)
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        timestamp: winston.format.timestamp(),
        filename: clientLogErrorName,
        dirname: clientLogErrorPath,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
        level: 'error'
      })
    ]
  });
  
}
module.exports = loggerHandler;