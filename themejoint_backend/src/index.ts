import express, { Express, Request, Response } from "express";
// import { createServer } from "http";
// import { Server, Socket } from "socket.io";
import { PORT } from "./core";
import { userRoutes } from "./routes";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("This is themesender backend");
});

app.use("/api/user", userRoutes);

const App = () => {
  app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
  });
};

export default App;
