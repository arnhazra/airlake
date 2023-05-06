import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    datasetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dataset'
    },

    tokenId: {
        type: Number,
        required: true
    },
}, { versionKey: false })

const SubscriptionModel = mongoose.model('subscription', SubscriptionSchema)

export default SubscriptionModel