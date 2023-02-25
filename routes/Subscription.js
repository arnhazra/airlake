const express = require('express')
const SubscriptionController = require('../controllers/SubscriptionController')
const authorize = require('../middlewares/authorize')

class SubscriptionRouter {
    constructor() {
        this.router = express.Router()
        this.subscriptionController = new SubscriptionController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/subscribe/:datasetId', authorize, this.subscriptionController.subscribe.bind(this.subscriptionController))
        this.router.post('/issubscribed/:datasetId', authorize, this.subscriptionController.isSubscribed.bind(this.subscriptionController))
    }

    getRouter() {
        return this.router
    }
}

module.exports = SubscriptionRouter
