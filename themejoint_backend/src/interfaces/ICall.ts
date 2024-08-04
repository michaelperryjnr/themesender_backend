import { Document } from "mongoose";
import IUser from "./IUser";

export default interface ICall extends Document {
  caller: IUser["_id"];
  receiver: IUser["_id"];
  startTime: Date;
  endTime: Date;
  duration: number;
  callType: "voice" | "video";
}
