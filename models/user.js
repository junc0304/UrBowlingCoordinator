const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//user account schema
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, lowercase: true, required: true},
    password: {type: String, required: true},
    description: {type: String}
});

//convert password salt/hash before save 
userSchema.pre('save', async function(next) {
    try{ 
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(13));
        next();
    }
    catch(error){
        next(error);
    }
});

//check password validity
userSchema.isValidPassword = async function(newPassword) {
    try{
        return bcrypt.compare(newPassword, this.password)
    }
    catch(error){
        throw new Error(error);
    }
};

const User = mongoose.model('user', userSchema);
module.exports = User;