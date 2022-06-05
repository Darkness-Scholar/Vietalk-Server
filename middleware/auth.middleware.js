import tokenService from "../service/token.service.js"

export default async function (req, res, next) {
    try {
        let { accessToken } = req.body
        if (!accessToken) throw new Error()
        let userData = await tokenService.verifyAccessToken(accessToken)
        if (!userData) throw new Error()
        req.user = userData
        console.log("passed auth middleware")
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message:"Invalid Token" })
    } next()
}   