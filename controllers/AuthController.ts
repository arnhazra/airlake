import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import otptool from 'otp-without-db'
import otpGenerator from 'otp-generator'
import { validationResult } from 'express-validator'
import statusMessages from '../constants/statusMessages'
import endPoints from '../constants/endPoints'
import UserModel from '../models/UserModel'
import sendmail from '../functions/SendMail'
import { setTokenInRedis, getTokenFromRedis } from '../functions/UseRedis'

dotenv.config()

export default class AuthController {
    public otpKey: string
    public rsaPrivateKey: string

    constructor() {
        this.otpKey = process.env.OTP_KEY
        this.rsaPrivateKey = process.env.RSA_PRIVATE_KEY
    }

    async generateAuthCode(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email } = req.body

            try {
                let user = await UserModel.findOne({ email })
                const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
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

    async verifyAuthCode(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email, otp, hash } = req.body

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
                            const payload = { id: user.id, email: user.email, iss: endPoints.tokenIssuer }
                            const accessToken = jwt.sign(payload, this.rsaPrivateKey, { algorithm: 'RS512' })
                            await setTokenInRedis(user.id, accessToken)
                            await user.save()
                            return res.status(200).json({ accessToken })
                        }
                    }

                    else {
                        const { name } = req.body || 'No Name'
                        user = new UserModel({ name, email })
                        const payload = { id: user.id, email: user.email, iss: endPoints.tokenIssuer }
                        const accessToken = jwt.sign(payload, this.rsaPrivateKey, { algorithm: 'RS512' })
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
}