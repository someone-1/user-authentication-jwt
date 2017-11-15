var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var user = require('./app/models/user');


//configuring 
var port = process.env.port || 8080;
mongoose.connect(config.database);
app.set('secret',  config.secret);

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(morgan('dev'));


app.get('/', function(req, res){
    res.sendfile('./index.html');
});

app.get('/setup' , function(req, res){

    //creating a sample user
    var nick = new user({
        name: 'random',
        email: 'random@something.com',
        password: 'password',
        admin: true
    })

    nick.save(function(err){
        if(err){
            throw err;
        }
        console.log('user saved succcesfuly');
        res.json({success: true});
    })
})


var apiRoutes = require('./routes');


app.use('/api', apiRoutes);

  

app.listen(port);
console.log('magic ')
