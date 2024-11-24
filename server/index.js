import express from "express";
import http from "http";
import { Server } from "socket.io";
import { isBooleanObject } from "util/types";

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
  socket.on("get_users_count", () => {
    socket.emit("users_count", connectedUsers.size);
  });
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
  socket.on("leave_queue", () => {
    if (waitingLine.has(socket.id)) {
      waitingLine.delete(socket.id);
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

  socket.on("offer_rematch", ({ room }) => {
    if (!rooms[room]) {
      io.to(socket.id).emit(
        "opponent_left",
        "YOUR OPPONENT HAS LEFT THE ROOM!"
      );
      return;
    }
    const offeredUser =
      rooms[room]?.user1 === socket.id ? rooms[room].user2 : rooms[room].user1;

    const isOfferedUserInRoom =
      rooms[room].user1 === offeredUser || rooms[room].user2 === offeredUser;

    if (isOfferedUserInRoom && offeredUser) {
      io.to(offeredUser).emit("get_rematch_offer");
    } else {
      io.to(socket.id).emit(
        "opponent_left",
        "YOUR OPPONENT HAS LEFT THE ROOM!"
      );
    }
  });

  socket.on("accept_rematch", ({ room }) => {
    if (!rooms[room]) {
      io.to(socket.id).emit(
        "opponent_left",
        "YOUR OPPONENT HAS LEFT THE ROOM!"
      );
      return;
    }
    const offeringUser =
      rooms[room]?.user1 === socket.id ? rooms[room].user2 : rooms[room].user1;

    const isOfferingUserInRoom =
      rooms[room].user1 === offeringUser || rooms[room].user2 === offeringUser;

    if (isOfferingUserInRoom && offeringUser) {
      const user1 = rooms[room]?.user1 || null;
      const user2 = rooms[room]?.user2 || null;
      rooms[room].user1 = user2;
      rooms[room].user2 = user1;
      rooms[room].currentTurn = rooms[room].user1;
      io.to(rooms[room].user1).emit("get_rematch_accepted", { turn: true });
      io.to(rooms[room].user2).emit("get_rematch_accepted", { turn: false });
    } else {
      io.to(socket.id).emit(
        "opponent_left",
        "YOUR OPPONENT HAS LEFT THE ROOM!"
      );
    }
  });
  socket.on("decline_rematch", (room) => {
    console.log(room);

    if (!rooms[room]) {
      return;
    }
    const offeringUser =
      rooms[room]?.user1 === socket.id ? rooms[room].user2 : rooms[room].user1;

    io.to(offeringUser).emit(
      "opponent_left",
      "YOUR OPPONENT DECLINED YOUR REMATCH OFFER!"
    );
  });

  socket.on("leave_room", (room) => {
    const details = rooms[room];

    if (details) {
      if (details.user1 === socket.id) {
        details.user1 = null;
      } else if (details.user2 === socket.id) {
        details.user2 = null;
      }

      if (!details.user1 && !details.user2) {
        delete rooms[room];
      }
    }
  });

  socket.on("resign", (room) => {
    const winner =
      rooms[room].user1 === socket.id ? rooms[room].user2 : rooms[room].user1;
    io.to(winner).emit("early_resignation", "VICTORY BY RESIGNATION!");
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.id);
    waitingLine.delete(socket.id);
    emitUserCount();

    for (const [room, details] of Object.entries(rooms)) {
      if (details.user1 === socket.id || details.user2 === socket.id) {
        delete rooms[room];
        io.to(room).emit(
          "early_resignation",
          "THE GAME CANNOT CONTINUE AS YOUR OPPONENT HAS DISCONNECTED!"
        );
        io.socketsLeave(room);
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
