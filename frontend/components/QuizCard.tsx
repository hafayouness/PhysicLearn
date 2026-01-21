import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Quiz } from "../types/quiz";
import { COLORS } from "../utils/constants";

interface QuizCardProps {
  quiz: Quiz;
  onPress: () => void;
  score?: number;
  isPassed?: boolean;
}

export default function QuizCard({
  quiz,
  onPress,
  score,
  isPassed,
}: QuizCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={32}
          color={COLORS.white}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.order}>Quiz {quiz.ordre}</Text>
          {score !== undefined && (
            <View
              style={[
                styles.scoreBadge,
                { backgroundColor: isPassed ? "#4CAF50" : "#E53935" },
              ]}
            >
              <Text style={styles.scoreText}>{score}%</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {quiz.titre}
        </Text>

        {quiz.description && (
          <Text style={styles.description} numberOfLines={2}>
            {quiz.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.meta}>
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={14}
              color="#666"
            />
            <Text style={styles.metaText}>
              {quiz.questions.length} questions
            </Text>
          </View>

          <View style={styles.meta}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color="#666"
            />
            <Text style={styles.metaText}>{quiz.duree} min</Text>
          </View>

          <View style={styles.meta}>
            <MaterialCommunityIcons name="target" size={14} color="#666" />
            <Text style={styles.metaText}>{quiz.note_passage}%</Text>
          </View>
        </View>

        {!quiz.actif && (
          <View style={styles.inactiveBadge}>
            <Text style={styles.inactiveText}>Inactif</Text>
          </View>
        )}
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
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
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
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  inactiveBadge: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  inactiveText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#E53935",
  },
});
