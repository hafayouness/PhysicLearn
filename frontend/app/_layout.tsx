import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { setAuthToken } from "../services/api";

const queryClient = new QueryClient();

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 🔥 CRITIQUE : Restaurer le token au démarrage de l'app
  useEffect(() => {
    console.log("🔄 RootLayout useEffect - token:", token);
    console.log("🔄 RootLayout useEffect - isAuthenticated:", isAuthenticated);

    if (token && isAuthenticated) {
      console.log("✅ Restauration du token au démarrage");
      setAuthToken(token);
    } else {
      console.log("❌ Pas de token à restaurer");
    }
  }, [token, isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
