import bunyan from 'bunyan';

let config = {
  name: 'HealthCare System',
  stream: process.stdout,
};

// Checks current build environment
switch(ENV) {
  case 'prod':
    config.level = 'fatal';
    break;
  case 'dev':
    config.level = 'debug';
    break;
  default:
    config.level = 'debug';
}

var logger = bunyan.createLogger(config);

export default logger;
