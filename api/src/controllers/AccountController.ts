import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import statusMessages from '../constants/statusMessages'
import UserModel from '../models/UserModel'
import TransactionModel from '../models/TransactionModel'
import { removeTokenFromRedis } from '../utils/UseRedis'

export default class AccountController {
    async checkAuth(req: Request, res: Response) {
        try {
            const user = await UserModel.findById(req.headers.id).select('-date')

            if (user) {
                return res.status(200).json({ user })
            }

            else {
                return res.status(401).json({ msg: statusMessages.unauthorized })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async signOut(req: Request, res: Response) {
        try {
            await removeTokenFromRedis(req.headers.id as string)
            return res.status(200).json({ msg: statusMessages.signOutSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async createTransaction(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { transactionType, fromAddress, lftAmount, ethAmount, txHash } = req.body

            try {
                const transaction = new TransactionModel({ owner: req.headers.id, transactionType, fromAddress, lftAmount, ethAmount, txHash })
                await transaction.save()
                return res.status(200).json({ msg: statusMessages.transactionCreationSuccess, transaction })
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.transactionCreationError })
            }
        }
    }

    async getTransactions(req: Request, res: Response) {
        try {
            const transactions = await TransactionModel.find({ owner: req.headers.id }).sort({ date: -1 })
            return res.status(200).json({ transactions })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}