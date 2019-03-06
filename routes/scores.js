const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

//const ScoresController = require('../controllers/scores');

router.route('/add')
    .post();

module.exports = router;