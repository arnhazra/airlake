//@ts-nocheck
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const refreshToken = process.env.REFRESH_TOKEN
const user = process.env.MAILER_UN
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

dotenv.config()
oAuth2Client.setCredentials({ refresh_token: refreshToken })

async function sendmail(email, otp) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { type: 'OAuth2', user, clientId, clientSecret, refreshToken, accessToken }
        })
        const subject = 'Lenstack Authcode'
        const content = `Use <b>${otp}</b> as your Authcode. Do not share with anyone.`
        await transporter.sendMail({ from: user, to: email, subject: subject, html: content })
    }

    catch (error) {
        throw error
    }
}

export default sendmail