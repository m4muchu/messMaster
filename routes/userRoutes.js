var express = require('express');
var router = express.Router();
var User = require('../model/user');
var passport = require('passport');

router.post('/signup', (req, res) => {
    let messNumber = req.body.messNumber;
    let password = req.body.password;
    var newUser = new User();
    newUser.messNumber = messNumber;
    newUser.password = newUser.hashPassword(password);
    newUser.save((err) => {
        if (err) {
            res.json({
                message: "Username already taken",
                success: false
            });
        } else {
            res.json({
                message: "Registration successfull",
                success: true
            });
        }
    });
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    let cleanUser = Object.assign({}, user);
    res.json(cleanUser.messNumber);
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.session.destroy()
        res.clearCookie('connect.sid')
        return res.json({
            msg: 'logging you out'
        })
    } else {
        return res.json({
            msg: 'no user to log out!'
        })
    }
});

router.post('/messcut',isLoggedIn,(req,res)=>{
    let messNumber=req.body.messNumber;
    let fromDate=req.body.fromDate;
    let toDate=req.body.toDate;

    var newMessCut=new MessCut();
    newMessCut.messNumber=messNumber;
    newMessCut.fromDate=fromDate;
    newMessCut.toDate=toDate;
    newMessCut.save((err)=>{
        if(err){
            res.json({success:false,message:"Mess cut Unsuccesfull,Please try again"});
        }
        else{
            res.json({success:true,message:"Mess cut Succesfull"});
        }
    });
});

router.post('/latemess',isLoggedIn,(req,res)=>{
    let messNumber=req.body.messNumber;
    let date=req.body.date;

    var newLateMess=new LateMess();
    newLateMess.messNumber=messNumber;
    newLateMess.date=date;

    newLateMess.save((err)=>{
        if(err){
            res.json({success:false,message:"Late Mess Unsuccesfull"});
        }
        else{
            res.json({success:true,message:"Late Mess added Succesfully"});
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.send("You are not autorised to access this page");
    }
}

router.get('/test', isLoggedIn, (req, res) => {
    res.send('Valid user');
});

module.exports = router;
