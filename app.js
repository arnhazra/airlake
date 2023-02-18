const express = require('express')
const Connection = require('./functions/Connection')
const dotenv = require('dotenv').config()
const fs = require('fs')
const path = require('path')

const handler = express()
handler.listen(process.env.PORT)
handler.use(express.json({ extended: false, limit: '50mb' }))
Connection()
fs.readdirSync('./api').map(route => handler.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))


if (process.env.NODE_ENV == 'production') {
    handler.use(express.static(path.join(__dirname, '../views/build')))
    handler.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../views/build/index.html'))
    })
}