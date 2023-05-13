import { Request, Response } from 'express'
import statusMessages from '../constants/statusMessages'
import SubscriptionModel from '../models/SubscriptionModel'

export default class SubscriptionController {
    async subscribe(req: Request, res: Response) {
        const { datasetId, tokenId } = req.body
        const userId = req.headers.id

        try {
            const subscription = new SubscriptionModel({ userId, datasetId, tokenId })
            await subscription.save()
            return res.status(200).json({ msg: statusMessages.transactionCreationSuccess, subscription })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async unsubscribe(req: Request, res: Response) {
        const { datasetId } = req.body
        const userId = req.headers.id

        try {
            await SubscriptionModel.findOneAndDelete({ datasetId, userId })
            return res.status(200).json({ msg: statusMessages.transactionCreationSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async checkSubscriptionStatus(req: Request, res: Response) {
        const { datasetId } = req.body
        const userId = req.headers.id

        try {
            const subscription = await SubscriptionModel.findOne({ userId, datasetId })
            if (subscription === null) {
                return res.status(200).json({ isSubscribed: false })
            }
            else {
                return res.status(200).json({ isSubscribed: true, subscriptionId: subscription.id, tokenId: subscription.tokenId })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}