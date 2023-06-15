import mongoose from 'mongoose'
import statusMessages from '../constants/statusMessages'
import { envConfig } from '../../config/envConfig'

const connectMongo = async () => {
    mongoose.connect(envConfig.mongoUri)

    mongoose.connection.on('connected', () => {
        console.log(statusMessages.mongoDbConnected)
    })

    mongoose.connection.on('error', (err) => {
        console.log(statusMessages.mongoDbConnectionErr, err)
    })
}

export default connectMongo