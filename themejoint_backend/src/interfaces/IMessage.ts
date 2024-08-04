import { Document } from "mongoose";
import IUser from "./IUser";
import IMessageMedia from "./IMessageMedia";

export default interface IMessage extends Document {
  sender: IUser["_id"];
  receiver: IUser["_id"];
  message: IUser["_id"];
  text: string;
  media: IMessageMedia[];
  isRead: boolean;
}
