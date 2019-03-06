const Group = require('../models/group');
const User = require('../models/user');
const GroupUsers = require('../models/group.users');
const ObjectId = require('mongoose').ObjectId;
/*
a. /groups/create
------ group leaders only -------
b. /groups/:gid/delete
c. /groups/:gid/update
d. /groups/:gid/add
e. /groups/:gid/remove 
*/


module.exports = {

    // create a new group
    create: async (req, res, next) => {
        console.log('POST: groups/: ', req.body);

        const { title, description } = req.body;
        const group = await Group.findOne({ title });

        if (group) {
            return res.status(403).json({ error: 'The group already exists' });
        }
        //create group
        const newGroup = new Group({
            title,
            owner: req.user.name,
            owner_id: req.user.id,
            description,
            users: null,  //reference groups.users table
            created: null,
            updated: null
        });

        //group.users table holds list of users in a group 
        const newGroupUsers = new GroupUsers({
            group_id: newGroup._id,
            users: [{                    
                user_id: req.user.id,
                average_score: null,
                role: 'owner'
            }]
        });

        //add reference
        newGroup.users = newGroupUsers._id; //add reference

        console.log('new group', newGroup);
        console.log('new users', newGroupUsers);

        await newGroupUsers.save();
        await newGroup.save();
        await User.updateOne( 
            { _id: req.user.id }, 
            { $push: { groups: newGroup._id } 
        });

        res.status(200).json( { status: '200', created: newGroup } );
    },

    // delete an existing group
    delete: async (req, res, next) => {
        console.log('DELETE: group/:group_id', req.body);
        const { id } = req.body;
        const findGroup = await Group.findOne({ _id: id });

        if (!findGroup) {
            return res.status(403).json({ error: `The group does not exist` });
        }

        if (!findGroup.owner_id === req.user.id) {
            return res.status(403).json({ error: `You are not allowed to delete the group` });
        }

        res.status(200).json(await Group.findOneAndDelete({ _id: id, owner_id: req.user.id }));
    },

    // update the group information
    update: async (req, res, next) => {
        console.log('PUT: group/:group_id', req.body);
        const { group_id } = req.params;
        const { title, newowner_id, description } = req.body;
        const group = await Group.findOne({ _id: group_id});

        if (!group) {
            return res.status(403).json({ error: 'Only the owner can update the group' });
        }

        if (!group.owner_id === req.user.id) {
            return res.status(403).json({ error: `You are not allowed to update the group` });
        }

        //const updates = group;
        if (title) {
            group.title = title;
        }

        if (newowner_id) {
            
            const newUser = await User.findById({ id: newowner_id });
            console.log('new user', newUser);

            if (!newUser) {
                return res.status(403).json({ error: 'the user does not exist' });
            }

            if (!newUser.find({groups: group_id })) {
                return res.status(403).json({ error: `the new owner has to be a group member`})
            }

            group.owner_id = newUser.id;
            group.ownername = newUser.name;
        }
        if (description) {
            group.description = description;
        }

        await Group.update(
            { _id: group_id, owner_id: req.user.id },
            { $set: group });

        res.status(200).json({ group });
    },

    // view group information
    view: async (req, res, next) => {
        console.log('GET: group/:group_id', req.params);
        const { group_id } = req.params; //groupid
        const findGroup = await Group.findOne({ _id: group_id });

        if(!findGroup) {
            return res.status(403).json({ error: `No groups found`});
        }
        res.status(200).json( group );
    },

    // view group's user rank
    view_rank: async (req, res, next) => {
        console.log('GET: group/:group_id/viewrank', req.body);
        const { group_id } = req.body; //groupid

        //get users sorted decending order by their scores
        const groupUsers = await GroupsUsers.findOne({ group_id });

        console.log('user rank', groupUsers.users.sort({ score: -1 }));
        res.status(200).json( groupUsers.users.sort({ score: -1 })) ;
    },

    // add new user to a group
    add_user: async (req, res, next) => {
        console.log('POST: group/:group_id/add', req.body);
        const { user_id, group_id } = req.body;

        //check user role
        const group_admin = await GroupsUsers.findOne({
            _id: group_id,
            'users.user_id': req.user.id,
            'users.role': { $in: ['owner', 'admin'] }
        });

        if (!group_admin) {
            return res.status(403).json({ error: `only owner/admin can add users` });
        }

        //add user to the group's user list
        await Group.update({
            _id: group_id
        }, {
                $push: {
                    users: {
                        user_id: user_id,
                        average_score: await UserScores.findOne({user_id}).score.average_score,
                        role: 'user', 
                    }
                }
            });

        //add a group to user's group list
        await User.update({
            _id: user_id
        }, {
                $push: {
                    group: {
                        group_id: group_id
                    }
                }
            });

        res.status(200).json({message: `the user successfully added to the group`});
    }

};