import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signup, login } from '../src/utils/auth';

export default function ApiTestScreen() {
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    try {
      console.log('Testing signup...');
      const result = await signup({
        fullName: 'Test User',
        phoneNo: '1234567890',
        email: 'test@example.com',
        password: 'password123',
        role: 'client'
      });
      
      console.log('Signup result:', result);
      
      if (result.success) {
        Alert.alert('Success', 'Signup worked!');
      } else {
        Alert.alert('Failed', result.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      console.log('Testing login...');
      const result = await login('test@example.com', 'password123');
      
      console.log('Login result:', result);
      
      if (result.success) {
        Alert.alert('Success', 'Login worked!');
      } else {
        Alert.alert('Failed', result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Connection Test</Text>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]}
        onPress={testSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Signup'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={testLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Login'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Check console logs for detailed API responses
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});