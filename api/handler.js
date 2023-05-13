const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv').config()
const connectMongo = require('./utils/ConnectMongo')
const { connectRedis } = require('./utils/UseRedis')
const SubscriptionRouter = require('./routes/SubscriptionRouter')
const DatasetRouter = require('./routes/DatasetRouter')
const AuthRouter = require('./routes/AuthRouter')
const AccountRouter = require('./routes/AccountRouter')

const subscriptionRouter = new SubscriptionRouter()
const datasetRouter = new DatasetRouter()
const authRouter = new AuthRouter()
const accountRouter = new AccountRouter()

const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ extended: false, limit: '5mb' }))
connectMongo()
connectRedis()

app.use('/api', authRouter.getRouter())
app.use('/api', accountRouter.getRouter())
app.use('/api', datasetRouter.getRouter())
app.use('/api', subscriptionRouter.getRouter())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'out')))
    app.use('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'out', `${req.originalUrl.split('?')[0]}.html`))
    })
}
