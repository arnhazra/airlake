const express = require('express')
const statusMessages = require('../constants/Messages')
const authorize = require('../middlewares/authorize')
const SubscriptionModel = require('../models/SubscriptionModel')
const router = express.Router()

router.post(
    '/subscribe/:id',

    authorize,

    async (req, res) => {
        const datasetId = req.params.id
        const userId = req.id

        try {
            const subscription = new SubscriptionModel({ userId, datasetId })
            await subscription.save()
            return res.status(200).json({ msg: statusMessages.subscriptionSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/issubscribed/:id',

    authorize,

    async (req, res) => {
        const datasetId = req.params.id
        const userId = req.id

        try {
            const subscription = await SubscriptionModel.findOne({ userId, datasetId })
            if (subscription === null) {
                return res.status(200).json({ isSubscribed: false })
            }
            else {
                return res.status(200).json({ isSubscribed: true })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/mysubscriptions',

    authorize,

    async (req, res) => {
        try {
            const datasets = await DatasetModel.find().select('-data').sort({ _id: -1 })
            return res.status(200).json({ datasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

module.exports = router