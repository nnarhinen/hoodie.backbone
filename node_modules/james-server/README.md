# Synopsis

Static HTTP server for [James.js](https://github.com/leonidas/james.js).

```javascript
var james = require('james'),
    server = require('james-server');

james.task('server', function() {
  server({
    port: 6001,
    path: 'public'
  });
});

james.task('default', ['server']);

```