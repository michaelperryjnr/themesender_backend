import connect from "./src/db";
import App from "./src";
import { NODE_ENV } from "./src/core";

async function startApp() {
  try {
    const { mongoose, mongod } = await connect();
    App();

    console.log(`Server started in ${NODE_ENV} mode`);

    return async () => {
      await mongoose.disconnect();
      if (mongod) {
        await mongod.stop();
      }
      console.log("Disconnecting and cleaning up resources");
    };
  } catch (error: any) {
    console.error("Failed to start application", error.message);
    process.exit(1);
  }
}

startApp()
  .then((cleanup) => {
    process.on("SIGINT", async () => {
      console.log("Shutting down....");
      await cleanup();
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
