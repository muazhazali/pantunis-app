import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface PantunCardProps {
  id: number | string;
  tag: string;
  lines: string[]; // 4 lines expected
  isFavorite?: boolean;
  onToggleFavorite?: (id: PantunCardProps['id'], newValue: boolean) => void;
  source?: string;
}

export function PantunCard({
  id,
  tag,
  lines,
  isFavorite: initialFavorite = false,
  onToggleFavorite,
  source = 'Tradisional',
}: PantunCardProps) {
  const [favorite, setFavorite] = useState(initialFavorite);

  function handleToggle() {
    const newValue = !favorite;
    setFavorite(newValue);
    onToggleFavorite?.(id, newValue);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.tagChip}>
          <ThemedText style={styles.tagText}>{tag}</ThemedText>
        </View>
        <TouchableOpacity onPress={handleToggle} hitSlop={8}>
          <IconSymbol
            name={favorite ? 'heart.fill' : 'heart'}
            size={20}
            color={favorite ? '#e53935' : '#687076'}
          />
        </TouchableOpacity>
      </View>
      {lines.map((line, idx) => (
        <ThemedText key={idx}>{line}</ThemedText>
      ))}
      <ThemedText style={styles.sourceText} lightColor="#999" darkColor="#999">
        — {source}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagChip: {
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
  },
  sourceText: {
    marginTop: 8,
    fontStyle: 'italic',
    fontSize: 12,
  },
}); 