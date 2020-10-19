const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const validator = require("validator");
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {
    encryptPassword
} = require('./../config/util');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 30,
        trim: true,
        required: true,
        min: 5
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        max: 40,
        trim: true,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value))
                return 'Invalid Email'
        }
    }
});


userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password'))
        user.password = await encryptPassword(user.password);
    next()
});

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err)
            return callback(err)
        callback(null, isMatch)
    })
}



userSchema.plugin(beautifyUnique);
userSchema.plugin(beautifyUnique, {
    defaultMessage: `Duplication Error`
})

const userModel = mongoose.model('userCollection', userSchema);
module.exports = userModel;