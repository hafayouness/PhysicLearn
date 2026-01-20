// import { create } from "zustand";
// import { CourseState } from "../types/course";
// import { courseService } from "../services/courseService";

// export const useCourseStore = create<CourseState>((set, get) => ({
//   courses: [],
//   loading: false,
//   error: null,

//   setCourses: (courses) => set({ courses }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),

//   loadCourses: async () => {
//     set({ loading: true });
//     try {
//       const res = await courseService.getAllCourses();
//       set({ courses: res.data.courses, loading: false });
//     } catch (err: any) {
//       set({ error: err.message, loading: false });
//     }
//   },
// }));
