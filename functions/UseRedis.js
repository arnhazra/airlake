const { createClient } = require('redis')
const dotenv = require('dotenv')
const statusMessages = require('../constants/statusMessages')
const redis = createClient({ url: process.env.REDIS_URI })

const connectRedis = async () => {
    await redis.connect()
    console.log(statusMessages.redisConnected)
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

module.exports = { connectRedis, setTokenInRedis, getTokenFromRedis, removeTokenFromRedis }