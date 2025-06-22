import { Header } from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { PantunCard } from '@/components/PantunCard';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import { useFavourites } from '@/hooks/useFavourites';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  const { user, loading: authLoading } = useAuth();
  const { documents, loading } = useFavourites();

  if (authLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <View style={styles.container}>
      <Header title="Pantun Kegemaran" />
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText style={{ marginBottom: 8 }}>{documents.length} pantun disimpan</ThemedText>
          {documents.map((doc) => (
            <PantunCard
              key={doc.$id}
              id={doc.pantunId}
              tag={doc.tag ?? ''}
              lines={doc.lines ?? []}
              isFavorite={true}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
}); 