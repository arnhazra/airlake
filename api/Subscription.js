const express = require('express')
const statusMessages = require('../constants/Messages')
const authorize = require('../middlewares/authorize')
const SubscriptionModel = require('../models/SubscriptionModel')
const router = express.Router()

router.post(
    '/subscribe/:datasetId',

    authorize,

    async (req, res) => {
        const datasetId = req.params.datasetId
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
)

router.post(
    '/issubscribed/:datasetId',

    authorize,

    async (req, res) => {
        const datasetId = req.params.datasetId
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
)

module.exports = router