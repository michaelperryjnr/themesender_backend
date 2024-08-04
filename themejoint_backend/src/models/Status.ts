import mongoose, { Document, Schema } from "mongoose";
import { IStatus, IMessageMedia } from "../interfaces";

const MessageMediaSchema: Schema<IMessageMedia> = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ["audio", "text", "image"], required: true },
  size: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const StatusSchema: Schema<IStatus> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  statusText: { type: String, required: false },
  media: [MessageMediaSchema],
  timestamp: { type: Date, default: Date.now },
  viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Status = mongoose.model<IStatus & Document>("Status", StatusSchema);

export default Status;
