import { Router, Request, Response } from "express";
import { UserController } from "../controllers";

const userRoutes: Router = Router();

userRoutes.post("/register", UserController.registerUser);

export default userRoutes;
