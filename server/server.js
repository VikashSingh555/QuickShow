import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// DB connection (serverless safe)
let isConnected = false;

const connectDatabase = async () => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("DB Connected");
    }
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

app.use(async (req, res, next) => {
  await connectDatabase();
  next();
});

//  Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use('/api/inngest', serve({ client: inngest, functions }));

// IMPORTANT: export default (no app.listen)
export default app;