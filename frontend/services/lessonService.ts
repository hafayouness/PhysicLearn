import api from "./api";
import { Lesson, LessonCreate } from "../types/lesson";

export const lessonService = {
  getAllLessons: async (): Promise<Lesson[]> => {
    console.log("📚 Fetching all lessons...");
    const response = await api.get("/lessons");
    console.log("response", response.data.data);
    return response.data.data;
  },

  getLessonById: async (id: number): Promise<Lesson> => {
    console.log(`📖 Fetching lesson ${id}...`);
    const response = await api.get(`/lessons/${id}`);
    return response.data.data;
  },

  createLesson: async (lessonData: LessonCreate): Promise<Lesson> => {
    console.log("➕ Creating lesson...", lessonData);
    const response = await api.post("/lessons/", lessonData);
    return response.data.data;
  },

  updateLesson: async (
    id: number,
    lessonData: Partial<Lesson>,
  ): Promise<Lesson> => {
    console.log(`✏️ Updating lesson ${id}...`, lessonData);
    const response = await api.put(`/lessons/${id}`, lessonData);
    return response.data.data;
  },

  deleteLesson: async (id: number): Promise<void> => {
    console.log(`🗑️ Deleting lesson ${id}...`);
    await api.delete(`/lessons/${id}`);
  },
};
