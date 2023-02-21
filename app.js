const express = require('express')
const Connection = require('./functions/Connection')
const cors = require('cors')
const dotenv = require('dotenv').config()
const fs = require('fs')

const corsOptions = {
    origin: ['http://lenstack.vercel.app', 'http://localhost:3000']
}

const app = express()
app.listen(process.env.PORT)
app.use(cors(corsOptions))
app.use(express.json({ extended: false, limit: '5mb' }))
Connection()
fs.readdirSync('./api').map(route => app.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))