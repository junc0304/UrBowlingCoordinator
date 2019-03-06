const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const groupsUserSchema = new Schema({
    group_id: { type: String, required: true },
    users: [{
        user_id: { type: ObjectId, required: true },
        average_score: {type: Number}, 
        role: { type: String, enum: ['owner', 'admin' , 'user'], required: true}
    }]
});



groupsUserSchema.pre('save', async function (next) {
    try {

    }
    catch (error) {
        next(error);
    }

});


const GroupUsers = mongoose.model('groups.user', groupsUserSchema);
module.exports = GroupUsers;