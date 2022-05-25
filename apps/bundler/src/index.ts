import mongoose from "mongoose";
import app from "./app";
import queue, { defineJob } from "./queue";
import relayProcessor from "./processors/relay.processor";
import { Env } from "./config";
import { logger } from "./utils";

mongoose.connect(Env.MONGO_URL).then(() => {
  logger.info("Connected to MongoDB");

  app.listen(Env.PORT, () => {
    logger.info(`Listening to port ${Env.PORT}`);
  });

  queue.start().then(() => {
    logger.info("Connected to job queue");

    defineJob("relay", relayProcessor);
  });
});
