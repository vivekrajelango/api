const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        unique: false
    },
    lastName: {
        type: String,
        require: true,
        unique: false
    },
    userId: {
        type: Number,
        require:true,
        unique:true
    }
})

const User = mongoose.model('new-user', userSchema);

module.exports = User

