const express = require('express')
const Connection = require('./functions/Connection')
const dotenv = require('dotenv').config()
const fs = require('fs')

const app = express()
const root = require('path').join(__dirname, 'views', 'build')
app.use(express.static(root));
app.use(cors())
app.listen(process.env.PORT)
app.use(express.json({ extended: false, limit: '50mb' }))
Connection()
fs.readdirSync('./api').map(route => app.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))
app.get("*", (req, res) => { res.sendFile('index.html', { root }); })