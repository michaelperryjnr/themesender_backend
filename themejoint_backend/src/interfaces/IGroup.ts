import { Document } from "mongoose";
import IUser from "./IUser";
import IMessage from "./IMessage";

export default interface IGroup extends Document {
  name: string;
  description: string;
  members: IUser["_id"][];
  admins: IUser["_id"][];
  messages: IMessage["_id"][];
}
