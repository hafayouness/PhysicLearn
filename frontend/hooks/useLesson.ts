import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "../services/lessonService";
import { Lesson, LessonCreate } from "../types/lesson";
import { Alert } from "react-native";

export const useLesson = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["lessons"],
    queryFn: lessonService.getAllLessons,
    staleTime: 5 * 60 * 1000,
  });

  const getLessonById = (id: number) =>
    useQuery({
      queryKey: ["lesson", id],
      queryFn: () => lessonService.getLessonById(id),
      enabled: !!id,
    });

  const create = useMutation({
    mutationFn: (data: LessonCreate) => lessonService.createLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      Alert.alert("Succès", "Leçon créée avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la création de la leçon";
      Alert.alert("Erreur", message);
      console.error("Create lesson error:", error);
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Lesson> }) =>
      lessonService.updateLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      Alert.alert("Succès", "Leçon modifiée avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la modification de la leçon";
      Alert.alert("Erreur", message);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => lessonService.deleteLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      Alert.alert("Succès", "Leçon supprimée avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la suppression de la leçon";
      Alert.alert("Erreur", message);
    },
  });

  return { getAll, getLessonById, create, update, remove };
};
