const express = require('express')
const Connection = require('./functions/Connection')
const dotenv = require('dotenv').config()
const fs = require('fs')
const path = require('path')

const app = express()
app.listen(process.env.PORT)
app.use(express.json({ extended: false, limit: '50mb' }))
Connection()

fs.readdirSync('./api').map(route => app.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))

app.use(express.static(path.join(__dirname, 'views/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/build/index.html'))
})