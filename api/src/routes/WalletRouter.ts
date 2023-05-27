import express, { Router } from 'express'
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
        this.router.post('/createtransaction', authorize, this.walletController.createTransaction.bind(this.walletController))
        this.router.post('/transactions', authorize, this.walletController.getTransactions.bind(this.walletController))
    }

    getRouter() {
        return this.router
    }
}