import { Request, Response } from 'express'
import statusMessages from '../constants/statusMessages'
import UserModel from '../models/UserModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export default class SubscriptionController {
    public hsaJwtSecret: string

    constructor() {
        dotenv.config()
        this.hsaJwtSecret = process.env.SUB_HS_JWT_SECRET
    }

    async subscribe(req: Request, res: Response) {
        const { tokenId } = req.body
        const userId = req.headers.id

        try {
            const payload = { userId, tokenId }
            const subscriptionKey = jwt.sign(payload, this.hsaJwtSecret, { algorithm: 'HS256', expiresIn: '1y' })
            await UserModel.findByIdAndUpdate(userId, { subscriptionKey })
            return res.status(200).json({ msg: statusMessages.transactionCreationSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async unsubscribe(req: Request, res: Response) {
        const userId = req.headers.id

        try {
            const subscriptionKey = ''
            await UserModel.findByIdAndUpdate(userId, { subscriptionKey })
            return res.status(200).json({ msg: statusMessages.transactionCreationSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}