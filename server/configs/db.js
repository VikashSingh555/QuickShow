import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Database Connected");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

export default connectDB;