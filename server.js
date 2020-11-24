const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const FormatMessage = require('./utils/messages');
const {
  UserJoin,
  GetCurrentUser,
  UserLeave,
  GetRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const BotName = "ChatBot"

io.on('connection', socket => {
    socket.on('JoinRoom', ({UserName, Room}) => {
        
        const User = UserJoin(socket.id, UserName, Room)

        socket.join(User.Room)

        console.log(`User ${UserName} was connected to Room: ${Room}.`)

        socket.emit('Message', FormatMessage(BotName, `Welcome to Room: ${Room}!.`));

        io.to(User.Room).emit('RoomUsers', {
            Room: User.Room,
            Users: GetRoomUsers(User.Room)
        })
    })

    socket.on('ChatMessage', MSG => {
        const User = GetCurrentUser(socket.id);

        io.to(User.Room).emit('Message', FormatMessage(User.UserName, MSG));
    });

    socket.on('disconnect', () => {
        const User = UserLeave(socket.id)

        if(User){
            io.to(User.Room).emit(
                'Message',
                FormatMessage(BotName, `${User.UserName} has left the chat.`)
            );

            io.to(User.Room).emit('RoomUsers', {
                Room: User.Room,
                Users: GetRoomUsers(User.Room)
            });

            console.log(`User ${User.UserName} was left to Room: ${User.Room}.`)
        }

    })
})



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));