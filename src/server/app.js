/**
 * This is the main application entry point. 
 */


// All general server API imports
var restify = require('restify');
var path = require('path')

// Allow CORS so that cross network requests can be made
restify.CORS.ALLOW_HEADERS.push('auth');

var server = restify.createServer();

// Setup some basic plugins and parsers for the restify server
server
  .use(restify.CORS({ headers: [ 'auth' ], origins: ['*'] }))
  .use(restify.fullResponse())
  .use(restify.bodyParser())
  .use(restify.queryParser())
  .use(restify.authorizationParser());

// Setup all the routes using a recursive directory read and requiring all the routes; causing their callbacks to be triggered
var normalizedPath = path.join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(server);
});

// Finally, begin listening... app OK to start!
server.listen(8080, function() {
  console.log('%s listening at %s and open for connections.', "Electric Boogaloo", server.url);
});
