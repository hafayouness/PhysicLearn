import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import { COLORS } from "../../utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);

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

  const courses = [
    {
      id: "1",
      title: "Mécanique",
      icon: "car-brake-abs",
      color: "#FF6B6B",
      lessons: 12,
    },
    {
      id: "2",
      title: "Électricité",
      icon: "flash",
      color: "#4ECDC4",
      lessons: 10,
    },
    {
      id: "3",
      title: "Optique",
      icon: "eye",
      color: "#FFD93D",
      lessons: 8,
    },
    {
      id: "4",
      title: "Thermodynamique",
      icon: "fire",
      color: "#FF6F3C",
      lessons: 9,
    },
  ];

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
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#FF6B6B" }]}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={30}
              color="#FFF"
            />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Cours</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: "#4ECDC4" }]}>
            <MaterialCommunityIcons
              name="check-circle"
              size={30}
              color="#FFF"
            />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Complétés</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: "#FFD93D" }]}>
            <MaterialCommunityIcons name="trophy" size={30} color="#FFF" />
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>

        {/* Quick Actions */}
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
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {courses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View
                style={[
                  styles.courseIcon,
                  { backgroundColor: course.color + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={course.icon as any}
                  size={32}
                  color={course.color}
                />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseLessons}>
                  {course.lessons} leçons disponibles
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#90A4AE"
              />
            </TouchableOpacity>
          ))}
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
