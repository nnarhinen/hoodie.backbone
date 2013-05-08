var assert = require('assert'),
    stream = require('readable-stream'),
    coffee = require('../index.js');

describe('#createStream', function() {

  it('should return CoffeeScript to JavaScript transformation stream', function(done){
    var src  = new stream.PassThrough(),
        dest = new stream.PassThrough();

    src.pipe(coffee()).pipe(dest);
    src.write('\nconsole.log "Hello World!"\n');
    src.end();

    dest.on('finish', function() {
      assert.equal(dest.read().toString(),
        '(function() {\n' +
        '\n' +
        '  console.log("Hello World!");\n' +
        '\n' +
        '}).call(this);\n');
      done();
    });
  });

  it('should pass options to CoffeeScript compiler', function(done){
    var src  = new stream.PassThrough(),
        dest = new stream.PassThrough();

    src.pipe(coffee({bare: true})).pipe(dest);
    src.write('\nconsole.log "Hello World!"\n');
    src.end();

    dest.on('finish', function() {
      assert.equal(dest.read().toString(), '\nconsole.log("Hello World!");\n');
      done();
    });
  });
});
