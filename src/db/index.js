import dns from "node:dns/promises"
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"])

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
    );
    console.log(
      `✅ MONGO_DB connected!! DB_HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("❌ MONGO_DB connection failed!!", error);
    process.exit(1);
  }
};

export { connectDB };   