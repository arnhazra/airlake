import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import arraySort from 'array-sort'
import statusMessages from '../../constants/statusMessages'
import DatasetModel from './DatasetModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../user/UserModel'
import { envConfig } from '../../../config/envConfig'

export default class DatasetController {
    public subscriptionSecret: string

    constructor() {
        dotenv.config()
        this.subscriptionSecret = envConfig.subscriptionSecret
    }

    async createDataset(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { name, category, description, data } = req.body

            try {
                const dataset = new DatasetModel({ name, category, description, data })
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

    async findDatasets(req: Request, res: Response) {
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
            const previewdata = data.data.slice(-5)
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
            const subscription = jwt.verify(subscriptionId, this.subscriptionSecret, { algorithms: ['HS256'] })
            const userId = (subscription as any).userId
            const { subscriptionKey } = await UserModel.findById(userId)
            if (subscriptionId === subscriptionKey) {
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