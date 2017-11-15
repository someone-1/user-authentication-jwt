var express = require('express');
var apiRoutes = express.Router();
var user = require('./app/models/user');
var jwt = require('jsonwebtoken');
var config = require('./config');


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
            var token = jwt.sign(payload, config.secret)
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



//protected routes after    the middleware to check for authentication

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

//
apiRoutes.get('/users', function(req, res) {
    user.find({}, function(err, users) {
        res.json(users);
    });
});



module.exports = apiRoutes;