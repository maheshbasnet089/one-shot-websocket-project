import app from './src/app'
import { envConfig } from './src/config/config'
import connectToDb from './src/config/db'
import {Server} from 'socket.io'

// data receive garda - on 
// data pathauda  - emit 
// request -- socket 
// api -- event
// req.body = data

function startServer(){
     connectToDb()
    const port = envConfig.port || 4000
    const server = app.listen(port,()=>{
        console.log(`Server has started at port[${port}]`)
    })
    const io = new Server(server)
    io.on("connection",(socket)=>{
       socket.emit("message",{
        name : "Manish"
       })
        console.log("Someone connected (client)")
    })
    
}

startServer()