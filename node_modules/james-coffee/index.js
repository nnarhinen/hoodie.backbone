var james  = require('james'),
    coffee = require('coffee-script');

module.exports = function(options) {
  return james.createStream(function(file, callback) {
    callback(coffee.compile(file, options));
  });
}
