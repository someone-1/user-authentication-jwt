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


var apiRoutes = express.Router();

//the below section checks the users and sends a jwt which has to be passed as headers
apiRoutes.post('/authenticate', function(req,res){
    user.findOne({email: req.body.email } , function(err , Users){
        // console.log(Users)
        if(err) throw err;
        console.log(req.body,' - - ',Users, 'response.body');
        if(!Users){
            res.json({success: false, message: 'user not found'});
        } else if(Users.password != req.body.password){
            res.json({success: false, message:'wrong password'});
        } else {
            const payload = {
                email: Users.email,
                admin: Users.admin,
            }
            var token = jwt.sign(payload, app.get('secret'))
            res.json({
                token: token,
                success: true,
                message: 'enjoy token'
            })
        }
    })
})

// the below section checks if the jwt signature is valid

apiRoutes.use('/' , function(req , res , next){
    var token = req.body.token || req.query.token || req.header['x-access-token'];
    if(token){
        jwt.verify(token, app.get('secret') , function(err , decoded){
            if(err){
                return res.json({success: false, message: 'failed to authenticate token'});
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'no token provided'
        })
    }
})



apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});
apiRoutes.get('/users', function(req, res) {
    user.find({}, function(err, users) {
        res.json(users);
    });
});


app.use('/api', apiRoutes);

  

app.listen(port);
console.log('magic ')
