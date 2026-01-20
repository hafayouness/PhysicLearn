export interface User {
  id: number;
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
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}
