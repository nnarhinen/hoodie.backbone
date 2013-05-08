http    = require 'http'
connect = require 'connect'

module.exports = (opts = {}) ->
  opts.port = 8001 if !opts.port
  opts.path = '/' if !opts.path

  server = connect()
    .use(connect.static(opts.path))
    
  http.createServer(server).listen opts.port