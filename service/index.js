import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

const ADMIN_EMAIL_ADDRESS = "rsoft.hwang99@gmail.com"
const GOOGLE_CLOUD_CLIENT_ID = "174876083930-6kclkg10hs8a6e20en3thvqb0tgmv58f.apps.googleusercontent.com"
const GOOGLE_CLOUD_CLIENT_SECRET = "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"
const GOOGLE_CLOUD_CLIENT_REFRESH_TOKEN = "1//04WtsHfWTaZ5VCgYIARAAGAQSNwF-L9Irf6m_g9347mc4JkrM6pMejO8FZ39TOCOSfot97O9oXdqzzus5lj0aX2AZ_vAxNSRvL5o"

const myOAuth2Client = new OAuth2Client(
    GOOGLE_CLOUD_CLIENT_ID,
    GOOGLE_CLOUD_CLIENT_SECRET
)
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_CLOUD_CLIENT_REFRESH_TOKEN
})

class OTPService {
    async generateOTP() {
        const otp = await crypto.randomInt(1000, 9999)
        return otp
    }
    /** Send OTP to email
     * @param {string} receiver : người nhận
     * @param {string} title : tiêu đề của email
     * @param {object} content : nội dung của email, gồm { otp :: string, hash :: string }
    */
    async sendEmail(receiver, title, content) {
        try {
            console.log(`Send OTP to ${receiver} :: ${content.otp}`)
            const myAccessTokenObject = await myOAuth2Client.getAccessToken()
            const { token } = myAccessTokenObject && myAccessTokenObject

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: ADMIN_EMAIL_ADDRESS,
                    clientId: GOOGLE_CLOUD_CLIENT_ID,
                    clientSecret: GOOGLE_CLOUD_CLIENT_SECRET,
                    refresh_token: GOOGLE_CLOUD_CLIENT_REFRESH_TOKEN,
                    accessToken: token
                }
            })

            const mailOptions = {
                to: receiver, // Gửi đến ai?
                subject: title, // Tiêu đề email
                html: `
                    <h2>${title}</h2>
                    <h4>Mã HASH :: ${content.hash}</h4>
                    <h4>Mã OTP :: ${content.otp}</h4>
                    <p>Sử dụng mã OTP này để xác thực</p>
                `
            }

            await transport.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error)
        }
    }

    /** Verify OTP
     * @param {string} hashedOTP : người nhận
     * @param {string} data : tiêu đề của email
    */
    verifyOTP(hashedOTP, data) {
        let computedHash = hashService.hashOTP(data)
        return hashedOTP === computedHash // ? true : false
    }
}

class HashService {
    hashOTP(input) {
        let res = crypto.createHmac('sha256', "HASH").update(input).digest('hex')
        return res
    }
}

export var otpService = new OTPService()
export var hashService = new HashService()