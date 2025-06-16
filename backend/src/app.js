import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json({limit: '16kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true, limit: '16kb'}))


import userRouter from "./routes/user.routes.js"
import credentialsRouter from "./routes/credentials.routes.js"


app.use("/api/v1/user", userRouter)
app.use("/api/v1/user/manager", credentialsRouter)



export {app}