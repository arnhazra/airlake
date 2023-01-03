//Import Statements
const express = require('express')
const { check, validationResult } = require('express-validator')
const authorize = require('../middlewares/authorize')
const UserModel = require('../models/UserModel')
const WalletModel = require('../models/WalletModel')
const router = express.Router()

//Create Transaction Route
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
                return res.status(200).json({ msg: 'New Transaction Created', transaction })
            }

            catch (error) {
                return res.status(500).json({ msg: 'Error Creating ERC20 Transaction' })
            }
        }
    }
)

//Transaction Dashboard Route
router.post(
    '/dashboard',

    authorize,

    async (req, res) => {
        try {
            const transactions = await WalletModel.find({ owner: req.id }).sort({ date: -1 })
            return res.status(200).json({ transactions })
        }

        catch (error) {
            return res.status(500).json({ msg: 'Connection Error' })
        }
    }
)

//Export Statement
module.exports = router