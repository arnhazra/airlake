const statusMessages = require('../constants/Messages')
const SubscriptionModel = require('../models/SubscriptionModel')

class SubscriptionController {
    async subscribe(req, res) {
        const { datasetId } = req.body || '63dde6b1ef40d3df73fde562'
        const userId = req.id

        try {
            const subscription = new SubscriptionModel({ userId, datasetId })
            await subscription.save()
            return res.status(200).json({ msg: statusMessages.subscriptionSuccess, subscription })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async checkSubscriptionStatus(req, res) {
        const { datasetId } = req.body || '63dde6b1ef40d3df73fde562'
        const userId = req.id

        try {
            const subscription = await SubscriptionModel.findOne({ userId, datasetId })
            if (subscription === null) {
                return res.status(200).json({ isSubscribed: false })
            }
            else {
                return res.status(200).json({ isSubscribed: true, subscriptionId: subscription.id })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}

module.exports = SubscriptionController