import express, { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { generateAuthCodeValidators, verifyAuthCodeValidators } from '../validations/authValidators'

export default class AuthRouter {
    public router: Router
    public authController: AuthController

    constructor() {
        this.router = express.Router()
        this.authController = new AuthController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/generateauthcode', generateAuthCodeValidators, this.authController.generateAuthCode.bind(this.authController))
        this.router.post('/verifyauthcode', verifyAuthCodeValidators, this.authController.verifyAuthCode.bind(this.authController))
    }

    getRouter() {
        return this.router
    }
}