james      = require 'james'
server     = require 'james-server'
coffee     = require 'james-coffee'

james.task 'build', ->
  dest = james.dest 'test/specs.js'
  james.list('test/spec/**/*.coffee').forEach (file) ->
    james.read(file)
      .transform(coffee bare: true)
      .write dest

james.task 'copy-to-test', ->
  james.read('backbone.hoodie.js').write('test/backbone.hoodie.js')

james.task 'server:test', ->
  server
    port: 9000,
    path: 'test'
  james.watch ['test/spec/**/*.coffee'], -> james.run 'build'
  james.watch ['backbone.hoodie.js'], -> james.run 'copy-to-test'

james.task 'default', ['build']