const statusMessages = require('../constants/statusMessages')
const { validationResult } = require('express-validator')
const DatasetModel = require('../models/DatasetModel')
const SubscriptionModel = require('../models/SubscriptionModel')
const sortOptions = require('../utils/sortOptions')

class DatasetController {
    async getDatasetSortAndFilters(req, res) {
        try {
            const filterCategories = await DatasetModel.find().distinct('category')
            filterCategories.push('All')
            return res.status(200).json({ sortOptions: Object.keys(sortOptions), filterCategories })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getDatasetLibrary(req, res) {
        const selectedFilterCategory = req.body.selectedFilter === 'All' ? '' : req.body.selectedFilter
        const selectedSortOption = sortOptions[req.body.selectedSortOption]
        const searchQuery = req.body.searchQuery || ''
        const datasetRequestNumber = req.body.datasetRequestNumber || 1
        const itemsPerRequest = 12

        try {
            const datasets = await DatasetModel.find({ name: { $regex: searchQuery, $options: 'i' }, category: { $regex: selectedFilterCategory } })
                .sort(selectedSortOption)
                .limit(itemsPerRequest * datasetRequestNumber)
                .select('-data -description')
            return res.status(200).json({ datasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getMySubscriptions(req, res) {
        try {
            const subscribedDatasetIds = await SubscriptionModel.find({ userId: req.id }).distinct('datasetId');
            const subscribedDatasets = await DatasetModel.find({ _id: { $in: subscribedDatasetIds } }).select('-data -description');
            return res.status(200).json({ subscribedDatasets });
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError });
        }
    }

    async viewDataset(req, res) {
        try {
            const { datasetId } = req.body
            const totalData = await DatasetModel.findById(datasetId)
            const dataLength = totalData.data.length
            const metadata = { name: totalData.name, category: totalData.category, description: totalData.description, price: totalData.price }
            return res.status(200).json({ metadata, dataLength })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async findSimilarDatasets(req, res) {
        try {
            const { datasetId } = req.body
            const { category } = await DatasetModel.findById(datasetId).select('-data')
            const similarDatasets = await DatasetModel.find({ category: category }).select('-data')
            return res.status(200).json({ similarDatasets })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async datasetPreview(req, res) {
        try {
            const data = await DatasetModel.findById(req.params.datasetId).select('data')
            const previewdata = data.data[0]
            return res.status(200).json({ previewdata })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async datasetFullview(req, res) {
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

    async createDataset(req, res) {
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
}

module.exports = DatasetController