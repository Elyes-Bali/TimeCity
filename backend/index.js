import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import { verifyToken } from "./middleware/verifyToken.js";
import equationRoutes from "./routes/equation.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ⛑ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://codesense-7sfi.onrender.com", // deployed frontend
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// 🛣 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/equations", equationRoutes);
// 📦 Serve Frontend in Production (unchanged)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// 🚀 Start server (unchanged)
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
