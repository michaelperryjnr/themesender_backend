import mongoose, { Mongoose } from "mongoose";
import { NODE_ENV, MONGO_URI } from "../core";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  try {
    let mongoUri: string = MONGO_URI;
    let mongod: MongoMemoryServer | null = null;

    if (NODE_ENV === "test" || NODE_ENV === "development") {
      mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log(
      `DB connected successfully in ${NODE_ENV} ${
        NODE_ENV !== "production" ? `at ${mongoUri}` : ""
      }`
    );

    return { mongoose, mongod };
  } catch (error: any) {
    console.log("Error connecting to db", error.message);
    throw error;
  }
}

export { connect };
