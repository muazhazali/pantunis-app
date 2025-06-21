import { Header } from '@/components/Header';
import { PantunCard } from '@/components/PantunCard';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SAMPLE_PANTUN = [
  {
    id: 1,
    tag: 'Kasih Sayang',
    lines: [
      'Bunga melati di taman sari',
      'Harum semerbak di pagi hari',
      'Jika hati penuh dengan kasih',
      'Hidup akan selalu berseri',
    ],
    favorite: true,
  },
  {
    id: 2,
    tag: 'Motivasi',
    lines: [
      'Burung merpati terbang tinggi',
      'Mencari makan di sawah padi',
      'Jangan mudah berputus asa',
      'Kerana hidup penuh bererti',
    ],
    favorite: false,
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
    favorite: true,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  function handleSearch() {
    router.push('/search' as any);
  }

  async function handleRandom() {
    try {
      // Pick a random letter to fetch pantun
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      const pantunRes = await fetch(
        `https://pantunis-api-vercel.vercel.app/api/cariGunaKata?kata=${randomLetter}`
      );
      const data = await pantunRes.json();
      const p = Array.isArray(data) ? data[0] : data;
      if (!p) throw new Error('Tidak jumpa pantun');
      Alert.alert('Pantun Rawak', `${p.pantun_bayang1}
${p.pantun_bayang2}
${p.pantun_maksud1}
${p.pantun_maksud2}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Ralat', 'Tidak dapat memuat pantun rawak');
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Pantunis" subtitle="Khazanah Pantun Melayu" rightIcon="chevron.right" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
            <IconSymbol name="magnifyingglass" color="#00936a" size={18} />
            <ThemedText style={styles.actionLabel}>Cari Pantun</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleRandom}>
            <IconSymbol name="die.face.5" color="#00936a" size={18} />
            <ThemedText style={styles.actionLabel}>Pantun Rawak</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Pantun Pilihan</ThemedText>
          <View style={styles.popularTag}>
            <IconSymbol name="star" color="#00936a" size={14} />
            <ThemedText style={styles.popularText}>Terpopular</ThemedText>
          </View>
        </View>
        {SAMPLE_PANTUN.map((p) => (
          <PantunCard
            key={p.id}
            id={p.id}
            tag={p.tag}
            lines={p.lines}
            isFavorite={p.favorite}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  actionLabel: {
    marginLeft: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    marginLeft: 2,
  },
});
