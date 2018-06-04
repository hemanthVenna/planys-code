var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var mustacheExpress = require('mustache-express');

var url = 'mongodb://127.0.0.1:27017/planys';
var path = require("path")

// /mongoose.Promise = global.Promise;
mongoose.connect(url);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});


var app = express();

// seting up view engine as html
var engines = require('mustache');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(morgan('dev'))

app.use('/node_modules', express.static(__dirname + "/node_modules"))
// app.use(device.capture());


// body parser to get the values from form elements
// app.use(bodyParser.urlencoded({ extended: true }));
var xlsxj = require("xlsx-to-json-lc");
var Planys = require('./models/planysdata')

app.get('/', function (req, res) {
    xlsxj({
        input: "./data/mysheet2.xlsx",
        output: "output.json",
        lowerCaseHearders: true
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var description = result[i].description;
                var imageId = result[i].imageId;
                var markerId = result[i].markerId;
                
            }
            res.render('index.mustache',{data:result})

        }
    });
})

app.listen(3000);