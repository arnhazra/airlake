import express, { Router } from 'express'
import { check } from 'express-validator'
import AuthController from '../controllers/AuthController'

export default class AuthRouter {
    public router: Router
    public authController: AuthController

    constructor() {
        this.router = express.Router()
        this.authController = new AuthController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post(
            '/generateauthcode',
            [
                check('email', 'Invalid Email Format').isEmail(),
            ],
            this.authController.generateAuthCode.bind(this.authController),
        )

        this.router.post(
            '/verifyauthcode',
            [
                check('email', 'Provide valid email').isEmail(),
                check('otp', 'Invalid OTP format').notEmpty(),
                check('hash', 'Invalid Hash').notEmpty(),
            ],
            this.authController.verifyAuthCode.bind(this.authController),
        )
    }

    getRouter() {
        return this.router
    }
}
