import jwt from 'jsonwebtoken'
import RefreshModel from '../model/refresh.model.js'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(
            payload, 
            global.__jwtAccessTokenSecret__,
            { expiresIn: '1h' })
        const refreshToken = jwt.sign(
            payload,
            global.__jwtRefreshTokenSecret__,
            { expiresIn: '1y' })
        return { accessToken, refreshToken } 
    }
    async storeRefreshToken(token, userId) {
        try {
            await RefreshModel.create({ token, userId })
        } catch (err) {
            console.log(err)
        }
    }

    async verifyAccessToken (token) {
        return jwt.verify(token, global.__jwtAccessTokenSecret__)
    }

    generateRefreshToken() {}
}

export default new TokenService()