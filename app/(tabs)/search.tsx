import { Header } from '@/components/Header';
import { PantunCard } from '@/components/PantunCard';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, View } from 'react-native';

interface ApiPantun {
  pantun_bayang1: string;
  pantun_bayang2: string;
  pantun_maksud1: string;
  pantun_maksud2: string;
  pantun_id: number;
  pantun_jenis: number;
  sumber_tajuk: string;
}

function debounce<F extends (...args: any[]) => void>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as F;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ApiPantun[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = React.useCallback(
    debounce(async (text: string) => {
      if (!text) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://pantunis-api-vercel.vercel.app/api/cariGunaKata?kata=${encodeURIComponent(
            text
          )}`
        );
        const data = await res.json();
        // API returns an object. Wrap in array for uniformity.
        setResults(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  return (
    <View style={styles.container}>
      <Header title="Cari Pantun" leftIcon="chevron.left" />
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" color="#687076" size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari kata atau frasa..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <IconSymbol name="slider.horizontal.3" color="#00936a" size={24} />
      </View>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {loading && <ActivityIndicator color="#00936a" />}
        {!loading && results.length === 0 && query.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" color="#C0C0C0" size={48} />
            <ThemedText lightColor="#C0C0C0" darkColor="#C0C0C0" style={{ marginTop: 8 }}>
              Masukkan kata kunci untuk mencari pantun
            </ThemedText>
          </View>
        )}
        {!loading && results.length === 0 && query.length > 0 && (
          <ThemedText>Tidak jumpa hasil.</ThemedText>
        )}
        {results.map((p) => (
          <PantunCard
            key={p.pantun_id}
            id={p.pantun_id}
            tag={"Pantun"}
            lines={[p.pantun_bayang1, p.pantun_bayang2, p.pantun_maksud1, p.pantun_maksud2]}
            source={p.sumber_tajuk}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 6,
  },
  resultsContainer: { flexGrow: 1, padding: 16 },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
}); 