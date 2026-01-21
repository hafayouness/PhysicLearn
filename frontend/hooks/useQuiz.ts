import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quizService } from "../services/quizService";
import { Quiz, QuizCreate, QuizSubmission } from "../types/quiz";
import { Alert } from "react-native";

export const useQuiz = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["quizzes"],
    queryFn: quizService.getAllQuizzes,
    staleTime: 5 * 60 * 1000,
  });

  const getQuizById = (id: number) =>
    useQuery({
      queryKey: ["quiz", id],
      queryFn: () => quizService.getQuizById(id),
      enabled: !!id,
    });

  const submit = useMutation({
    mutationFn: ({
      id,
      submission,
    }: {
      id: number;
      submission: QuizSubmission;
    }) => quizService.submitQuiz(id, submission),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      Alert.alert(
        "Quiz terminé !",
        `Votre score : ${data.score}%\n${data.passed ? "✅ Réussi !" : "❌ Échoué"}`,
      );
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Erreur lors de la soumission du quiz";
      Alert.alert("Erreur", message);
    },
  });

  const create = useMutation({
    mutationFn: (data: QuizCreate) => quizService.createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      Alert.alert("Succès", "Quiz créé avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Erreur lors de la création du quiz";
      Alert.alert("Erreur", message);
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Quiz> }) =>
      quizService.updateQuiz(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      Alert.alert("Succès", "Quiz modifié avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la modification du quiz";
      Alert.alert("Erreur", message);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => quizService.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      Alert.alert("Succès", "Quiz supprimé avec succès !");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la suppression du quiz";
      Alert.alert("Erreur", message);
    },
  });

  return { getAll, getQuizById, submit, create, update, remove };
};
