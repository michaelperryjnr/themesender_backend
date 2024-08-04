import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces";

const MessageSchema: Schema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage & Document>("Message", MessageSchema);

export default Message;
