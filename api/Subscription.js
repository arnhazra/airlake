const express = require('express')
const statusMessages = require('../constants/Messages')
const authorize = require('../middlewares/authorize')
const SubscriptionModel = require('../models/SubscriptionModel')
const DatasetModel = require('../models/DatasetModel')
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
            const subscriptions = await SubscriptionModel.find({ userId: req.id });
            const subscribedDatasetPromises = subscriptions.map(async (sub) => {
                const subscribedDataset = await DatasetModel.find({ _id: sub.datasetId }).select('-data').select('-description');
                return subscribedDataset[0];
            });
            const subscribedDatasets = await Promise.all(subscribedDatasetPromises);
            return res.status(200).json({ subscribedDatasets });
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError });
        }
    }
)

module.exports = router