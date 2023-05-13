import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import arraySort from 'array-sort'
import statusMessages from '../constants/statusMessages'
import DatasetModel from '../models/DatasetModel'
import SubscriptionModel from '../models/SubscriptionModel'

export default class DatasetController {
    async createDataset(req: Request, res: Response) {
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

    async getDatasetFilters(req: Request, res: Response) {
        try {
            const filterCategories = await DatasetModel.find().distinct('category')
            filterCategories.push('All')
            filterCategories.sort()
            return res.status(200).json({ filterCategories })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getDataPlatform(req: Request, res: Response) {
        const selectedFilterCategory = req.body.selectedFilter === 'All' ? '' : req.body.selectedFilter
        const selectedSortOption = req.body.selectedSortOption === '-name' ? { reverse: true } : { reverse: false }
        const searchQuery = req.body.searchQuery || ''
        const offset = req.body.offset || 0
        const limit = 24

        try {
            let datasets = await DatasetModel.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ],
                category: { $regex: selectedFilterCategory }
            }).select('-data -description')
                .skip(offset)
                .limit(limit)

            datasets = arraySort(datasets, 'name', selectedSortOption)
            return res.status(200).json({ datasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getMySubscriptions(req: Request, res: Response) {
        try {
            const subscribedDatasetIds = await SubscriptionModel.find({ userId: req.headers.id }).distinct('datasetId')
            const subscribedDatasets = await DatasetModel.find({ _id: { $in: subscribedDatasetIds } }).select('-data -description')
            return res.status(200).json({ subscribedDatasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async viewDataset(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const totalData = await DatasetModel.findById(datasetId).select('-data')
            return res.status(200).json(totalData)
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async findSimilarDatasets(req: Request, res: Response) {
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

    async getMetadata(req: Request, res: Response) {
        try {
            const data = await DatasetModel.findById(req.params.datasetId).select('data')
            const previewdata = data.data[0]
            return res.status(200).json({ previewdata })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async getData(req: Request, res: Response) {
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
}