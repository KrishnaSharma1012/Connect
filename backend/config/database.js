import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    if (error.message.includes("whitelist")) {
      console.warn("👉 TIP: Check your MongoDB Atlas Network Access settings (whitelist your current IP).");
    }
    throw error; // Rethrow to let the caller (index.js) handle it
  }
};

export default connectDB;