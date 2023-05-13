import { createClient } from 'redis'
import dotenv from 'dotenv'
import statusMessages from '../constants/statusMessages'

dotenv.config()
const redis = createClient({ url: process.env.REDIS_URI })

const connectRedis = async () => {
    try {
        await redis.connect()
        console.log(statusMessages.redisConnected)
    } catch (error) {
        console.log(statusMessages.connectionError)
    }
}

const setTokenInRedis = async (userId, accessToken) => {
    const response = await redis.set(userId, accessToken)
    return response
}

const getTokenFromRedis = async (userId) => {
    const response = await redis.get(userId)
    return response
}

const removeTokenFromRedis = async (userId) => {
    const response = await redis.del(userId)
    return response
}

export { getTokenFromRedis, removeTokenFromRedis, connectRedis, setTokenInRedis }