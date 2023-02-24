const express = require('express')
const Connection = require('./functions/Connection')
const cors = require('cors')
const dotenv = require('dotenv').config()
const fs = require('fs')
const path = require('path')

const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ extended: false, limit: '5mb' }))
Connection()
fs.readdirSync('./api').map(route => app.use(`/api/${route.split('.')[0].toLowerCase()}`, require(`./api/${route.split('.')[0]}`)))

// if (process.env.NODE_ENV == 'production') {
//     const root = require('path').join(__dirname, 'views', 'build')
//     app.use(express.static(root))
//     app.get('*', (req, res) => {
//         res.sendFile('index.html', { root })
//     })
// }

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './views', 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './views', 'build', 'index.html'));
    })
}

module.exports = app