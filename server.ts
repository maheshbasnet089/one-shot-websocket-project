import app from './src/app'
import { envConfig } from './src/config/config'
import connectToDb from './src/config/db'


function startServer(){
     connectToDb()
    const port = envConfig.port || 4000
    app.listen(port,()=>{
        console.log(`Server has started at port[${port}]`)
    })
}

startServer()