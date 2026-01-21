import api from "./api";
import { Quiz, QuizCreate, QuizSubmission } from "../types/quiz";

export const quizService = {
  getAllQuizzes: async (): Promise<Quiz[]> => {
    console.log("Fetching all quizzes...");
    const response = await api.get("/quizzes/");
    console.log("response", response.data.data);
    return response.data.data;
  },

  getQuizById: async (id: number): Promise<Quiz> => {
    console.log(`📖 Fetching quiz ${id}...`);
    const response = await api.get(`/quizzes/${id}`);
    return response.data.data;
  },

  submitQuiz: async (id: number, submission: QuizSubmission) => {
    console.log(`Submitting quiz ${id}...`, submission);
    const response = await api.post(`/quizzes/${id}/submit`, submission);
    return response.data.data;
  },

  createQuiz: async (quizData: QuizCreate): Promise<Quiz> => {
    console.log("Creating quiz...", quizData);
    const response = await api.post("/quizzes/", quizData);
    return response.data.data;
  },

  updateQuiz: async (id: number, quizData: Partial<Quiz>): Promise<Quiz> => {
    console.log(`Updating quiz ${id}...`, quizData);
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data.data;
  },

  deleteQuiz: async (id: number): Promise<void> => {
    console.log(`Deleting quiz ${id}...`);
    await api.delete(`/quizzes/${id}`);
  },
};
