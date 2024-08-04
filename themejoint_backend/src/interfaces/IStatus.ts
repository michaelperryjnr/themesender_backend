import { Document } from "mongoose";
import IUser from "./IUser";
import IMessageMedia from "./IMessageMedia";

export default interface IStatus extends Document {
  user: IUser["_id"];
  text: string;
  media: IMessageMedia[];
  timestamp: Date;
  views: IUser["_id"][];
}
