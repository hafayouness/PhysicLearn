import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Lesson } from "../types/lesson";
import { COLORS } from "../utils/constants";

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  isCompleted?: boolean;
}

export default function LessonCard({
  lesson,
  onPress,
  isCompleted = false,
}: LessonCardProps) {
  const getTypeIcon = () => {
    switch (lesson.type_contenu) {
      case "video":
        return "video-outline";
      case "pdf":
        return "file-pdf-box";
      case "mixte":
        return "folder-multiple-outline";
      default:
        return "text-box-outline";
    }
  };

  const getTypeColor = () => {
    switch (lesson.type_contenu) {
      case "video":
        return "#E53935";
      case "pdf":
        return "#FB8C00";
      case "mixte":
        return "#8E24AA";
      default:
        return COLORS.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, !lesson.actif && styles.inactiveCard]}
      onPress={onPress}
      disabled={!lesson.actif}
    >
      <View style={[styles.iconContainer, { backgroundColor: getTypeColor() }]}>
        <MaterialCommunityIcons
          name={getTypeIcon()}
          size={28}
          color={COLORS.white}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.order}>Leçon {lesson.ordre}</Text>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#4CAF50"
              />
              <Text style={styles.completedText}>Terminée</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {lesson.titre}
        </Text>

        <Text style={styles.contentPreview} numberOfLines={2}>
          {lesson.contenu}
        </Text>

        <View style={styles.footer}>
          <View style={styles.meta}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color="#666"
            />
            <Text style={styles.duration}>{lesson.duree} min</Text>
          </View>

          {lesson.fichiers && lesson.fichiers.length > 0 && (
            <View style={styles.meta}>
              <MaterialCommunityIcons
                name="attachment"
                size={14}
                color="#666"
              />
              <Text style={styles.filesCount}>{lesson.fichiers.length}</Text>
            </View>
          )}

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={COLORS.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inactiveCard: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  order: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  completedText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  contentPreview: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    fontSize: 12,
    color: "#666",
  },
  filesCount: {
    fontSize: 12,
    color: "#666",
  },
});
