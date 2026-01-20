import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, setAuthToken } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "expo-router";
import { ApiError } from "../types/api";
import { LoginData, RegisterData, AuthResponse } from "../types/user";
import { Alert } from "react-native";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const storeLogout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const registerMutation = useMutation<AuthResponse, ApiError, RegisterData>({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const token = response.data.token;
      const user = response.data.user;

      setAuth(user, token);
      setAuthToken(token);

      Alert.alert("Succès", "Compte créé avec succès !");
      router.push("/(auth)/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Erreur lors de l'inscription";
      Alert.alert("Erreur", message);
      console.log("Registration error:", message);
    },
  });

  const loginMutation = useMutation<AuthResponse, ApiError, LoginData>({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const token = response.data.token;
      const user = response.data.user;

      setAuth(user, token);
      setAuthToken(token);

      router.replace("/(app)/home");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Email ou mot de passe incorrect";
      Alert.alert("Erreur", message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      storeLogout();
      setAuthToken(null);
      queryClient.clear();
      router.replace("/");
    },
    onError: () => {
      storeLogout();
      setAuthToken(null);
      queryClient.clear();
      router.replace("/");
    },
  });

  return {
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    user,
    token,

    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    registerError: registerMutation.error,
    loginError: loginMutation.error,
  };
};
