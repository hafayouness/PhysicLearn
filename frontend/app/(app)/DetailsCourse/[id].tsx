import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Course } from "../../../types/course";
import { useAuthStore } from "../../../store/authStore";
import { useCourse } from "../../../hooks/useCourses";
import { COLORS } from "../../../utils/constants";

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

export default function CourseDetails({ course, onClose }: CourseDetailsProps) {
  const user = useAuthStore((state) => state.user);
  const { remove } = useCourse();
  const [activeTab, setActiveTab] = useState<"details" | "files">("details");

  const handleDelete = () => {
    Alert.alert(
      "Supprimer le cours",
      `Voulez-vous vraiment supprimer "${course.titre}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            remove.mutate(course.id);
            onClose();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header avec image */}
      <View style={styles.header}>
        {course.image ? (
          <Image
            source={{ uri: course.image }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.headerPlaceholder}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={64}
              color={COLORS.primary}
            />
          </View>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "details" && styles.activeTab]}
          onPress={() => setActiveTab("details")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "details" && styles.activeTabText,
            ]}
          >
            Détails
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
            Fichiers ({course.fichiers?.length || 0})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "details" ? (
          <View style={styles.detailsContent}>
            <Text style={styles.title}>{course.titre}</Text>

            <View style={styles.metaRow}>
              <View style={styles.badge}>
                <MaterialCommunityIcons
                  name="school-outline"
                  size={16}
                  color={COLORS.primaryDark}
                />
                <Text style={styles.badgeText}>{course.niveau}</Text>
              </View>
              <View style={styles.badge}>
                <MaterialCommunityIcons
                  name="tag-outline"
                  size={16}
                  color={COLORS.primaryDark}
                />
                <Text style={styles.badgeText}>{course.categorie}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.infoText}>
                  Durée estimée: {course.duree_estimee}h
                </Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="sort-numeric-ascending"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.infoText}>Ordre: {course.ordre}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>📖 Description</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>
        ) : (
          <View style={styles.filesContent}>
            {course.fichiers && course.fichiers.length > 0 ? (
              course.fichiers.map((file, index) => (
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
                    <Text style={styles.fileSize}>Document PDF</Text>
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

      {/* Actions (admin seulement) */}
      {user?.role === "admin" && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialCommunityIcons name="delete" size={20} color="#FFF" />
            <Text style={styles.deleteButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 250,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  detailsContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primaryDark,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  filesContent: {
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
  fileSize: {
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
