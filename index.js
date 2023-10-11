const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res)=> {
    res.sendFile(__dirname + "/index.html")
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
});

server.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});


