/* import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
 */

// apps/mobile/app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getDb, getFirebaseApp } from '@tt/shared';
import { AppConfig } from '../../src/config';
import { collection, getDocs } from 'firebase/firestore';

type StatusEntry = { label: string; value: string; ok: boolean };

export default function HomeScreen() {
  const [statuses, setStatuses] = useState<StatusEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnections() {
      const results: StatusEntry[] = [];

      // 1. Verify @tt/shared alias resolved
      try {
        const app = getFirebaseApp();
        results.push({
          label: '@tt/shared alias',
          value: `✓ Firebase app: ${app.name}`,
          ok: true,
        });
      } catch (e: any) {
        results.push({ label: '@tt/shared alias', value: `✗ ${e.message}`, ok: false });
      }

      // 2. Verify emulator config was read
      results.push({
        label: 'Emulator host',
        value: AppConfig.emulators.host ?? '⚠️ null (not in dev mode)',
        ok: !!AppConfig.emulators.host,
      });

      // 3. Ping Firestore emulator with a read
      try {
        const db = getDb();
        // Attempt a read — will succeed even on empty collection
        await getDocs(collection(db, '_health_check'));
        results.push({
          label: 'Firestore emulator',
          value: `✓ Connected on port ${AppConfig.emulators.firestorePort}`,
          ok: true,
        });
      } catch (e: any) {
        results.push({
          label: 'Firestore emulator',
          value: `✗ ${e.message}`,
          ok: false,
        });
      }

      setStatuses(results);
      setLoading(false);
    }

    checkConnections();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Firebase Emulator Check</Text>
      <Text style={styles.subtitle}>
        ENV: <Text style={styles.mono}>{AppConfig.appEnv}</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B35" style={{ marginTop: 32 }} />
      ) : (
        statuses.map((s) => (
          <View key={s.label} style={[styles.card, s.ok ? styles.cardOk : styles.cardErr]}>
            <Text style={styles.cardLabel}>{s.label}</Text>
            <Text style={[styles.cardValue, s.ok ? styles.textOk : styles.textErr]}>
              {s.value}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#0F0F0F',
    minHeight: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  mono: {
    fontFamily: 'Courier',
    color: '#FF6B35',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardOk: {
    backgroundColor: '#0A2A1A',
    borderColor: '#1DB954',
  },
  cardErr: {
    backgroundColor: '#2A0A0A',
    borderColor: '#FF4444',
  },
  cardLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  textOk: { color: '#1DB954' },
  textErr: { color: '#FF4444' },
});

