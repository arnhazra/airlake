const express = require('express')
const Connection = require('./functions/Connection')
const dotenv = require('dotenv').config()
const fs = require('fs')

const handler = express()
handler.listen(process.env.PORT)

handler.use(express.json({ extended: false, limit: '1mb' }))

Connection()

fs.readdirSync('./api').map(route => handler.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))

if (process.env.NODE_ENV == 'production') {
    const root = require('path').join(__dirname, 'views', 'build')
    handler.use(express.static(root))
    handler.get('*', (req, res) => {
        res.sendFile('index.html', { root })
    })
}