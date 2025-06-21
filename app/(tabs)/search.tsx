import { Header } from '@/components/Header';
import { PantunCard } from '@/components/PantunCard';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, TextInput, View } from 'react-native';

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
  const [page, setPage] = useState(0);
  const LIMIT = 20;

  const fetchResults = useCallback(
    debounce(async (text: string, reset: boolean = false) => {
      if (!text) {
        setResults([]);
        setPage(0);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://pantunis-api-vercel.vercel.app/api/cariGunaKata?kata=${encodeURIComponent(
            text
          )}&offset=${reset ? 0 : page * LIMIT}&limit=${LIMIT}`
        );
        const data = await res.json();
        // API returns an object. Wrap in array for uniformity.
        const newItems = Array.isArray(data) ? data : [data];
        setResults((prev) => (reset ? newItems : [...prev, ...newItems]));
        if (newItems.length > 0) {
          setPage((prev) => prev + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [page]
  );

  useEffect(() => {
    fetchResults(query, true);
  }, [query]);

  const loadMore = () => {
    if (!loading && query) {
      fetchResults(query);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<ApiPantun>) => (
    <PantunCard
      id={item.pantun_id}
      tag={"Pantun"}
      lines={[item.pantun_bayang1, item.pantun_bayang2, item.pantun_maksud1, item.pantun_maksud2]}
      source={item.sumber_tajuk}
    />
  );

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
            onChangeText={(t) => {
              setPage(0);
              setQuery(t);
            }}
          />
        </View>
        <IconSymbol name="slider.horizontal.3" color="#00936a" size={24} />
      </View>
      {results.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <IconSymbol name="magnifyingglass" color="#C0C0C0" size={48} />
          <ThemedText lightColor="#C0C0C0" darkColor="#C0C0C0" style={{ marginTop: 8 }}>
            {query ? 'No results found' : 'Enter keywords to search pantun'}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.pantun_id)}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={loading ? <ActivityIndicator color="#00936a" /> : null}
        />
      )}
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