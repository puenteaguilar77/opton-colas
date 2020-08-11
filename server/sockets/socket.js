const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


let ticketControl = new TicketControl();


io.on('connection', (cliente) => {

    cliente.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);
        callback(siguiente);


    });

    //emitir un evento 'estadoActual'
    cliente.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    cliente.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'

            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        cliente.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        //Notificar y actualizar cambios en los últimos 4

    });


});