const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const scoreSchema = new Schema({
    user_id : { type: ObjectId , required: true},
    scores: [{ 
        date: Date,
        score: Number,
    }]
});

scoreSchema.pre('save', async function (next) {
    try {
       
    }
    catch (error) {
        next(error);
    }

});

const Score = mongoose.model('groups.user', scoreSchema);
module.exports = Score;