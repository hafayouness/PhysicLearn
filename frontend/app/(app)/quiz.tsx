// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { useQuiz } from "../../hooks/useQuiz";
// import { useProgress } from "../../hooks/useProgress";
// import { useAuthStore } from "../../store/authStore";
// import QuizCard from "../../components/QuizCard";
// import { COLORS } from "../../utils/constants";
// import { Quiz } from "../../types/quiz";

// export default function QuizScreen() {
//   const { getAll } = useQuiz();
//   const { getUserProgress } = useProgress();
//   const user = useAuthStore((state) => state.user);

//   const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

//   if (getAll.isLoading || getUserProgress.isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text style={styles.loadingText}>Chargement des quiz...</Text>
//       </View>
//     );
//   }

//   if (getAll.isError) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>Erreur lors du chargement des quiz</Text>
//       </View>
//     );
//   }

//   const quizzes = getAll.data ?? [];
//   const progress = getUserProgress.data ?? [];

//   const getQuizScore = (quizId: number) => {
//     const p = progress.find((el) => el.id_quiz === quizId);
//     return p?.score_quiz;
//   };

//   const isQuizPassed = (quiz: Quiz) => {
//     const score = getQuizScore(quiz.id);
//     return score !== undefined && score >= quiz.note_passage;
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={quizzes}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.list}
//         renderItem={({ item }) => (
//           <QuizCard
//             quiz={item}
//             score={getQuizScore(item.id)}
//             isPassed={isQuizPassed(item)}
//             onPress={() => setSelectedQuiz(item)}
//           />
//         )}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>Aucun quiz disponible</Text>
//         }
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F8FA",
//   },
//   list: {
//     padding: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#E53935",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 40,
//     color: "#777",
//   },
// });
