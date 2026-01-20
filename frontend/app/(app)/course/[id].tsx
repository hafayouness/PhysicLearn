import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCourse } from "../../../hooks/useCourses";
import { COLORS } from "../../../utils/constants";

export default function CourseDetails() {
  const { id } = useLocalSearchParams();

  if (!id) {
    return (
      <View style={styles.center}>
        <Text>ID introuvable</Text>
      </View>
    );
  }

  const courseId = Number(id);

  if (isNaN(courseId)) {
    return (
      <View style={styles.center}>
        <Text>ID invalide</Text>
      </View>
    );
  }

  const courseQuery = useCourse().getCourseById(courseId);

  if (courseQuery.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (courseQuery.isError) {
    return (
      <View style={styles.center}>
        <Text>Erreur de chargement du cours</Text>
      </View>
    );
  }

  const course = courseQuery.data;

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Le cours est introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{course.titre}</Text>
        <Text style={styles.desc}>{course.description}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.metaText}>Catégorie: {course.categorie}</Text>
        <Text style={styles.metaText}>Niveau: {course.niveau}</Text>
        <Text style={styles.metaText}>Durée: {course.duree_estimee} min</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 20 },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.primaryDark },
  desc: { fontSize: 14, color: "#666", marginTop: 8 },
  meta: { paddingHorizontal: 20, marginTop: 10 },
  metaText: { fontSize: 14, color: "#444", marginTop: 6 },
});
