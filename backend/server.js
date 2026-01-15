import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import courseRoutes from "./Routes/courseRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "✅ API PhysicLearn - Bcrypt dans Controller",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur ${PORT}`);
});
