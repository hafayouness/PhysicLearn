import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuthStore } from "../../store/authStore";
import { useCourse } from "../../hooks/useCourses";
import { COLORS } from "../../utils/constants";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const { getAll } = useCourse();
  const { data: courses, isLoading } = getAll;

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case "Admin":
        return "👨‍💼";
      case "Prof":
        return "👨‍🏫";
      case "Etudiant":
        return "👨‍🎓";
      default:
        return "👤";
    }
  };

  const courseStyleByCategorie = (categorie: string) => {
    switch (categorie) {
      case "Mécanique":
        return { icon: "car-brake-abs", color: "#FF6B6B" };
      case "Électricité":
        return { icon: "flash", color: "#4ECDC4" };
      case "Optique":
        return { icon: "eye", color: "#FFD93D" };
      case "Thermodynamique":
        return { icon: "fire", color: "#FF6F3C" };
      case "Électromagnétisme":
        return { icon: "magnet", color: "#EF4444" };
      default:
        return { icon: "book-open-variant", color: "#3B82F6" };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>
            {getRoleEmoji(user?.role || "")} {user?.nom || "Etudiant"}
          </Text>
          <Text style={styles.userRole}>{user?.role}</Text>
        </View>

        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="bell" size={24} color={COLORS.white} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#FF6B6B" }]}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={30}
              color="#FFF"
            />
            <Text style={styles.statNumber}>{courses?.length || 0}</Text>
            <Text style={styles.statLabel}>Cours</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: "#4ECDC4" }]}>
            <MaterialCommunityIcons
              name="check-circle"
              size={30}
              color="#FFF"
            />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Complétés</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: "#FFD93D" }]}>
            <MaterialCommunityIcons name="trophy" size={30} color="#FFF" />
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
                <MaterialCommunityIcons
                  name="play-circle"
                  size={32}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.actionText}>Reprendre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={32}
                  color="#2196F3"
                />
              </View>
              <Text style={styles.actionText}>Planning</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={32}
                  color="#FF9800"
                />
              </View>
              <Text style={styles.actionText}>Progrès</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#F3E5F5" }]}>
                <MaterialCommunityIcons
                  name="help-circle"
                  size={32}
                  color="#9C27B0"
                />
              </View>
              <Text style={styles.actionText}>Aide</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes cours</Text>
            <TouchableOpacity onPress={() => router.push("/(app)/courses")}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

          {courses?.map((course) => {
            const { icon, color } = courseStyleByCategorie(course.categorie);

            return (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() =>
                  router.push({
                    pathname: "/(app)/course/[id]",
                    params: { id: String(course.id) },
                  })
                }
              >
                <View
                  style={[styles.courseIcon, { backgroundColor: color + "20" }]}
                >
                  <MaterialCommunityIcons
                    name={icon as any}
                    size={32}
                    color={color}
                  />
                </View>

                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.titre}</Text>
                  {/* <Text style={styles.courseLessons}>
                    {course.lessons?.length || 0} leçons disponibles
                  </Text> */}
                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#90A4AE"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    marginTop: 5,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 2,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: -15,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFF",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#FFF",
    marginTop: 4,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "23%",
    alignItems: "center",
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: "600",
    textAlign: "center",
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  courseIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  courseLessons: {
    fontSize: 13,
    color: "#90A4AE",
  },
});
