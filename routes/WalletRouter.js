const express = require('express')
const { check } = require('express-validator')
const authorize = require('../middlewares/authorize')
const WalletController = require('../controllers/WalletController')

class WalletRouter {
    constructor() {
        this.router = express.Router()
        this.walletController = new WalletController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post(
            '/createtx',
            authorize,
            [
                check('transactionType', 'Transaction Type must not be empty').notEmpty(),
                check('fromAddress', 'Fromaddress must not be empty').notEmpty(),
                check('lstAmount', 'LST Amount must not be empty').notEmpty(),
                check('ethAmount', 'ethAmount must not be empty').notEmpty(),
                check('txHash', 'txHash must not be empty').notEmpty(),
            ],
            this.walletController.createTransaction.bind(this.walletController)
        )

        this.router.post('/transactions', authorize, this.walletController.getTransactions.bind(this.walletController))
        this.router.post('/getliveprice', authorize, this.walletController.getLivePrice.bind(this.walletController))
    }

    getRouter() {
        return this.router
    }
}

module.exports = WalletRouter
