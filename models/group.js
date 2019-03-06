const mongoose = require('mongoose');
const moment = require('moment');

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

groupSchema.pre('save', async function (next) {
    try {
        this.created = moment().format();
        this.updated = this.created;
    }
    catch (error) {
        next(error);
    }
});

groupSchema.pre('update', async function (next) {
    try {
        this.updated = moment().format();
    }
    catch (error) {
        next(error);
    }
});

const Group = mongoose.model('group', groupSchema);
module.exports = Group;
