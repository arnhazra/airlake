const express = require('express')
const { check, validationResult } = require('express-validator')
const statusMessages = require('../constants/Messages')
const authorize = require('../middlewares/authorize')
const DatasetModel = require('../models/DatasetModel')
const SubscriptionModel = require('../models/SubscriptionModel')
const sortObjects = require('../utils/sortObjects')
const router = express.Router()

router.post(
    '/filtercategories',

    authorize,

    async (req, res) => {
        try {
            const categories = await DatasetModel.find().distinct('category')
            categories.push('All')
            return res.status(200).json({ categories })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/sortoptions',

    authorize,

    async (req, res) => {
        try {
            const options = Object.keys(sortObjects)
            return res.status(200).json({ options })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/library',

    authorize,

    async (req, res) => {
        const selectedFilterCategory = req.body.selectedFilter === 'All' ? {} : { category: req.body.selectedFilter }
        const selectedSortOption = sortObjects[req.body.selectedSortOption]
        const searchInput = req.body.searchInput.length > 0 && req.body.searchInput

        try {
            const datasets = await DatasetModel.find(selectedFilterCategory).select('-data').select('-description').sort(selectedSortOption)

            if (req.body.searchInput.length > 0) {
                const filteredDataSets = datasets.filter((dataset) => {
                    return dataset.name.toLowerCase().includes(searchInput)
                })
                return res.status(200).json({ datasets: filteredDataSets })
            }

            else {
                return res.status(200).json({ datasets })
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
                const subscribedDataset = await DatasetModel.findById(sub.datasetId).select('-data').select('-description');
                return subscribedDataset;
            });
            const subscribedDatasets = await Promise.all(subscribedDatasetPromises);
            return res.status(200).json({ subscribedDatasets });
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError });
        }
    }
)

router.post(
    '/viewone/:datasetId',

    authorize,

    async (req, res) => {
        try {
            const totalData = await DatasetModel.findById(req.params.datasetId)
            const dataLength = totalData.data.length
            const metadata = { name: totalData.name, category: totalData.category, description: totalData.description, price: totalData.price }
            return res.status(200).json({ metadata, dataLength })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/findsimilar/:datasetId',

    authorize,

    async (req, res) => {
        try {
            const { category } = await DatasetModel.findById(req.params.datasetId).select('-data')
            const similarDatasets = await DatasetModel.find({ category: category }).select('-data')
            return res.status(200).json({ similarDatasets })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }
)

router.get(
    '/data/preview/:datasetId',

    async (req, res) => {
        try {
            const data = await DatasetModel.findById(req.params.datasetId).select('data')
            const previewdata = data.data[0]
            return res.status(200).json({ previewdata })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }
)

router.get(
    '/data/view/:datasetId/:subscriptionId',

    async (req, res) => {
        try {
            const subscriptionId = req.params.subscriptionId
            const datasetId = req.params.datasetId
            const subscription = await SubscriptionModel.find({ _id: subscriptionId, datasetId: datasetId })
            if (subscription.length > 0) {
                const data = await DatasetModel.findById(datasetId).select('data')
                return res.status(200).json({ data })
            }

            else {
                throw new Error
            }
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/create',

    [
        check('name', 'Name must not be empty').notEmpty(),
        check('category', 'Category must not be empty').notEmpty(),
        check('description', 'Description must not be empty').notEmpty(),
        check('data', 'data must be an array of object').isArray(),
        check('price', 'Price must not be empty').isNumeric()
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { name, category, description, data, price } = req.body

            try {
                const dataset = new DatasetModel({ name, category, description, data, price })
                await dataset.save()
                return res.status(200).json({ msg: statusMessages.transactionCreationSuccess })
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }
)

router.post(
    '/viewrecommended',

    async (req, res) => {
        try {
            DatasetModel.aggregate([
                { $match: { $expr: { $gt: [{ $strLenCP: "$description" }, 300] } } },
                { $project: { data: 0 } },
                { $sample: { size: 1 } }
            ]).exec((err, result) => {
                const recommendedDataset = result[0]
                res.status(200).json({ recommendedDataset })
            });
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }
)

module.exports = router