import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Lesson } from "../../../types/lesson";
import { useAuthStore } from "../../../store/authStore";
import { useLesson } from "../../../hooks/useLesson";
// import { useProgress } from "../hooks/useProgress";
import { COLORS } from "../../../utils/constants";

interface LessonDetailsProps {
  lesson: Lesson;
  onClose: () => void;
  isCompleted?: boolean;
}

export default function LessonDetails({
  lesson,
  onClose,
  isCompleted = false,
}: LessonDetailsProps) {
  const user = useAuthStore((state) => state.user);
  const { remove } = useLesson();
  // const { markComplete } = useProgress();
  const [activeTab, setActiveTab] = useState<"content" | "files">("content");

  // const handleMarkComplete = () => {
  //   markComplete.mutate({
  //     id_lesson: lesson.id,
  //     temps_passe: lesson.duree * 60,
  //   });
  // };

  const handleDelete = () => {
    Alert.alert(
      "Supprimer la leçon",
      `Voulez-vous vraiment supprimer "${lesson.titre}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            remove.mutate(lesson.id);
            onClose();
          },
        },
      ],
    );
  };

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leçon {lesson.ordre}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Status Banner */}
      {isCompleted && (
        <View style={styles.completedBanner}>
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color="#4CAF50"
          />
          <Text style={styles.completedBannerText}>
            Vous avez terminé cette leçon
          </Text>
        </View>
      )}

      {/* Type Badge */}
      <View style={styles.typeBadge}>
        <MaterialCommunityIcons
          name={getTypeIcon()}
          size={20}
          color={COLORS.primary}
        />
        <Text style={styles.typeText}>{lesson.type_contenu.toUpperCase()}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "content" && styles.activeTab]}
          onPress={() => setActiveTab("content")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "content" && styles.activeTabText,
            ]}
          >
            Contenu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "files" && styles.activeTab]}
          onPress={() => setActiveTab("files")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "files" && styles.activeTabText,
            ]}
          >
            Fichiers ({lesson.fichiers?.length || 0})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "content" ? (
          <View style={styles.contentTab}>
            <Text style={styles.title}>{lesson.titre}</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.infoText}>
                  Durée: {lesson.duree} minutes
                </Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="sort-numeric-ascending"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.infoText}>Ordre: {lesson.ordre}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name={lesson.actif ? "check-circle" : "close-circle"}
                  size={20}
                  color={lesson.actif ? "#4CAF50" : "#E53935"}
                />
                <Text style={styles.infoText}>
                  {lesson.actif ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>

            {lesson.video_url && (
              <View style={styles.videoSection}>
                <Text style={styles.sectionTitle}>🎥 Vidéo</Text>
                <View style={styles.videoPlaceholder}>
                  <MaterialCommunityIcons
                    name="play-circle-outline"
                    size={64}
                    color={COLORS.primary}
                  />
                  <Text style={styles.videoUrl} numberOfLines={1}>
                    {lesson.video_url}
                  </Text>
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>📝 Contenu de la leçon</Text>
            <Text style={styles.contentText}>{lesson.contenu}</Text>
          </View>
        ) : (
          <View style={styles.filesTab}>
            {lesson.fichiers && lesson.fichiers.length > 0 ? (
              lesson.fichiers.map((file, index) => (
                <TouchableOpacity key={index} style={styles.fileItem}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={32}
                    color={COLORS.primary}
                  />
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.split("/").pop()}
                    </Text>
                    <Text style={styles.fileType}>Document</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="download"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="file-outline"
                  size={64}
                  color="#CCC"
                />
                <Text style={styles.emptyText}>Aucun fichier disponible</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.actions}>
        {user?.role === "etudiant" && !isCompleted && (
          <TouchableOpacity
            style={styles.completeButton}
            // onPress={handleMarkComplete}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.completeButtonText}>
              Marquer comme terminée
            </Text>
          </TouchableOpacity>
        )}

        {user?.role === "admin" && (
          <>
            <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#FFF" />
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 12,
    gap: 8,
  },
  completedBannerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  contentTab: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
  },
  videoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  videoPlaceholder: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  videoUrl: {
    fontSize: 13,
    color: "#666",
  },
  contentText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  filesTab: {
    padding: 20,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  fileType: {
    fontSize: 13,
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  actions: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  completeButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#E53935",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
