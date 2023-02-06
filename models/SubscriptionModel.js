const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    datasetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dataset'
    },
}, { versionKey: false })

module.exports = SubscriptionModel = mongoose.model('subscription', SubscriptionSchema)