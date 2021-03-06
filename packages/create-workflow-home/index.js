/* eslint-env node */
/* eslint-disable global-require */

try {
  module.exports = require('./dist');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    require('babel-register');
    module.exports = require('./src/index');
  } else {
    throw error;
  }
}
