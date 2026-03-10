import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `🌐 Server is actively listen on PORT:http://localhost:${port}`,
      );
    });

    app.on("error", (error) => {
      console.log("❌ Express error", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("❌ MONGO_DB connection error!!", error);
    process.exit(1);
  });
