import mongoose from 'mongoose'

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

const UserModel = mongoose.model('user', UserSchema)

export default UserModel