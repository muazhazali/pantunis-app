import { Header } from '@/components/Header';
import { PantunCard } from '@/components/PantunCard';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const FAVORITES = [
  {
    id: 1,
    tag: 'Kasih Sayang',
    lines: [
      'Bunga melati di taman sari',
      'Harum semerbak di pagi hari',
      'Jika hati penuh dengan kasih',
      'Hidup akan selalu berseri',
    ],
  },
  {
    id: 3,
    tag: 'Budi Pekerti',
    lines: [
      'Ikan keli di dalam kolam',
      'Berenang-renang cari makanan',
      'Budi yang baik jangan dilupakan',
      'Kerana ia warisan turun temurun',
    ],
  },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Header title="Pantun Kegemaran" />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={{ marginBottom: 8 }}>{FAVORITES.length} pantun disimpan</ThemedText>
        {FAVORITES.map((p) => (
          <PantunCard key={p.id} id={p.id} tag={p.tag} lines={p.lines} isFavorite={true} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
}); 