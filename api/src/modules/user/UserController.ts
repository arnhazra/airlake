import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import otptool from 'otp-without-db'
import { validationResult } from 'express-validator'
import statusMessages from '../../constants/statusMessages'
import UserModel from './UserModel'
import sendmail from '../../utils/mailer'
import { setTokenInRedis, getTokenFromRedis, removeTokenFromRedis } from '../../utils/redisHelper'
import otherConstants from '../../constants/otherConstants'
import { envConfig } from '../../../config/envConfig'
import AnalyticsController from '../analytics/AnalyticsController'

export default class UserController {
    public otpKey: string
    public authPrivateKey: string
    public subscriptionSecret: string
    public analyticsController: AnalyticsController

    constructor() {
        this.otpKey = envConfig.otpKey
        this.authPrivateKey = envConfig.authPrivateKey
        this.subscriptionSecret = envConfig.subscriptionSecret
        this.analyticsController = new AnalyticsController()
    }

    async generateAuthCode(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email } = req.body

            try {
                let user = await UserModel.findOne({ email })
                const otp = Math.floor(100000 + Math.random() * 900000)
                const hash = otptool.createNewOTP(email, otp, this.otpKey, 5, 'sha256')
                await sendmail(email, otp)
                if (user) {
                    return res.status(200).json({ hash, newuser: false, msg: statusMessages.authCodeEmail })
                }

                else {
                    return res.status(200).json({ hash, newuser: true, msg: statusMessages.authCodeEmail })
                }
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }

    async verifyAuthCode(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email, otp, hash, privateKey } = req.body

            try {
                const isOTPValid = otptool.verifyOTP(email, otp, hash, this.otpKey, 'sha256')

                if (isOTPValid) {
                    let user = await UserModel.findOne({ email })

                    if (user) {
                        const redisAccessToken = await getTokenFromRedis(user.id)

                        if (redisAccessToken) {
                            const accessToken = redisAccessToken
                            return res.status(200).json({ accessToken })
                        }

                        else {
                            const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
                            const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: 'RS512' })
                            await setTokenInRedis(user.id, accessToken)
                            return res.status(200).json({ accessToken })
                        }
                    }

                    else {
                        const { name } = req.body || otherConstants.undefinedName
                        user = new UserModel({ name, email, privateKey })
                        const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
                        const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: 'RS512' })
                        await setTokenInRedis(user.id, accessToken)
                        await user.save()
                        return res.status(200).json({ accessToken, user })
                    }
                }

                else {
                    return res.status(400).json({ msg: statusMessages.invalidAuthCode })
                }
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }

    async userDetails(req: Request, res: Response) {
        try {
            const user = await UserModel.findById(req.headers.id).select('-date')
            const { basicSubscriptionPrice, standardSubscriptionPrice, premiumSubscriptionPrice, basicSubscriptionReqLimit, standardSubscriptionReqLimit, premiumSubscriptionReqLimit } = envConfig
            const subscriptionCharges = { basicSubscriptionPrice, standardSubscriptionPrice, premiumSubscriptionPrice }
            const subscriptionReqLimit = { basicSubscriptionReqLimit, standardSubscriptionReqLimit, premiumSubscriptionReqLimit }
            let subscriptionKeyUsage = 0
            if (user) {
                try {
                    if (user.subscriptionKey.length) {
                        jwt.verify(user.subscriptionKey, this.subscriptionSecret, { algorithms: ['HS256'] })
                        subscriptionKeyUsage = (await this.analyticsController.getAnalyticsBySubKey(user.subscriptionKey)).length
                    }
                    return res.status(200).json({ user, subscriptionCharges, subscriptionKeyUsage, subscriptionReqLimit })
                } catch (error) {
                    const subscriptionKey = ''
                    await UserModel.findByIdAndUpdate(user._id, { subscriptionKey })
                    return res.status(200).json({ user, subscriptionCharges, subscriptionKeyUsage, subscriptionReqLimit })
                }
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

    async subscribe(req: Request, res: Response) {
        const { tokenId, selectedPlan } = req.body
        const userId = req.headers.id

        try {
            const payload = { userId, tokenId, selectedPlan }
            const subscriptionKey = jwt.sign(payload, this.subscriptionSecret, { algorithm: 'HS256', expiresIn: '30d' })
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