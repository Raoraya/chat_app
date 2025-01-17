import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});