const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const session=require('express-session');
const config=require('./config/keys');

const userRoutes=require('./routes/userRoutes');

var port=8000||process.env.PORT;

const app=express();

app.use(cookieParser());
app.use(bodyParser());

require('./config/passport');

mongoose.connect(config.databaseURL);

app.use(session({secret:'messmasteryahiyashijil',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',userRoutes);

app.listen(port,()=>{
    console.log(`App running at port ${port}`);
});

