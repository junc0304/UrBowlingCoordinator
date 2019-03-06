const mongoose = require('mongoose');
const Group = require('./group');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const bcrypt = require('bcryptjs');

//user account schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true, select: false},
    groups: [{ type: ObjectId }],   //reference to user.groups
    scores: { type: ObjectId },     //reference to user.scores
    contacts: [{type: ObjectId}],    //reference to user.contacts
    description: { type: String }

});

//convert password salt/hash before save 
userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(13));
        next();
    }
    catch (error) {
        next(error);
    }
});

userSchema.pre('updateOne', async function (next) {
    try {
        const updates = this.getUpdate();
        if(typeof updates.$set == 'undefined') {
            return next();
        }
        if(!updates.$set.password) {
            return next();
        }
        this.getUpdate().$set.password = await bcrypt.hash( updates.$set.password , await bcrypt.genSalt(13));
        next();
    }
    catch (error) {
        next(error);
    }
});

//check password validity
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return bcrypt.compare(newPassword, this.password);
    }
    catch (error) {
        throw new Error(error);
    }
}


const User = mongoose.model('user', userSchema);
module.exports = User;