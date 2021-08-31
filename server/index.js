var express = require('express');
const { randomBytes } = require('crypto');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/home', function(req, res){
    res.status(200).send('Hola mundo');
});

var messages = [{
    text: 'Bienvenido al chat privado de GaboGutz',
    nickname: 'Bot GaboGutz',
    color: 'black'
}];

io.on('connection', socket => {
    console.log("El nodo: " + socket.handshake.address + " se ha conectado");
    socket.emit('messages', messages);

    socket.on('add-message', data => {
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
})

server.listen(6677, () => {
    console.log('El servidor funciona en http://localhost:6677')
});