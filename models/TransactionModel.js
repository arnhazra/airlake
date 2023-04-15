const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    transactionType: {
        type: String,
        required: true
    },

    fromAddress: {
        type: String,
        required: true
    },

    lstAmount: {
        type: String,
        required: true
    },

    ethAmount: {
        type: String,
        required: true
    },

    txHash: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

module.exports = TransactionModel = mongoose.model('transaction', TransactionSchema)