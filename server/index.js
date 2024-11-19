import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const PrivateRooms = {};
const waitingLine = new Set();
const rooms = {};
const connectedUsers = new Set();

io.on("connection", (socket) => {
  connectedUsers.add(socket.id);

  const emitUserCount = () => io.emit("users_count", connectedUsers.size);
  emitUserCount();

  socket.on("join_queue", () => {
    if (!waitingLine.has(socket.id)) {
      waitingLine.add(socket.id);

      if (waitingLine.size >= 2) {
        const [user1, user2] = Array.from(waitingLine).slice(0, 2);
        waitingLine.delete(user1);
        waitingLine.delete(user2);

        const room = `${user1}-${user2}`;
        rooms[room] = { user1, user2, currentTurn: user1 };

        const assignUserToRoom = (userId, isTurn) => {
          const userSocket = io.sockets.sockets.get(userId);
          if (userSocket) {
            userSocket.join(room);
            userSocket.emit("room_assigned", {
              room,
              turn: isTurn,
            });
          }
        };

        assignUserToRoom(user1, true);
        assignUserToRoom(user2, false);
      }
    }
  });

  socket.on("make_move", ({ miniBoardIndex, cellIndex, room, value }) => {
    const roomDetails = rooms[room];
    if (!roomDetails) return;

    if (roomDetails.currentTurn === socket.id) {
      const currentTurn =
        roomDetails.currentTurn === roomDetails.user1
          ? roomDetails.user2
          : roomDetails.user1;
      roomDetails.currentTurn = currentTurn;
      io.to(currentTurn).emit("opponent_move", {
        miniBoardIndex,
        cellIndex,
        value,
      });
    }
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.id);
    waitingLine.delete(socket.id);
    emitUserCount();

    for (const [room, details] of Object.entries(rooms)) {
      if (details.user1 === socket.id || details.user2 === socket.id) {
        delete rooms[room];
        io.to(room).emit("room_closed", { message: "Opponent disconnected" });
        io.socketsLeave(room);
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
