import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions
  })
);

// Proper startup function
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

startServer();

export default app;