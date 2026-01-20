import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Lesson } from "../types/lesson";
// import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  lesson: Lesson;
};

const typeConfig = {
  texte: {
    label: "Texte",
    icon: "document-text-outline",
    color: "#3B82F6",
  },
  video: {
    label: "Vidéo",
    icon: "play-circle-outline",
    color: "#EF4444",
  },
  pdf: {
    label: "PDF",
    icon: "document-outline",
    color: "#F59E0B",
  },
  mixte: {
    label: "Mixte",
    icon: "layers-outline",
    color: "#8B5CF6",
  },
};

const LessonCard: React.FC<Props> = ({ lesson }) => {
  const type = typeConfig[lesson.type_contenu];

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.titre}>{lesson.titre}</Text>

        <View style={[styles.badge, { backgroundColor: type.color }]}>
          <Ionicons name={type.icon as any} size={14} color="#fff" />
          <Text style={styles.badgeText}>{type.label}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="time-outline" size={16} color="#6B7280" />
        <Text style={styles.info}>{lesson.duree} min</Text>

        <Ionicons
          name="list-outline"
          size={16}
          color="#6B7280"
          style={{ marginLeft: 16 }}
        />
        <Text style={styles.info}>Ordre {lesson.ordre}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titre: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  info: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
});

export default LessonCard;
