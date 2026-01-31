const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function(username, password, done) {
        try {
            let adminRecord = await Admin.findOne({ email: username });

            if(!adminRecord){
                console.log("Invalid Email");
                return done(null, false);
            }

            const isMatch = await bcrypt.compare(password, adminRecord.password);

            if(!isMatch){
                console.log("Invalid Password");
                return done(null, false);
            }

            return done(null, adminRecord);

        } catch (err) {
            console.log("Error to Find User Detail");
            return done(err);
        }
    }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser( async function(id, done) {
    try{
        let user = await Admin.findById(id);
        if(!user){
            return done(null, false) ;
        }
        return done(null, user);
    }
    catch(err){
        console.log("Error to Find User Detail");
        return done(err);
    }
});

passport.checkAuthentication = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;