import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app: Express = express();
const port: string | number = process.env.PORT || 5001;

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

interface RoomUser {
  userId: string;
  socketId: string;
}

const rooms = new Map<string, Set<RoomUser>>();

io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  socket.on("join-room", (roomId: string, userId: string) => {
    socket.join(roomId);

    // Add user to room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId)?.add({ userId, socketId: socket.id });

    socket.to(roomId).emit("user-connected", userId);
    console.log(`User ${userId} connected to room ${roomId}`);

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);

      // Remove user from room
      const usersInRoom = rooms.get(roomId);
      if (usersInRoom) {
        usersInRoom.forEach((user) => {
          if (user.socketId === socket.id) {
            usersInRoom.delete(user);
          }
        });

        // If no users left in the room, remove the room
        if (usersInRoom.size === 0) {
          rooms.delete(roomId);
        }
      }

      socket.to(roomId).emit("user-disconnected", userId);
    });
  });

  socket.on(
    "make-call",
    (data: { userToCall: string; signalData: any; from: string }) => {
      io.to(data.userToCall).emit("receive-call", {
        signal: data.signalData,
        from: data.from,
      });
    }
  );

  socket.on("answer-call", (data: { signal: any; to: string }) => {
    io.to(data.to).emit("call-accepted", data.signal);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Video call server is running");
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
