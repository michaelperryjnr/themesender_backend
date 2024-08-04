import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    role: { type: String, required: true },
    about: { type: String, required: false },
    contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    lastSeen: { type: Date, required: true },
    location: { type: String, required: false },
    active: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser & Document>("User", UserSchema);

export default User;
