const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.statics.signup = async function(email,password){
    if(!email || !password)
        throw Error('All fields must be filled');

    if(!validator.isEmail(email))
        throw Error('Enter a valid Mail ID');

    if(!validator.isStrongPassword(password))
        throw Error('Weak Password');

    const exists = await this.findOne({email});

    if(exists)
        throw Error('Email in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hash});

    return user;
};

userSchema.statics.login = async function(email,password){
    if(!email || !password)
        throw Error('All fields must be filled');

    const user = await this.findOne({email});

    if(!user)
        throw Error('User does not exist');

    const match = await bcrypt.compare(password,user.password);

    if(!match)
        throw Error('Password Incorrect');
    
    return user;
};

module.exports = new mongoose.model('User',userSchema);