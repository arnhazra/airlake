import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import connectMongo from './src/utils/ConnectMongo'
import { connectRedis } from './src/utils/UseRedis'
import SubscriptionRouter from './src/routes/SubscriptionRouter'
import DatasetRouter from './src/routes/DatasetRouter'
import AuthRouter from './src/routes/AuthRouter'
import AccountRouter from './src/routes/AccountRouter'
dotenv.config()

const subscriptionRouter = new SubscriptionRouter()
const datasetRouter = new DatasetRouter()
const authRouter = new AuthRouter()
const accountRouter = new AccountRouter()

const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ limit: '5mb' }))
connectMongo()
connectRedis()

app.use('/api', authRouter.getRouter())
app.use('/api', accountRouter.getRouter())
app.use('/api', datasetRouter.getRouter())
app.use('/api', subscriptionRouter.getRouter())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client')))
    app.use('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', `${req.originalUrl.split('?')[0]}.html`))
    })
}