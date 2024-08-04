import { Document } from "mongoose";
import IUser from "./IUser";
import IMessageMedia from "./IMessageMedia";

export default interface IStatus extends Document {
  user: IUser["_id"];
  statusText: string;
  media: IMessageMedia[];
  timestamp: Date;
  viewers: IUser["_id"][];
}
