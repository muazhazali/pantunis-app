import { useAuth } from '@/hooks/useAuth';
import { OAuthProvider } from 'appwrite';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginForm() {
  const { login, register, loading, account, refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      if (isRegistering) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    }
  };

  const googleLogin = async () => {
    try {
      const success = Platform.OS === 'web' ? window.location.origin : 'pantunisapp://auth';
      const failure = success;

      if (Platform.OS === 'web') {
        // SDK handles redirection internally for web
        await account.createOAuth2Session(
          OAuthProvider.Google,
          success,
          failure,
          ['email', 'profile']
        );
        // After redirect back, session is set and AuthProvider reloads user.
        return;
      }

      // Native: we need to open the returned URL manually
      const authUrl = account.createOAuth2Session(
        OAuthProvider.Google,
        success,
        failure,
        ['email', 'profile']
      ) as unknown as string;

      await WebBrowser.openAuthSessionAsync(authUrl, success);
      await refreshUser();
    } catch (err: any) {
      Alert.alert('Google login failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Daftar' : 'Log Masuk'}</Text>

      {isRegistering && (
        <TextInput
          placeholder="Nama Penuh"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
        />
      )}

      <TextInput
        placeholder="E-mel"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Kata Laluan"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator style={{ marginVertical: 16 }} />
      ) : (
        <Button title={isRegistering ? 'Daftar' : 'Log Masuk'} onPress={handleSubmit} />
      )}

      <Button
        title={isRegistering ? 'Saya sudah ada akaun' : 'Daftar akaun baharu'}
        onPress={() => setIsRegistering((prev) => !prev)}
      />

      <Button title="Sign in with Google" onPress={googleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
}); 