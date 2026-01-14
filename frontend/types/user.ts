export interface User {
  id: string;
  nom: string;
  email: string;
  role: "admin" | "prof" | "etudiant";
}

export interface RegisterData {
  nom: string;
  email: string;
  password: string;
  role: "admin" | "prof" | "etudiant";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}
