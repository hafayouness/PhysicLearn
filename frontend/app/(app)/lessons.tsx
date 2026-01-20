import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import LessonCard from "../../components/LessonCard";
import { useLesson } from "../../hooks/useLesson";

const Lessons = () => {
  const { getAll } = useLesson();
  console.log(getAll);

  if (getAll.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement des leçons...</Text>
      </View>
    );
  }

  if (getAll.isError) {
    return (
      <View style={styles.center}>
        <Text>Erreur lors du chargement des leçons.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Liste des leçons</Text>

      {getAll.data?.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Lessons;
