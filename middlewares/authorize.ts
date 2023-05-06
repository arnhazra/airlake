import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import statusMessages from '../constants/statusMessages'
import { getTokenFromRedis } from '../functions/UseRedis'
const rsaPublicKey = process.env.RSA_PUBLIC_KEY

async function authorize(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const decoded = jwt.verify(accessToken, rsaPublicKey, { algorithms: ['RS512'] })
            req.id = decoded.id
            const redisAccessToken = await getTokenFromRedis(req.id)

            if (redisAccessToken === accessToken) {
                next()
            }

            else {
                throw new jwt.TokenExpiredError
            }
        }

        catch (error) {
            if (error instanceof jwt.JsonWebTokenError || error instanceof SyntaxError || error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ msg: statusMessages.invalidToken })
            }

            else {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }
}

export default authorize