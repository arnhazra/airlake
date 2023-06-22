import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { envConfig } from '../../config/envConfig'

const { clientId, clientSecret, redirectUri, refreshToken, mailerEmail } = envConfig
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
oAuth2Client.setCredentials({ refresh_token: refreshToken })

async function sendmail(email: string, otp: number) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: mailerEmail,
                accessToken: accessToken.token,
            }
        })
        const subject = 'Airlake Authcode'
        const content = `Use <b>${otp}</b> as your Authcode. Do not share with anyone.`
        await transporter.sendMail({ from: mailerEmail, to: email, subject: subject, html: content })
    }

    catch (error) {
        throw error
    }
}

export default sendmail