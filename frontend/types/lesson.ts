export interface Lesson {
  id: number;
  titre: string;
  contenu: string;
  id_course: number;
  type_contenu: "texte" | "video" | "pdf" | "mixte";
  video_url?: string;
  fichiers: string[];
  duree: number;
  ordre: number;
  actif: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LessonCreate {
  titre: string;
  contenu: string;
  id_course: number;
  type_contenu: "texte" | "video" | "pdf" | "mixte";
  video_url?: string;
  fichiers?: string[];
  duree?: number;
  ordre?: number;
}
