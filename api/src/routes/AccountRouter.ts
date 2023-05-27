import express, { Router } from 'express'
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
    }

    getRouter() {
        return this.router
    }
}