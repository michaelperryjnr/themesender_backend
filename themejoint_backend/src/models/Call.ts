import mongoose, { Document, Schema } from "mongoose";
import { ICall } from "../interfaces";

const CallSchema: Schema<ICall> = new Schema({
  caller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  callType: { type: String, enum: ["voice", "video"], required: true },
});

const Call = mongoose.model<ICall & Document>("Call", CallSchema);

export default Call;
