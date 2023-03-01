const express = require('express')
const { check } = require('express-validator')
const authorize = require('../middlewares/authorize')
const AuthController = require('../controllers/AuthController')

class AuthRouter {
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
                check('otp', 'Invalid OTP format').isLength(6),
                check('hash', 'Invalid Hash').notEmpty(),
            ],
            this.authController.verifyAuthCode.bind(this.authController),
        )

        this.router.post('/checkauth', authorize, this.authController.checkAuth.bind(this.authController))
        this.router.post('/signout', authorize, this.authController.signOut.bind(this.authController))
    }

    getRouter() {
        return this.router
    }
}

module.exports = AuthRouter
