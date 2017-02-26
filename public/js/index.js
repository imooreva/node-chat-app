var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: 'User123',
        text: 'Hello world, this is Ian.'
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage: ', message);
});