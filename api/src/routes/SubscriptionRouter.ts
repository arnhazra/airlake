import express, { Router } from 'express'
import SubscriptionController from '../controllers/SubscriptionController'
import authorize from '../middlewares/authorize'

export default class SubscriptionRouter {
    public router: Router
    public subscriptionController: SubscriptionController

    constructor() {
        this.router = express.Router()
        this.subscriptionController = new SubscriptionController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/subscribe', authorize, this.subscriptionController.subscribe.bind(this.subscriptionController))
        this.router.post('/unsubscribe', authorize, this.subscriptionController.unsubscribe.bind(this.subscriptionController))
        this.router.post('/checkstatus', authorize, this.subscriptionController.checkSubscriptionStatus.bind(this.subscriptionController))
    }

    getRouter() {
        return this.router
    }
}