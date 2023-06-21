//quede en min 57:00 sockets
import {Server} from 'socket.io'

const socket={}  
socket.connect=(server)=>{
  socket.io=new Server(server)
  let{io}=socket;
  io.on('connection',(socket)=>{
    console.log('nueva conexion',socket.id)
    socket.on('disconnect',()=>{
        console.log('desconexion',socket.id)
    })
  })
}



export default socket;