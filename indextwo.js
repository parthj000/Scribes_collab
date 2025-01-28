import express from "express";
import http from "http";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: [],
});

// Serve static files from the 'public' directory

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);


  socket.on("join-room",(roomId)=>{
    console.log("room id se join ho gya che")
    socket.join(roomId);
  })

  

  // Listen for changes in the editor content and broadcast them to all clients except the sender
  socket.on("editor-changes", (content,room) => {
    // Exclude the sender's socket ID when broadcasting changes
    console.log(content,room);
    socket.to(room).emit("editor-changes", content);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log("Server listening on port ${PORT}");
});
