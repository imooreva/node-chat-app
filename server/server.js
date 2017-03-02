const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public'); //helps middleware work properly
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //middleware
server.listen(PORT, () => console.log(`Started up on port ${PORT}`));

io.on('connection', (socket) =>{
    console.log('New user connected');    
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));    
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage: ', message);
        //below sends to all connections and not just one
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(); //for acknowledgement of request from client -- see index.js
    });
    
    socket.on('createLocationMessage', (coords) => {
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});