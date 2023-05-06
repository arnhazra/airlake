const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        default: 'consumer'
    }
}, { versionKey: false })

module.exports = UserModel = mongoose.model('user', UserSchema)