const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
mongoose.connect(keys.mongodbURI);
// mongoose.openUri()
const port = process.config.port || 3000;
app.set('view engine','ejs');


app.use('/auth' , authRoutes);

app.get('/' , (req, res)=>{
    res.render('home');
})

app.listen(3000, ()=>{
    console.log('app runing on port 3000');
})
// const express = require('express');
// const app = express();
// app.get('/' , function(req , res){
//     console.log('asdflkajsdfjoodjoeofjoerf')
//     res.send('asojoorfoeo');
// });

// const server = app.listen(8080 , function(err){
//     if(err){
//         console.log('eror , ' , err);
//     }
//     console.log('app.started running \n' , server)
// })