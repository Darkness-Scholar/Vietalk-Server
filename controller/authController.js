import { otpService, hashService } from '../service/index.js'
import UserService from '../service/user.service.js'
import TokenService from '../service/token.service.js'
import UserDTO from '../DTO/userDTO.js'

class AuthController {
    async sendOTP (req, res) {
        let { email } = req.body
        console.log(`email: ${email}`)
        if (!email) return res.status(400).json({ message: "Email is required" })
        let user = await UserService.find({ email })
        if (user) return res.status(300).json({ message: "This email is existed", code: 11 })
        let otp = await otpService.generateOTP()
        const timeout = 1000 * 60 * 10 // 10 mins
        let expires = Date.now() + timeout
        let data = `${email}-${otp}-${expires}`
        let hash = hashService.hashOTP(data)

        await otpService.sendEmail(email, 'Vietalk OTP', { otp, hash })

        return res.status(200).json({ hash, email, expires })
    }

    async verifyOTP (req, res) {
        let { otp, hash, email, expires } = req.body
        if (!otp || !hash || !email) return res.status(400).json({ message: "Invalid input" })
        console.log(Date.now(), expires)
        if (Date.now() >+ expires) return res.status(400).json({ message: "OTP has expired", code: 24 })
        const data = `${email}-${otp}-${expires}`
        const isValid = otpService.verifyOTP(hash, data)
        if (!isValid) return res.status(400).json({ message: "OTP is invalid", code: 27 })
        let user
        try {
            user = await UserService.find({ email:email })
            if (!user) {
                user = await UserService.create({ email, name:email, password: '111111' })
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error", error: e })
        }
        let {accessToken, refreshToken} = TokenService.generateToken({id: user._id, activated: false})
        await TokenService.storeRefreshToken(refreshToken, user._id)
        res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
        const userDTO = new UserDTO(user)
        res.status(200).json({ message:"success", accessToken, user: userDTO })
    }

    async login(req, res) {
        let { email, password } = req.body
        console.log(`user: ${email} request login`)
        let user
        try {
            user = await UserService.find({ email:email, password:password })
            if (!user) {
                return res.status(400).json({ message: "Sai email, mật khẩu hoặc user không tồn tại" })
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error", error: e })
        }
        let {accessToken, refreshToken} = TokenService.generateToken({id: user._id, activated: false})
        const userDTO = new UserDTO(user)
        res.status(200).json({ message:"success", accessToken, user: userDTO })
    }
}

export default new AuthController()