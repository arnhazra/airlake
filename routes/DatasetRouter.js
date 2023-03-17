const express = require('express')
const { check } = require('express-validator')
const DatasetController = require('../controllers/DatasetController')
const authorize = require('../middlewares/authorize')

class DatasetRouter {
    constructor() {
        this.router = express.Router()
        this.datasetController = new DatasetController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/getsortandfilteroptions', authorize, this.datasetController.getSortAndFilterOptions.bind(this.datasetController))
        this.router.post('/library', authorize, this.datasetController.getLibrary.bind(this.datasetController))
        this.router.post('/mysubscriptions', authorize, this.datasetController.getMySubscriptions.bind(this.datasetController))
        this.router.post('/viewone/:datasetId', authorize, this.datasetController.viewOneDataset.bind(this.datasetController))
        this.router.post('/findsimilar/:datasetId', authorize, this.datasetController.findSimilarDatasets.bind(this.datasetController))
        this.router.get('/data/preview/:datasetId', this.datasetController.previewData.bind(this.datasetController))
        this.router.get('/data/view/:datasetId/:subscriptionId', this.datasetController.viewData.bind(this.datasetController))
        this.router.post('/create',
            [
                check('name', 'Name must not be empty').notEmpty(),
                check('category', 'Category must not be empty').notEmpty(),
                check('description', 'Description must not be empty').notEmpty(),
                check('data', 'data must be an array of object').isArray(),
                check('price', 'Price must not be empty').isNumeric()
            ],
            this.datasetController.createDataset.bind(this.datasetController)
        )
    }

    getRouter() {
        return this.router
    }
}

module.exports = DatasetRouter
