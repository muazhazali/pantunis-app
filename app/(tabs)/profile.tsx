import { Header } from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="Ahmad Malik" subtitle="Peminat Pantun" />
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">2</ThemedText>
          <ThemedText>Kegemaran</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">127</ThemedText>
          <ThemedText>Dibaca</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle">23</ThemedText>
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