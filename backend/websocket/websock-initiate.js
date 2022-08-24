import websocket from "websocket"

class websock{
    constructor(server,path){
        this._wss = false
        this._server = server
        this._path = path
        this._curr_clients = {}
    }

    _create_server=()=>{
        this._wss = new websocket.server({server:this._server,path:this._path})
    }

    update_clients=(name,cli)=>{
            this._curr_clients[name] = cli 
    }

    initiate = ()=>{
        this._create_server()
    }

    broadcast = (msg) => {
        this._wss.clients.foreach((client)=>{
            client.send(msg)
        })
    }

    getSockServer=()=>{
        return this._wss
    }

    getClientsList=()=>{
        return Object.keys(this._curr_clients)
    }

    getClient=(name)=>{
        return this._curr_clients[name]
    }
}

export default websock