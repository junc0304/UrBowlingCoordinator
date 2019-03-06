const router = require('express-promise-router')();
const passport = require('passport');
const passportConfiguration = require('../passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local',{ session: false });

const UsersController = require('../controllers/users');
const { validate, schemas } = require('../helpers/route_helper');

//sign up
router.route('/signup')
    .post( validate(schemas.auth), UsersController.signup );

//sign in with email/password
router.route('/signin')
    .post( validate(schemas.auth), passportLocal, UsersController.signin );

//view all user

router.route('/all')
    .get( passportJWT, UsersController.view_all);

//view single user
router.route('/:user_id')
    .get( passportJWT, UsersController.view_one);

//view single user
router.route('/:user_id')
    .put( passportJWT, UsersController.update);

router.route('/:user_id')
    .delete( passportJWT, UsersController.delete);

//view user's groups
router.route('/:user_id/groups')
    .get( passportJWT, UsersController.view_groups);


module.exports = router;