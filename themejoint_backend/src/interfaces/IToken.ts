import { Document } from "mongoose";
import IUser from "./IUser";

export default interface IToken extends Document {
  userId: IUser["_id"];
  token: string;
  expireAt: Date;
}
