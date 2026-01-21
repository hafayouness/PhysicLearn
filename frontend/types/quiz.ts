export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface Quiz {
  id: number;
  titre: string;
  description?: string;
  id_course: number;
  questions: QuizQuestion[];
  duree: number;
  note_passage: number;
  ordre: number;
  actif: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface QuizCreate {
  titre: string;
  description?: string;
  id_course: number;
  questions: QuizQuestion[];
  duree?: number;
  note_passage?: number;
  ordre?: number;
}

export interface QuizSubmission {
  id_quiz: number;
  reponses: { [key: number]: number };
}
