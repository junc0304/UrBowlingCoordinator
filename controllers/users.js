const JWT = require('jsonwebtoken');

const Group = require('../models/group');
const User = require('../models/user');
const UserGroups = require('../models/user.groups');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'JunC',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {

    // user's signup
    signup: async (req, res, next) => {

        console.log('POST: user/signup', req.body);
        const { name, email, password } = req.body;
        const userFound = await User.findOne({ email });

        //if email already exists, return error
        if (userFound) {
            return res.status(403).json({ error: 'the email is already in use' });
        }

        //save new user to db
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();

        //assign token to new user and respond
        const token = signToken(newUser);
        res.status(200).json({ token });
    },

    // user's login
    signin: async (req, res, next) => {
        console.log('POST: user/signin', req.body);

        //assign new token
        const token = signToken(req.user);
        console.log(token);

        res.status(200).json({ token });
    },

    // update user's information
    update: async (req, res, next) => {
        console.log('PUT: user/:user_id', req.body);
        const { user_id } = req.params;
        const { name, email, password } = req.body;
        const userProfile = await User.findOne({ _id: user_id });

        //if a user is updating other's profile
        if (!user_id === req.user.id) {
            res.status(403).json({ error: `Access denied` });
        }

        if (!userProfile) {
            res.status(403).json({ error: `The user does not exist` });
        }

        if (email) userProfile.email = email;
        if (password) userProfile.password = password;
        if (name) userProfile.name = name;

        //update user
        await User.updateOne(
            { _id: user_id },
            { $set: userProfile }
        );

        //update group
        if (name) {
            await Group.updateOne(
                { owner_id: user_id },
                { $set: { owner: name } });
        }
        
        const result = await User.findOne({ _id: user_id });
        
        res.status(200).json( result );
    },

    
    delete: async (req, res, next) => {
        console.log('DELETE: user/:user_id');
        const { user_id } = req.params;
        const userFound = await User.findOne({ _id: user_id });

        if (!userFound) {
            return res.status(403).json({ error: 'user not found' })
        }

        const deletedUser = await User.findByIdAndDelete({_id: user_id});

        res.status(200).json({Deleted: deletedUser});
    },


    // view one user
    view_one: async (req, res, next) => {
        console.log('GET: user/:user_id');
        const { user_id } = req.params;
        const userFound = await User.findOne({ _id: user_id });

        if (!userFound) {
            return res.status(403).json({ error: 'user not found' })
        }

        res.status(200).json(userFound);
    },

    // view all users
    view_all: async (req, res, next) => {
        console.log('GET: user/all');
        const allUsers = await User.find({});

        res.status(200).json(allUsers);
    },

    //view user's group
    view_groups: async (req, res, next) => {
        console.log('GET: user/:user_id/groups');
        const { user_id } = req.params;
        const findUser = await UserGroups.findOne({ user_id: user_id });

        if (!findUser) {
            return res.status(403).json({ error: `no groups found` });
        }

        res.status(200).json(findUser.groups);
    }

}