import { Request, Response } from "express";
import { User } from "../models";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password, name } = req.body;
    const newUser = new User({ email, username, password, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UserController = {
  registerUser,
};
