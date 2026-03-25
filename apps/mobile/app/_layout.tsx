import { Stack } from "expo-router";
import { AuthProvider } from "@tt-platform/shared";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session/[id]" options={{ headerShown: true, title: "Session" }} />
      </Stack>
    </AuthProvider>
  );
}
