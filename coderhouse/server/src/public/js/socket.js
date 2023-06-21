const socket=io();
socket.emit("confirmation","cliente conectado")
Swal.fire({
  icon: 'success',
  title: 'Notificacion de conexion',
  text: 'Te has conectado al chat',
})