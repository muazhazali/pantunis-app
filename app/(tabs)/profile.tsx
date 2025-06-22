import { Header } from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const { user, loading, logout, sendEmailVerification } = useAuth();

  const handleLogout = () => {
    logout().catch((err) => Alert.alert('Error', err.message));
  };

  const handleVerifyEmail = async () => {
    try {
      await sendEmailVerification();
      Alert.alert('Pengesahan e-mel', 'Sila semak peti masuk anda untuk pautan pengesahan.');
    } catch (err: any) {
      Alert.alert('Ralat', err.message ?? 'Tidak dapat menghantar e-mel pengesahan');
    }
  };

  const needsVerification = user && (user as any).emailVerification === false;

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
      {needsVerification ? (
        <Button title="Sahkan E-mel" onPress={handleVerifyEmail} />
      ) : null}
      <Button title="Log Keluar" onPress={handleLogout} color="#d32f2f" />
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