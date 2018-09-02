var localStrategy = require('passport-local').Strategy;
var User = require('../model/user');
var passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local-login', new localStrategy({
        usernameField: 'messNumber',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, messNumber, password, done) {
        User.findOne({
            'messNumber': messNumber
        }, function (err, user) {
            if (err) {
                console.log("Error ");
                return done(err);
            }
            if (!user) {
                return done(null, false, console.log("No user found"));
            }
            if (!user.validPassword(password)) {
                return done(null, false, console.log("Wrong password"));
            }
            return done(null, user);
        });
    }
));





module.exports = passport;