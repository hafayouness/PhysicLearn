import api from "./api";
import { Course, CourseCreate } from "../types/course";

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    console.log("📚 Fetching all courses...");
    const response = await api.get("/courses/");
    JSON.stringify(response.data, null, 2);
    console.log("API /courses response 👉", response.data);
    return response.data.data.courses;
  },

  getCourseById: async (id: number): Promise<Course> => {
    console.log(`📖 Fetching course ${id}...`);
    const response = await api.get(`/courses/${id}`);
    return response.data.data;
  },

  createCourse: async (courseData: CourseCreate): Promise<Course> => {
    console.log("➕ Creating course...", courseData);
    const response = await api.post("/courses/", courseData);
    return response.data.data;
  },

  updateCourse: async (
    id: number,
    courseData: Partial<Course>,
  ): Promise<Course> => {
    console.log(`✏️ Updating course ${id}...`, courseData);
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    console.log(`🗑️ Deleting course ${id}...`);
    await api.delete(`/courses/${id}`);
  },
};
