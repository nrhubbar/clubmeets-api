
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var waitForMongoose = require('wait-for-mongoose');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(mongoose);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
});
var port;

app.configure('development', function(){
  console.log("Attempting to connect to db")
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  waitForMongoose('mongodb://db', function (err) {
    if (err) {
      console.error('Timeout connecting to MongoDB server!');
      process.exit(1);
    }
  });
  port = 3000;
});

app.configure('production', function(){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://107.170.40.178/');
  port = 80;
});

// Routes

app.get('/', routes.index);
require('./User/user.js')(app);
require('./Club/club.js')(app);

require('./School/school.js')(app)

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
