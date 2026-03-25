import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth, useSubscription } from "@tt-platform/shared";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription(user?.uid);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>
      <Text style={styles.info}>
        Plan: <Text style={{ fontWeight: "700" }}>{subscription?.plan ?? "Free"}</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
 24, fontWeight: "700", marginBottom: 24 },
  info: { fontSize: 16, marginBottom: 12, color: "#334155" },
  button: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
