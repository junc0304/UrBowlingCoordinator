const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

router.route('/signup')
    .post( UsersController.signUp );

router.route('/signin')
    .get( UsersController.signIn );

module.exports = router;