import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import statusMessages from '../constants/statusMessages'
import UserModel from '../models/UserModel'
import TransactionModel from '../models/TransactionModel'
import { removeTokenFromRedis } from '../utils/UseRedis'

export default class AccountController {
    async verifyUser(req: Request, res: Response) {
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
}