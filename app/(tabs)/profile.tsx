import { Header } from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <View style={styles.container}>
      <Header title={user.name || 'Profil'} subtitle={user.email} />
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">0</ThemedText>
          <ThemedText>Kegemaran</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">0</ThemedText>
          <ThemedText>Dibaca</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">0</ThemedText>
          <ThemedText>Dikongsi</ThemedText>
        </View>
      </View>
      {/* Additional profile actions can be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0f2f1',
    paddingVertical: 16,
  },
  statItem: { alignItems: 'center' },
}); 