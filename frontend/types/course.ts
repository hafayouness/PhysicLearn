export interface Course {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  niveau: "1ère Bac" | "2ème Bac";
  image: string;
  fichiers: string[];
  duree_estimee: number;
  ordre: number;
  created_at?: string;
  updated_at?: string;
}

export interface CourseCreate {
  titre: string;
  description: string;
  categorie: string;
  niveau: "1ère Bac" | "2ème Bac";
  image: string;
  fichiers?: string[];
  duree_estimee: number;
  ordre?: number;
}
