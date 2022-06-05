import express from 'express'
import AuthMiddleWare from '../middleware/auth.middleware.js'

export var room = express.Router()

room.get('/', (req, res) => {
    res.json("Hello World")
})

room.post('/create-room', AuthMiddleWare, (req, res) => {
    console.log(req.body)
    res.json("Created Room")
})
