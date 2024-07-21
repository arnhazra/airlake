import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import connectMongo from './src/utils/dbConnect'
import DatasetRouter from './src/modules/dataset/DatasetRouter'
import TransactionRouter from './src/modules/transaction/TransactionRouter'
import UserRouter from './src/modules/user/UserRouter'
import { envConfig } from './config/envConfig'

const datasetRouter = new DatasetRouter()
const transactionRouter = new TransactionRouter()
const userRouter = new UserRouter()

const app = express()
app.listen(envConfig.apiPort)
app.use(cors())
app.use(express.json({ limit: '5mb' }))
connectMongo()

app.use('/api/dataset', datasetRouter.getRouter())
app.use('/api/transaction', transactionRouter.getRouter())
app.use('/api/user', userRouter.getRouter())

if (envConfig.nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, 'client')))
  app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', `${req.originalUrl.split('?')[0]}.html`))
  })
}

if (envConfig.nodeEnv === 'production') {
  const cacheControl = 'public, max-age=31536000'
  function setCustomCacheControl(res, path) {
    if (express.static.mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    } else {
      res.setHeader('Cache-Control', cacheControl)
    }
  }

  app.use(express.static(path.join(__dirname, 'client'), { maxAge: '1y', setHeaders: setCustomCacheControl }))
  app.use('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', `${req.originalUrl.split('?')[0]}.html`))
  })
}