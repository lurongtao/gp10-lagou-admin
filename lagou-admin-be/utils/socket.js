var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  // socket.on('receive', (msg) => {
    // socket.broadcast.emit('message', msg);
  // })

  mySocket = socket
})

server.listen(8082, 'localhost')

module.exports = mySocket

