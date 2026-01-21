import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import CourseCard from "../../components/CourseCard";
import { useCourse } from "../../hooks/useCourses";

export default function CoursesScreen() {
  const router = useRouter();
  const { getAll } = useCourse();
  const { data, isLoading, isError } = getAll;
  console.log(data);

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (isError) {
    return <Text style={styles.error}>Erreur de chargement des cours</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => router.push(`/DetailsCourse/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun cours disponible</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  error: {
    textAlign: "center",
    marginTop: 40,
    color: "red",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
});
