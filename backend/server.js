import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import courseRoutes from "./Routes/courseRoutes.js";
import lessonRoutes from "./Routes/lessonRoutes.js";
import quizRoutes from "./Routes/quizRoutes.js";
import ProgressRoutes from "./Routes/progressRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
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
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", ProgressRoutes);
export default app;

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur ${PORT}`);
});
