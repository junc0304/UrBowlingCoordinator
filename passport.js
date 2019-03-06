const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const config = require('./configuration/index');

//authorized with JWT token
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));

//login with email/password
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email }).select("+password");
        console.log(user);
        if (!user) {
            return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return done(null, false);
        }

        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}
));