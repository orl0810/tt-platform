import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSessions } from "@tt-platform/shared";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const session = getSessionById(id);

  if (!session) {
    return (
      <View style={styles.center}>
        <Text>Session not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.description}>{session.description}</Text>
      <Text style={styles.meta}>Duration: {session.durationMinutes} min</Text>
      <Text style={styles.meta}>Level: {session.level}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
 fontSize: 24, fontWeight: "700", marginBottom: 12 },
  description: { fontSize: 16, color: "#475569", marginBottom: 16 },
  meta: { fontSize: 14, color: "#94a3b8", marginBottom: 8 },
});
