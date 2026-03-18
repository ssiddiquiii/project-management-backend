import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic configuration of express
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// cookie-parser
app.use(cookieParser());

// import routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouer from "./routes/auth.routes.js"

// routes  define
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouer)

export default app;
