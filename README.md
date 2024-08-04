# TheMeSender: Chat Application Backend

This is the backend for a chat application supporting private and group chats, media sending, voice notes, contact management, call functionalities, and statuses similar to WhatsApp. It uses Express.js for RESTful API endpoints and Socket.IO for real-time communication.

## Table of Contents

- [TheMeSender: Chat Application Backend](#themesender-chat-application-backend)
  - [Table of Contents](#table-of-contents)
  - [Application Structure](#application-structure)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Models](#models)
    - [User Model](#user-model)
    - [Group Model](#group-model)
    - [Message Model](#message-model)
    - [Call Model](#call-model)
    - [Status Model](#status-model)
    - [Token Model](#token-model)
  - [Endpoints](#endpoints)
    - [Authentication](#authentication)
    - [User Endpoints](#user-endpoints)
    - [Groups Endpoints](#groups-endpoints)
    - [Messages Endpoints](#messages-endpoints)
    - [Calls Endpoints](#calls-endpoints)
    - [Statuses Endpoints](#statuses-endpoints)
  - [Socket.IO Integration](#socketio-integration)
  - [Middlewares](#middlewares)
    - [Authentication Middleware](#authentication-middleware)
    - [Error Handling Middleware](#error-handling-middleware)
    - [Request Validation Middleware](#request-validation-middleware)
  - [License](#license)

## Application Structure

The application follows a modular structure with a clear separation of concerns. Here is the high-level directory structure:

```
themeSender_backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── tokenController.ts
│   │   ├── userController.ts
│   │   ├── groupController.ts
│   │   ├── messageController.ts
│   │   ├── callController.ts
│   │   └── statusController.ts
│   │
│   ├── models/
│   │   ├── TokenModel.ts
│   │   ├── userModel.ts
│   │   ├── groupModel.ts
│   │   ├── messageModel.ts
│   │   ├── callModel.ts
│   │   └── statusModel.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── groupRoutes.ts
│   │   ├── messageRoutes.ts
│   │   ├── callRoutes.ts
│   │   └── statusRoutes.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│   │
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── dateUtils.ts
│   │   └── logger.ts
│   │
│   ├── sockets/
│   │   └── chatSockets.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── README.md
```

## Features

- **Private and Group Chats**: Real-time messaging between users and groups.
- **Media Sending**: Send images, videos, and other files.
- **Voice Notes**: Send and receive voice messages.
- **Contact Management**: Add and manage contacts.
- **Call Functionality**: Log and track voice/video calls.
- **Statuses**: Post and view status updates.
- **Real-Time Updates**: Using Socket.IO for real-time communication.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chat-app-backend.git
   cd chat-app-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

## Configuration

1. **Database**: The application uses MongoDB. Make sure MongoDB is running or configure the `MONGO_URI` to point to your MongoDB instance.

2. **JWT Secret**: Configure the `JWT_SECRET` in the `.env` file for JWT token signing.

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Access the API**: The server will be running on `http://localhost:5000`.

## Models

### User Model

**`/models/userModel.ts`**

```typescript
import mongoose, { Document } from "mongoose";

export default interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  about: string;
  contacts: string[];
  groups: string[];
  lastSeen: Date;
  location: string;
}
```

### Group Model

/models/groupModel.ts

```typescript
import mongoose, { Document } from "mongoose";

export default interface IGroup extends Document {
  name: string;
  description: string;
  members: string[]; // User IDs
  admin: string; // Admin User ID
  createdAt: Date;
}
```

### Message Model

`/models/messageModel.ts`

```typescript
import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";

interface IMessageMedia {
  url: string;
  type: string;
  size: number;
  duration: number;
}

export default interface IMessage extends Document {
  sender: IUser["_id"];
  receiver: IUser["_id"];
  text: string;
  media: IMessageMedia[];
  isRead: boolean;
}
```

### Call Model

`/models/callModel.ts`

```typescript
import mongoose, { Document } from "mongoose";

export default interface ICall extends Document {
  caller: string; // User ID
  receiver: string; // User ID
  startTime: Date;
  endTime: Date;
  duration: number;
  callType: "voice" | "video";
}
```

### Status Model

`/models/statusModel.ts`

```typescript
import mongoose, { Document } from "mongoose";

export default interface IStatus extends Document {
  user: string; // User ID
  statusText: string;
  media: { url: string; type: string }[];
  createdAt: Date;
  viewers: string[]; // User IDs of viewers
}
```

### Token Model

`/models/tokenModel.ts`

```typescript
import mongoose, { Document } from "mongoose";

export default interface IToken extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
}
```

## Endpoints

### Authentication

- **POST** /api/auth/register - Register a new user.
- **POST** /api/auth/login - Authenticate a user and return a JWT token.
- **POST** /api/auth/refresh-token - Refresh JWT token using a refresh token.
- **DELETE** /api/auth/logout - Delete token.

### User Endpoints

- **GET** /api/users - Retrieve all users.
- **GET** /api/users/:id - Retrieve a user by ID.
- **POST** /api/users - Create a new user.
- **PUT** /api/users/:id - Update a user by ID.
- **DELETE** /api/users/:id - Delete a user by ID.

### Groups Endpoints

- **GET** /api/groups - Retrieve all groups.
- **GET** /api/groups/:id - Retrieve a group by ID.
- **POST** /api/groups - Create a new group.
- **PUT** /api/groups/:id - Update a group by ID.
- **DELETE** /api/groups/:id - Delete a group by ID.

### Messages Endpoints

- **GET** /api/messages/:chatRoomId - Retrieve messages for a chat room or user.
- **POST** /api/messages - Send a new message.
- **PUT** /api/messages/:id - Update a message by ID.
- **DELETE** /api/messages/:id - Delete a message by ID.

### Calls Endpoints

- **GET** /api/calls/:userId - Retrieve call logs for a user.
- **POST** /api/calls - Log a new call.
- **PUT** /api/calls/:id - Update a call record by ID.
- **DELETE** /api/calls/:id - Delete a call record by ID.

### Statuses Endpoints

- **GET** /api/statuses/:userId - Retrieve status updates for a user.
- **POST** /api/statuses - Create a new status update.
- **PUT** /api/statuses/:id - Update a status by ID.
- **DELETE** /api/statuses/:id - Delete a status by ID.

## Socket.IO Integration

`/sockets/chatSockets.ts`

Handles real-time communication with Socket.IO.

```typescript
import { Server } from "socket.io";

export const setupSocketIO = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send_message", (data) => {
      io.to(data.receiverId).emit("new_message", data);
    });

    socket.on("typing", (data) => {
      socket.broadcast.to(data.chatRoomId).emit("user_typing", data);
    });

    socket.on("join_room", (data) => {
      socket.join(data.chatRoomId);
    });

    socket.on("leave_room", (data) => {
      socket.leave(data.chatRoomId);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
```

## Middlewares

### Authentication Middleware

**`/middlewares/authMiddleware.ts`**

This middleware ensures that the user is authenticated before accessing protected routes.

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: IUser) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

### Error Handling Middleware

**`/middlewares/errorHandler.ts`**

This middleware handles errors that occur during request processing.

```typescript
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
```

### Request Validation Middleware

**`/middlewares/validateRequest.ts`**

This middleware validates incoming requests based on predefined schemas.

```typescript
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";

export const validateRequest = (validationRules: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      validationRules.map((validation: any) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](http://mptettey.vercel.app) file for details.

Feel free to customize the content to fit your specific implementation or add additional sections as needed.
