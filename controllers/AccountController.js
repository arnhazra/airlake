const { validationResult } = require('express-validator')
const statusMessages = require('../constants/statusMessages')
const UserModel = require('../models/UserModel')
const TransactionModel = require('../models/TransactionModel')
const { removeTokenFromRedis } = require('../functions/UseRedis')

class AccountController {
    async checkAuth(req, res) {
        try {
            const user = await UserModel.findById(req.id).select('-date')

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

    async signOut(req, res) {
        try {
            await removeTokenFromRedis(req.id)
            return res.status(200).json({ msg: statusMessages.signOutSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async createTransaction(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { transactionType, fromAddress, lstAmount, ethAmount, txHash } = req.body

            try {
                const transaction = new TransactionModel({ owner: req.id, transactionType, fromAddress, lstAmount, ethAmount, txHash })
                await transaction.save()
                return res.status(200).json({ msg: statusMessages.transactionCreationSuccess, transaction })
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.transactionCreationError })
            }
        }
    }

    async getTransactions(req, res) {
        try {
            const transactions = await TransactionModel.find({ owner: req.id }).sort({ date: -1 })
            return res.status(200).json({ transactions })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}

module.exports = AccountController