const nconf = require('nconf');

nconf.argv().env();
nconf.file({
  file: 'config/config.json'
});
nconf.defaults({
  type: 'file',
  file: 'config/config.defaults.json'
});

module.exports = nconf;
