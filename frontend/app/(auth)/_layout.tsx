import { Stack } from "expo-router";
import { COLORS } from "../../utils/constants";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitle: "Retour",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Connexion",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Inscription",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
