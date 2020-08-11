// Comando para establecer la conexión


var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function() {

    console.log('Conectado al Server');

});

socket.on('disconnect', function() {
    console.log('Desconectado del Server');
});

// on 'estadoActual'

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(sigTicket) {

        label.text(sigTicket);

    });

});