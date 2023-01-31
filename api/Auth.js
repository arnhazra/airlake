const router = require('express').Router()
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const otptool = require('otp-without-db')
const crypto = require('crypto')
const { check, validationResult } = require('express-validator')
const UserModel = require('../models/UserModel')
const sendmail = require('../functions/SendMail')
const authorize = require('../middlewares/authorize')
const statusMessages = require('../constants/Messages')
const endPoints = require('../constants/Endpoints')

const JWT_SECRET = process.env.JWT_SECRET
const OTP_SECRET = process.env.OTP_SECRET

router.post(
    '/generateauthcode',

    [
        check('email', 'Invalid Email Format').isEmail()
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email } = req.body

            try {
                let user = await UserModel.findOne({ email })
                const otp = crypto.randomBytes(4).toString('hex')
                const hash = otptool.createNewOTP(email, otp, key = OTP_SECRET, expiresAfter = 5, algorithm = 'sha256')
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
)

router.post(
    '/verifyauthcode',

    [
        check('email', 'Provide valid email').isEmail(),
        check('otp', 'Invalid OTP format').isLength(6),
        check('hash', 'Invalid Hash').notEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email, otp, hash } = req.body

            try {
                const isOTPValid = otptool.verifyOTP(email, otp, hash, key = OTP_SECRET, algorithm = 'sha256')

                if (isOTPValid) {
                    let user = await UserModel.findOne({ email })

                    if (user) {
                        if (user.accessToken) {
                            const accessToken = user.accessToken
                            return res.status(200).json({ authenticated: true, accessToken })
                        }

                        else {
                            const payload = { id: user.id, iss: endPoints.tokenIssuer }
                            const accessToken = jwt.sign(payload, JWT_SECRET)
                            user.accessToken = accessToken
                            await user.save()
                            return res.status(200).json({ authenticated: true, accessToken })
                        }
                    }

                    else {
                        const { name } = req.body || 'No Name'
                        user = new UserModel({ name, email })
                        const payload = { id: user.id, iss: endPoints.tokenIssuer }
                        const accessToken = jwt.sign(payload, JWT_SECRET)
                        user.accessToken = accessToken
                        await user.save()
                        return res.status(200).json({ authenticated: true, accessToken, user })
                    }
                }

                else {
                    return res.status(400).json({ authenticated: false, msg: statusMessages.invalidAuthCode })
                }
            }

            catch (error) {
                return res.status(500).json({ authenticated: false, msg: statusMessages.connectionError })
            }
        }
    }
)

router.post(
    '/useauth',

    authorize,

    async (req, res) => {
        try {
            const user = await UserModel.findById(req.id).select('-password').select('-date')

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
)

router.post(
    '/signout',

    authorize,

    async (req, res) => {
        try {
            const user = await UserModel.findById(req.id)
            user.accessToken = ''
            await user.save()
            return res.status(200).json({ msg: statusMessages.signOutSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

module.exports = router