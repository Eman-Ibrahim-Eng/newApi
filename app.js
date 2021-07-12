var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var app = express();


app.use(cors());
app.use(compress());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: false }));


var all = require('./routes/all.api');
app.use(all);


module.exports = app;
