const router = require('express-promise-router')();
const passport = require('passport');
const passportConfiguration = require('../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const GroupsController = require('../controllers/groups');

router.route('/')
    .post(passportJWT, GroupsController.create);

router.route('/:group_id')
    .get(passportJWT, GroupsController.view);

router.route('/:group_id')
    .delete(passportJWT, GroupsController.delete);

router.route('/:group_id')
    .put(passportJWT, GroupsController.update);

module.exports = router;