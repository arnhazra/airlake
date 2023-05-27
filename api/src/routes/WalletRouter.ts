import express, { Router } from 'express'
import { check } from 'express-validator'
import authorize from '../middlewares/authorize'
import WalletController from '../controllers/WalletController'

export default class WalletRouter {
    public router: Router
    public walletController: WalletController

    constructor() {
        this.router = express.Router()
        this.walletController = new WalletController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post(
            '/createtransaction',
            authorize,
            [
                check('transactionType', 'Transaction Type must not be empty').notEmpty(),
                check('fromAddress', 'Fromaddress must not be empty').notEmpty(),
                check('lftAmount', 'LFT Amount must not be empty').notEmpty(),
                check('ethAmount', 'ethAmount must not be empty').notEmpty(),
                check('txHash', 'txHash must not be empty').notEmpty(),
            ],
            this.walletController.createTransaction.bind(this.walletController)
        )

        this.router.post('/transactions', authorize, this.walletController.getTransactions.bind(this.walletController))
    }

    getRouter() {
        return this.router
    }
}