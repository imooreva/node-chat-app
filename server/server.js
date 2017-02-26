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
    let createdTime = new Date().toUTCString();
    socket.emit('newMessage', {
        from: 'User456',
        text: 'Hey. How are things',
        createdAt: createdTime
    });
    
    socket.on('createMessage', (newMsg) => {
        console.log('createMessage: ', newMsg);
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});