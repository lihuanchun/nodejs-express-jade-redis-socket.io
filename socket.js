
/**
 * Module dependencies.
 */

var express = require('express');
var io = require('socket.io');

var app = express()
    , server = require('http').createServer(app)
    , io = io.listen(server);

io.set('log level', 1);

server.listen(8080);


io.sockets.on('connection', function (socket) {

    socket.on('public message',function(msg, fn){
        socket.broadcast.emit('public message', '公共消息：', msg);
        fn(true);
    });


});

