import express, { Router } from 'express'
import { check } from 'express-validator'
import authorize from '../middlewares/authorize'
import AccountController from '../controllers/AccountController'

export default class AccountRouter {
    public router: Router
    public accountController: AccountController

    constructor() {
        this.router = express.Router()
        this.accountController = new AccountController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/verifyuser', authorize, this.accountController.verifyUser.bind(this.accountController))
        this.router.post('/signout', authorize, this.accountController.signOut.bind(this.accountController))
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
            this.accountController.createTransaction.bind(this.accountController)
        )

        this.router.post('/transactions', authorize, this.accountController.getTransactions.bind(this.accountController))
    }

    getRouter() {
        return this.router
    }
}