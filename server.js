const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);



 
server.listen(process.env.PORT || 5000)

let userNames = {}
let connections = [];
let rooms = []

io.sockets.on('connection', function(socket) {
    console.log('socket id ' + socket.id)
    connections.push(socket);
    console.log(`${connections.length} users connected`);
    socket.emit('rooms_update', rooms);
    
    socket.on('add_user', function(name) {
        socket.name = name;
        rooms.push(name);
        socket.room = `${name}`;
        userNames[name] = name;
        socket.join(`${name}`);
        io.emit('rooms_update', rooms);
        console.log(rooms);
        
        let usersInRoom = [];
        io.in(name).clients((err , clients) => {
            connections.forEach(function(e) {
                if(clients.find(el => el===e.id)) {
                    usersInRoom.push(e.name)
                }
            })
            console.log(usersInRoom, `these are users in room ${name}`)
            io.sockets.in(`${name}`).emit('users in room', usersInRoom);
        });
        
    })

    socket.on('change room', function(newRoom) {
        io.sockets.in(`${socket.room}`).emit('leaving room', socket.name)
        socket.leave(`${socket.room}`);
        socket.room = `${newRoom}`;
        socket.join(`${newRoom}`);
        io.sockets.in(`${newRoom}`).emit('new roommate', socket.name, socket.room);
        console.log(socket.room, socket.name);
        
        let usersInRoom = [];
        io.in(newRoom).clients((err , clients) => {
            connections.forEach(function(e) {
                if(clients.find(el => el===e.id)) {
                    usersInRoom.push(e.name)
                }
            })
            console.log(usersInRoom, `changed, these are users in room ${newRoom}`)
            io.sockets.in(`${newRoom}`).emit('users in room', usersInRoom);
        });
    })
    
    socket.on('new_message', function(messageObj) {
        console.log(`catched message with ${messageObj.message} in ${messageObj.room} by ${messageObj.sender}`)
        io.sockets.in(`${messageObj.room}`).emit('new message', messageObj.message, messageObj.sender, messageObj.date);
    
    })

    socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket),1);
        console.log(`${connections.length} users connected`);
        socket.leave(socket.room);
        
        let usersInRoom = [];
        io.in(socket.room).clients((err , clients) => {
            connections.forEach(function(e) {
                if(clients.find(el => el===e.id)) {
                    usersInRoom.push(e.name)
                }
            })
            console.log(usersInRoom, `changed, these are users in room ${socket.room}`)
            io.sockets.in(`${socket.room}`).emit('users in room', usersInRoom);

    })

    })
})

