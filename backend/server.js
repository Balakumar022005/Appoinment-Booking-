import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

import authRoute from "./routes/auth.js";
import appointmentsRoute from "./routes/appointments.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/appointments", appointmentsRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Atlas Connected ✔");

    // --- Create Default Admin (Runs ONCE) ---
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        fullName: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("🔥 Admin Account Created → Email: admin@gmail.com | Password: admin123");
    } else {
      console.log("✔ Admin already exists. Skipping setup.");
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
