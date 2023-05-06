import mongoose from 'mongoose'
import dotenv from 'dotenv'
import statusMessages from '../constants/statusMessages'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const connectMongo = async () => {

    mongoose.connect(MONGO_URI)

    mongoose.connection.on('connected', () => {
        console.log(statusMessages.mongoDbConnected)
    })

    mongoose.connection.on('error', (err) => {
        console.log(statusMessages.mongoDbConnectionErr, err)
    })
}

export default connectMongo