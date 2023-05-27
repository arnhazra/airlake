import express, { Router } from 'express'
import DatasetController from '../controllers/DatasetController'
import authorize from '../middlewares/authorize'
import { createDatasetValidations } from '../validations/datasetValidators'

export default class DatasetRouter {
    public router: Router
    public datasetController: DatasetController

    constructor() {
        this.router = express.Router()
        this.datasetController = new DatasetController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/datasetfilters', authorize, this.datasetController.getDatasetFilters.bind(this.datasetController))
        this.router.post('/dataplatform', authorize, this.datasetController.getDataPlatform.bind(this.datasetController))
        this.router.post('/subscriptions', authorize, this.datasetController.getMySubscriptions.bind(this.datasetController))
        this.router.post('/viewdataset', authorize, this.datasetController.viewDataset.bind(this.datasetController))
        this.router.post('/findsimilardatasets', authorize, this.datasetController.findSimilarDatasets.bind(this.datasetController))
        this.router.get('/metadataapi/:datasetId', this.datasetController.getMetadata.bind(this.datasetController))
        this.router.get('/dataapi/:datasetId/:subscriptionId', this.datasetController.getData.bind(this.datasetController))
        this.router.post('/createdataset', createDatasetValidations, this.datasetController.createDataset.bind(this.datasetController))
    }

    getRouter() {
        return this.router
    }
}