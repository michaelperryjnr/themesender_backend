import mongoose, { Schema } from "mongoose";
import { IGroup } from "../interfaces";

const GroupSchema: Schema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", required: true }],
  },
  { timestamps: true }
);

const Group = mongoose.model<IGroup & Document>("Group", GroupSchema);

export default Group;
