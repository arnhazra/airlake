import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import statusMessages from '../constants/statusMessages'
import { getTokenFromRedis } from '../utils/UseRedis'
dotenv.config()

const rsaPublicKey = process.env.RSA_PUBLIC_KEY

async function authorize(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization']?.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const decoded = jwt.verify(accessToken, rsaPublicKey, { algorithms: ['RS512'] })
            req.headers.id = (decoded as any).id
            const redisAccessToken = await getTokenFromRedis(req.headers.id as string)

            if (redisAccessToken === accessToken) {
                next()
            }

            else {
                throw jwt.TokenExpiredError
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