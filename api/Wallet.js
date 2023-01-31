const express = require('express')
const { check, validationResult } = require('express-validator')
const authorize = require('../middlewares/authorize')
const superagent = require('superagent')
const WalletModel = require('../models/WalletModel')
const statusMessages = require('../constants/Messages')
const endPoints = require('../constants/Endpoints')
const router = express.Router()

router.post(
    '/createtx',

    authorize,

    [
        check('transactionType', 'Transaction Type must not be empty').notEmpty(),
        check('fromAddress', 'Fromaddress must not be empty').notEmpty(),
        check('flgAmount', 'flgAmount must not be empty').notEmpty(),
        check('ethAmount', 'ethAmount must not be empty').notEmpty(),
        check('txHash', 'txHash must not be empty').notEmpty()
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { transactionType, fromAddress, flgAmount, ethAmount, txHash } = req.body

            try {
                const transaction = new WalletModel({ owner: req.id, transactionType, fromAddress, flgAmount, ethAmount, txHash })
                await transaction.save()
                return res.status(200).json({ msg: statusMessages.transactionCreationSuccess, transaction })
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.transactionCreationError })
            }
        }
    }
)

router.post(
    '/transactions',

    authorize,

    async (req, res) => {
        try {
            const transactions = await WalletModel.find({ owner: req.id }).sort({ date: -1 })
            return res.status(200).json({ transactions })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

router.post(
    '/getliveprice',

    authorize,

    async (req, res) => {
        try {
            const livePrice = await superagent.get(endPoints.liveEthPriceEndPoint)
            return res.status(200).json(JSON.parse(livePrice.text))
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
)

module.exports = router