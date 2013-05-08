(function() {
  var connect, http;

  http = require('http');

  connect = require('connect');

  module.exports = function(opts) {
    var server;
    if (opts == null) {
      opts = {};
    }
    if (!opts.port) {
      opts.port = 8001;
    }
    if (!opts.path) {
      opts.path = '/';
    }
    server = connect().use(connect["static"](opts.path));
    return http.createServer(server).listen(opts.port);
  };

}).call(this);
