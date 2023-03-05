const jwt = require('jsonwebtoken')
const statusMessages = require('../constants/Messages')
const { getTokenFromRedis } = require('../functions/UseRedis')
const UserModel = require('../models/UserModel')
const dotenv = require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

module.exports = async function (req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const decoded = jwt.verify(accessToken, JWT_SECRET)
            req.id = decoded.id
            const user = await UserModel.findById(decoded.id)

            if (user) {
                const redisAccessToken = await getTokenFromRedis(user.id)
                if (!redisAccessToken) {
                    return res.status(401).json({ msg: statusMessages.invalidToken })
                }

                else if (redisAccessToken === accessToken) {
                    next()
                }

                else {
                    return res.status(401).json({ msg: statusMessages.invalidToken })
                }
            }

            else {
                return res.status(401).json({ msg: statusMessages.invalidUser })
            }
        }

        catch (error) {
            console.log(error)
            if (error.name) {
                if (error.name === 'JsonWebTokenError' || error.name === 'SyntaxError') {
                    return res.status(401).json({ msg: statusMessages.invalidToken })
                }

                else {

                    return res.status(500).json({ msg: statusMessages.connectionError })
                }
            }

            else {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }
}