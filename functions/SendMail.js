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
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Lenstack Authcode</title>
            <style>
                body {
                    font-family: 'Segoe UI Light', sans-serif;
                    padding: 0;
                    margin: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 16px;
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
                }
                .header {
                    background-color: #252a3f;
                    padding: 20px;
                    color: #fff;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .header h1 {
                    font-size: 30px;
                    margin: 0;
                }
                .content {
                    padding: 20px;
                }
                .auth-code {
                    background-color: #f2f2f2;
                    color: #252a3f;
                    padding: 10px;
                    font-size: 28px;
                    font-weight: bold;
                    text-align: center;
                    border-radius: 16px;
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
                .footer {
                    background-color: #f2f2f2;
                    padding: 20px;
                    font-size: 14px;
                    color: #555;
                    text-align: center;
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 16px;
                }
                .footer p {
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Lenstack Authcode</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your auth code is</p>
                    <div class="auth-code">${otp}</div>
                    <p>Please enter this code to verify your account.</p>
                </div>
                <div class="footer">
                    <p>This email was sent by Lenstack. Please do not reply to this email.</p>
                </div>
            </div>
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