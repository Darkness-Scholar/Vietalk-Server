import os from "os"
import "./root.js"
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { auth } from './routes/auth.routes.js'
import DBConnect from "./service/database.js"
import { room } from "./routes/room.routes.js"

/** @function Checking system processors*/ console.log(os.cpus())

const app = express()
DBConnect()
dotenv.config()

app.use("/storage", express.static("../storage"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.use("/api/auth", auth)
app.use("/api/room", room)

app.listen(4444, () => { console.log('Server is running on port 4444') })