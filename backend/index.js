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

app.get("/getClients",(req,res,next)=>{
    try{
        let clients = wss.getClients()
        res.json({clients:clients}).status(200)
    } catch (error) {
        next(error)
    }
})

app.post('/updateValues',(req,res,next)=>{
    try{
        let client = req.body.client
        let data = req.body.data
        wss.getClient(client).send(data)
    } catch (error) {
        next(error)
    }
})

wss.getSockServer().on('connection',(sockClient)=>{
    sockClient.on("message",(request)=>{
        let message = JSON.parse(request)
        switch(message["req"]){
            case "ADD_CLI" : wss.update_clients(message['name'],sockClient) // {"req":"ADD_CLI","name":"xyz"}
            break;
            default : console.log(`Unrecognized command: ${message["req"]}`)
        }
    })
})

//app.use() Error handler

app.listen(process.env.PORT|port,()=>{
    console.log("Server running at PORT: "+process.env.PORT|port)
})