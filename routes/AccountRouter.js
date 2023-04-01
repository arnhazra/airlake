const express = require('express')
const authorize = require('../middlewares/authorize')
const AccountController = require('../controllers/AccountController')
const { check } = require('express-validator')

class AccountRouter {
    constructor() {
        this.router = express.Router()
        this.accountController = new AccountController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/checkauth', authorize, this.accountController.checkAuth.bind(this.accountController))
        this.router.post('/signout', authorize, this.accountController.signOut.bind(this.accountController))
        this.router.post(
            '/createtransaction',
            authorize,
            [
                check('transactionType', 'Transaction Type must not be empty').notEmpty(),
                check('fromAddress', 'Fromaddress must not be empty').notEmpty(),
                check('eltAmount', 'ELT Amount must not be empty').notEmpty(),
                check('ethAmount', 'ethAmount must not be empty').notEmpty(),
                check('txHash', 'txHash must not be empty').notEmpty(),
            ],
            this.accountController.createTransaction.bind(this.accountController)
        )

        this.router.post('/gettransactions', authorize, this.accountController.getTransactions.bind(this.accountController))
    }

    getRouter() {
        return this.router
    }
}

module.exports = AccountRouter
