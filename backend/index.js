import express from "express"
import cors from "cors"
import http from "http"
import websock from "./websocket/websock-initiate"

const app = express()
const server = http.createServer(app)
const wss = new websock(server,"/websock")
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
wss.initiate()

app.get('/',(req,res,next)=>{
    try {
        res.send("Server running")
    } catch (error) {
        next(error)
    }
})



//app.use() Error handler

app.listen(process.env.PORT|port,()=>{
    console.log("Server running at PORT: "+process.env.PORT|port)
})