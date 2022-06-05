import express from 'express'
import authController from "../controller/authController.js"
import updateController from '../controller/updateController.js'
import AuthMiddleware from '../middleware/auth.middleware.js'

export var auth = express.Router()

auth.get('/', (req, res) => {
    res.json("Hello World")
})

auth.post('/send-otp', authController.sendOTP)
auth.post('/verify-otp', authController.verifyOTP)
auth.post('/user-update', AuthMiddleware, updateController.user)
auth.post('/login', authController.login)