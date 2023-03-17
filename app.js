const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv').config()
const connectMongo = require('./functions/ConnectMongo')
const { connectRedis } = require('./functions/UseRedis')
const SubscriptionRouter = require('./routes/SubscriptionRouter')
const DatasetRouter = require('./routes/DatasetRouter')
const WalletRouter = require('./routes/WalletRouter')
const AuthRouter = require('./routes/AuthRouter')

const subscriptionRouter = new SubscriptionRouter()
const datasetRouter = new DatasetRouter()
const walletRouter = new WalletRouter()
const authRouter = new AuthRouter()
const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ extended: false, limit: '5mb' }))
connectMongo()
connectRedis()

app.use('/api/subscription', subscriptionRouter.getRouter())
app.use('/api/dataset', datasetRouter.getRouter())
app.use('/api/wallet', walletRouter.getRouter())
app.use('/api/auth', authRouter.getRouter())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'views', 'out')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'out', 'index.html'))
    })
}
