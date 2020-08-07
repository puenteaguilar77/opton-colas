var socket = io();
//los on son para escuchar información que envía el server
socket.on('connect', function() {

    console.log('Conectado al Server');

});

socket.on('disconnect', function() {
    console.log('Desconectado del Server');
});

//Los emits son para enviar información al server
socket.emit('enviarMensaje', {
    usuario: 'Optimus Neo',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('Resp Server:', resp);
});

//Escuchar la información del server
socket.on('enviarMensaje', function(mensaje) {
    console.log('Información del Server:', mensaje);
});