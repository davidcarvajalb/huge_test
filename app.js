var express = require('express');
var logger = require('morgan');
var path = require('path');
var api = require('./api');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

module.exports = app;
