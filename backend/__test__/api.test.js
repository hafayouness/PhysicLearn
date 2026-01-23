import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jest } from "@jest/globals";

// Mock des modèles
jest.unstable_mockModule("../Models/User.js", () => ({
  default: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule("../Models/index.js", () => ({
  Course: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findAndCountAll: jest.fn(),
    create: jest.fn(),
  },
  Lesson: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Quiz: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Progress: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOrCreate: jest.fn(),
    count: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  },
}));

// Import modules mockés
const User = (await import("../Models/User.js")).default;
const { Course, Lesson, Quiz, Progress } = await import("../Models/index.js");

// Import routes
const authRoutes = (await import("../Routes/authRoutes.js")).default;
const courseRoutes = (await import("../Routes/courseRoutes.js")).default;
const lessonRoutes = (await import("../Routes/lessonRoutes.js")).default;
const quizRoutes = (await import("../Routes/quizRoutes.js")).default;
const progressRoutes = (await import("../Routes/progressRoutes.js")).default;
const userRoutes = (await import("../Routes/userRoutes.js")).default;

// Setup Express app
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);

beforeAll(() => {
  process.env.JWT_SECRET = "test-secret-key";
  process.env.JWT_EXPIRE = "1d";
});

afterEach(() => {
  jest.clearAllMocks();
});

/* ====== TESTS ====== */
describe("AUTH - Authentication Tests", () => {
  test("POST /api/auth/register", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      id: 1,
      nom: "Test User",
      email: "test@example.com",
      role: "etudiant",
    });

    const response = await request(app).post("/api/auth/register").send({
      nom: "Test User",
      email: "test@example.com",
      password: "Password123!",
      role: "etudiant",
    });

    expect(response.status).toBe(201);
  });

  test("POST /api/auth/login", async () => {
    const mockUser = {
      id: 1,
      nom: "Test User",
      email: "test@example.com",
      password: await bcrypt.hash("Password123!", 10),
    };

    User.findOne.mockResolvedValue(mockUser);

    // 👇 important pour éviter l'erreur data/hash
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(200);

    bcrypt.compare.mockRestore();
  });
});
