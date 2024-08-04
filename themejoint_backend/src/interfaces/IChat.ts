import { Document } from "mongoose";
import IMessage from "./IMessage";
import IUser from "./IUser";
import IGroup from "./IGroup";

export default interface IChat extends Document {
  chatRoomId: string;
  lastMessage: IMessage["_id"];
  messages: IMessage["_id"][];
  active: boolean;
  type: "private" | "group";
  participants?: IUser["_id"][];
  group?: IGroup["_id"];
}
