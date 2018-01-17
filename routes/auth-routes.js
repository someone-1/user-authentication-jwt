const router = require('express').Router();
const passport = require('passport');


//auth login
router.get('/login' , (req , res)=>{
    console.log('user : ' , req.user);
    res.render('login' , {user: req.user});
})

//auth logout
router.get('/logout' , (req , res)=>{
    //handle this 
    res.send('logging out');
})

//google authentication
router.get('/google' , passport.authenticate('google' , {
    scope:['profile']
}))

router.get('/google/redirect/' , passport.authenticate('google') , (req, res) => {
    res.send('you reached callback url')
})

module.exports = router;
