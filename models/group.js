const mongoose = require('mongoose');
const Users = require('./user');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const groupSchema = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    owner_id: { type: String, required: true },
    description: String,
    users: ObjectId, //reference to user.group table
    created: Date,
    updated: Date,
});

//update created/updated field when creating a new group
groupSchema.pre('save', async function (next) {
    try {
        this.created = new Date().getDate();
        this.updated = this.created;
    }
    catch (error) {
        next(error);
    }
});

//update updated field when updating an existing group
groupSchema.pre('update', async function (next) {
    try {
        this.updated =  new Date();
    }
    catch (error) {
        next(error);
    }
});

const Group = mongoose.model('group', groupSchema);
module.exports = Group;
