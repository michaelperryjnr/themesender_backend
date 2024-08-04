import mongoose, { Document, Schema } from "mongoose";
import { IToken } from "../interfaces";

const TokenSchema: Schema = new Schema<IToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Token = mongoose.model<IToken>("Token", TokenSchema);

export default Token;
