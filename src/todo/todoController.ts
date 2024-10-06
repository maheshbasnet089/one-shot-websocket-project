import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todoModel";
import { ITodo } from "./todoTypes";

class Todo{
    private io = getSocketIo(); 
    constructor(){
        this.io.on("connection",(socket:Socket)=>{
            console.log("new client connected !!")
            socket.on("addTodo",(data)=>this.handleAddTodo(socket,data))
            socket.on("deleteTodo",(data)=>this.handleDeleteTodo(socket,data))
        })
    }
    private async handleAddTodo(socket:Socket,data:ITodo){
        try {
        const {task,deadLine,status} = data
        await todoModel.create({
            task, 
            deadLine, 
            status
        })
        const todos = await todoModel.find()
        socket.emit("todos_updated",{
            status : "success", 
            data : todos
        })
        
        } catch (error) {
            socket.emit("todo_response",{
                status : "error", 
                error
            })
        }
    }
    private async handleDeleteTodo(socket:Socket,data:{id:string}){
       try {
        const {id} = data 
        const deletedTodo = await todoModel.findByIdAndDelete(id)
        if(!deletedTodo){
            socket.emit("todo_response",{
                status : "error", 
                message : "Todo not found"
            })
            return;
        }
        const todos = await todoModel.find()
        socket.emit("todos_updated",{
            status : "success", 
            data : todos
        })
       } catch (error) {
        socket.emit("todo_response",{
            status : "error", 
            error
        })
       }

    }
}

export default new Todo()

