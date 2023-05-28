import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import connectMongo from './src/utils/ConnectMongo'
import { connectRedis } from './src/utils/UseRedis'
import DatasetRouter from './src/routes/DatasetRouter'
import SubscriptionRouter from './src/routes/SubscriptionRouter'
import TransactionRouter from './src/routes/TransactionRouter'
import UserRouter from './src/routes/UserRouter'
dotenv.config()

const datasetRouter = new DatasetRouter()
const subscriptionRouter = new SubscriptionRouter()
const transactionRouter = new TransactionRouter()
const userRouter = new UserRouter()

const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ limit: '3mb' }))
connectMongo()
connectRedis()

app.use('/api/dataset', datasetRouter.getRouter())
app.use('/api/subscription', subscriptionRouter.getRouter())
app.use('/api/transaction', transactionRouter.getRouter())
app.use('/api/user', userRouter.getRouter())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client')))
    app.use('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', `${req.originalUrl.split('?')[0]}.html`))
    })
}