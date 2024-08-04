import { Document } from "mongoose";

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
  active: boolean;
}
