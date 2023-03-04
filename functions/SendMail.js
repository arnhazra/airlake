const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv').config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const refreshToken = process.env.REFRESH_TOKEN
const user = process.env.MAILER_UN

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
oAuth2Client.setCredentials({ refresh_token: refreshToken })

async function sendmail(email, otp) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { type: 'OAuth2', user, clientId, clientSecret, refreshToken, accessToken }
        })
        let subject = 'Lenstack Authcode'
        let content = `
        <html>
            <head>
                <style>
                    /* add some basic styling */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                    }
                    h1 {
                        color: #555;
                        font-size: 24px;
                        text-align: center;
                    }
                    p {
                        color: #555;
                        font-size: 18px;
                        text-align: center;
                    }
                    .auth-code {
                        color: #0080ff;
                        font-size: 36px;
                        font-weight: bold;
                        text-align: center;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
                    .button {
                        background-color: #0080ff;
                        color: #fff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Lenstack Authcode</h1>
                <p>${otp} is your auth code. Do not share the code with anyone.</p>
                <div class="auth-code">${otp}</div>
                <a href="#" class="button">Verify Your Identity</a>
            </body>
        </html>
    `
        await transporter.sendMail({ from: user, to: email, subject: subject, html: content })
    }

    catch (error) {
        throw error
    }
}

module.exports = sendmail