import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

// ❌ yahan se hata diya: await connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ Test route (yahan DB connect karao)
app.get("/", async (req, res) => {
  await connectDB();
  res.send("Server is Live!");
});

// ✅ Inngest route (DB yahan nahi chalega)
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// Start server only for local
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Export for Vercel
export default app;