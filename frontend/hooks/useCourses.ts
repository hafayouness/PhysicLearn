import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { Course, CourseCreate } from "../types/course";
import { Alert } from "react-native";

export const useCourse = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAllCourses,
    staleTime: 5 * 60 * 1000,
  });

  const getCourseById = (id: number) =>
    useQuery({
      queryKey: ["course", id],
      queryFn: () => courseService.getCourseById(id),
      enabled: typeof id === "number" && !isNaN(id),
    });

  const create = useMutation({
    mutationFn: (data: CourseCreate) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Alert.alert("Succès", "Cours créé avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Erreur lors de la création du cours";
      Alert.alert("Erreur", message);
      console.error("Create course error:", error);
    },
  });

  // ✅ Modifier un cours
  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Course> }) =>
      courseService.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Alert.alert("Succès", "Cours modifié avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la modification du cours";
      Alert.alert("Erreur", message);
      console.error("Update course error:", error);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Alert.alert("Succès", "Cours supprimé avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la suppression du cours";
      Alert.alert("Erreur", message);
      console.error("Delete course error:", error);
    },
  });

  return {
    getAll,
    getCourseById,
    create,
    update,
    remove,
  };
};
