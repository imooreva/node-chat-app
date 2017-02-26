const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); //helps middleware work properly
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //middleware
server.listen(PORT, () => console.log(`Started up on port ${PORT}`));

io.on('connection', (socket) =>{
    console.log('New user connected');
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage: ', message);
        //below sends to all connections and not just one
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        //below send to all connections except the one that sent the message
        //socket.broadcast.emit('newMessage', {
        //    from: message.from,
        //    text: message.text,
        //    createdAt: new Date().getTime()
        //});
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});