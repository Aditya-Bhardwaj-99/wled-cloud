import websocket from "websocket"

class websock{
    constructor(server,path){
        this._wss = false
        this._server = server
        this._path = path
        this._curr_clients = "No clients stored yet"
    }

    _create_server=()=>{
        this._wss = new websocket.server({server:this._server,path:this._path})
    }

    _update_clients=()=>{
            this._curr_clients = this._wss.clients
    }

    initiate = ()=>{
        this._create_server()
        this._update_clients()
    }

    broadcast = (msg) => {
        this._update_clients()
        this._curr_clients.foreach((client)=>{
            client.send(msg)
        })
    }

    getSockServer=()=>{
        return this._wss
    }

    getClients=()=>{
        return this._curr_clients
    }
}

export default websock