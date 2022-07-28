import mongoose from "mongoose";
import config from "config"
import logger from "./logger";

const connection = async () => {
  const dbUrl = config.get<string>("dbUrl")

  try {
    await mongoose.connect(dbUrl)
    logger.info("Successfully connect to database")
  } catch (error) {
    logger.error("Could not connect to database")
    process.exit(1)
  }
}

export default connection