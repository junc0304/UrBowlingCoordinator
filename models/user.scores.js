const mongoose = require('mongoose');
const Score = require('./score');
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

//score summary for a user
const userScoreSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    score: {
        averageScore: { type: Number },
        highScore: { type: Number },
        gameCount: { Score },
    },
    recent_score: { type: ObjectId },
    updated: Date
});

const UsersScores = mongoose.model('users.score', userScoreSchema);
module.exports = UsersScores;
