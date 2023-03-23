const statusMessages = require('../constants/statusMessages')
const endPoints = require('../constants/endPoints')
const { validationResult } = require('express-validator')
const superagent = require('superagent')
const TransactionModel = require('../models/TransactionModel')

class WalletController {
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

    async getLivePrice(req, res) {
        try {
            const livePrice = await superagent.get(endPoints.liveEthPriceEndPoint)
            return res.status(200).json(JSON.parse(livePrice.text))
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}

module.exports = WalletController