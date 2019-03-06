const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const groupsUserSchema = new Schema({
    group_id: { type: String, required: true },
    users: [{
        user_id: { type: ObjectId, required: true },
        average_score: {type: Number}, 
        role: { type: String, enum: ['owner', 'admin' , 'user']}
    }]
});



groupsUserSchema.pre('save', async function (next) {
    try {
        
        this.users = this.users.push({user_id: this.user_id})

    }
    catch (error) {
        next(error);
    }

});


const GroupUsers = mongoose.model('groups.user', groupsUserSchema);
module.exports = GroupUsers;