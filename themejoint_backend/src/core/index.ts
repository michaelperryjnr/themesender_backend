import { config } from "dotenv";

config();

const PORT: string | number = process.env.PORT || 5000;
const NODE_ENV: string = process.env.NODE_ENV!;
const MONGO_URI: string = process.env.MONGO_URI!;
const JWT_SECRETS = {
  access: process.env.ACCESS_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};
const SESSION_SECRET: string = process.env.SESSION_SECRETS!;

export { PORT, NODE_ENV, MONGO_URI, JWT_SECRETS, SESSION_SECRET };
