import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Course } from "../types/course";

type Props = {
  course: Course;
  onPress: () => void;
};

export default function CourseCard({ course, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.titre}>{course.titre}</Text>
      <Text style={styles.niveau}>Niveau : {course.niveau}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  titre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  niveau: {
    fontSize: 14,
    color: "#666",
  },
});
