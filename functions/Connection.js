const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const Connection = async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log('Mongo DB Connected')
    })

    mongoose.connection.on('error', (err) => {
        console.log('Mongo DB Connection Error', err)
    })
}

module.exports = Connection