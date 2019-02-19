const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user account schema
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, lowercase: true, required: true},
    password: {type: String, required: true},
    description: {type: String}
});

const User = mongoose.model('user', userSchema);
module.exports = User;