// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El escritorio es ecesario');
}

var escritorio = searchParams.get('escritorio');
let lbl = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets por atender') {
            lbl.text(resp);
            alert(resp);
            return;
        }

        lbl.text('Ticket ' + resp.numero)

    })

});


socket.on('connect', function() {

    console.log('Conectado al Server');

});

socket.on('disconnect', function() {
    console.log('Desconectado del Server');
});