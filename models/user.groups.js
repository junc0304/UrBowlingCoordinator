const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

//score summary for a user
const userGroupSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    group: { 
        group_id: { type: ObjectId }
    },
});

userGroupSchema.pre('save', async function (next) {
    try {
        

    }
    catch (error) {
        next(error);
    }

});

const UsersScores = mongoose.model('users.score', userGroupSchema);
module.exports = UsersScores;
