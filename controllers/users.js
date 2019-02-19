const User = require('../models/user');

module.exports = {

    signUp: async (req, res, next) => {
        console.log('sign up requested');
        
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        //if email already exists, return error

        if(userExist)
            return res.status(403).json({error: 'Email is already in use'});

        const newUser = new User({ email, password });
        await newUser.save();

        console.log('account created', newUser.email);

        res.status(200).json({ message: 'Signed up!'});
    },
    
    signIn: async (req, res, next) => {
        console.log('sign in requested');

        const { email, password } = req.body;

        const userFound = await User.findOne({email});
        
        console.log(userFound);
        if(!userFound.password===password)
            res.status(403).json({error: 'You\'ve entered wrong Email / Password.'})
    
        console.log('user verified', req.body);

        res.status(200).json({ message: 'Signed in!'});
    }
}