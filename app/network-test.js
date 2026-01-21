import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function NetworkTestScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      addResult('Starting connection tests...');
      
      // Test 1: Basic fetch to check if fetch works
      addResult('Test 1: Checking if fetch API works...');
      try {
        const response = await fetch('https://httpbin.org/get', { method: 'GET' });
        if (response.ok) {
          addResult('✅ Fetch API is working');
        } else {
          addResult(`❌ Fetch test failed: ${response.status}`);
        }
      } catch (error) {
        addResult(`❌ Fetch test error: ${error.message}`);
      }

      // Test 2: Test the actual backend URL
      addResult('Test 2: Testing backend URL accessibility...');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('https://elite-paisa-backend-production.up.railway.app', {
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        addResult(`✅ Backend URL accessible. Status: ${response.status}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          addResult('❌ Backend URL timeout - server might be down');
        } else {
          addResult(`❌ Backend URL error: ${error.message}`);
        }
      }

      // Test 3: Test API endpoint specifically
      addResult('Test 3: Testing API signup endpoint...');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch('https://elite-paisa-backend-production.up.railway.app/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: 'Test User',
            email: 'test@test.com',
            phoneNo: '1234567890',
            password: 'password123',
            role: 'client'
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        addResult(`✅ API endpoint responded. Status: ${response.status}`);
        
        const data = await response.json();
        addResult(`Response: ${JSON.stringify(data)}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          addResult('❌ API endpoint timeout - likely server issue');
        } else {
          addResult(`❌ API endpoint error: ${error.message}`);
        }
      }

      addResult('Tests completed!');
      
    } catch (error) {
      addResult(`Overall test error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Connection Test</Text>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]}
        onPress={testConnection}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Running Tests...' : 'Run Connection Tests'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultsContainer}>
        {results.map((result, index) => (
          <Text key={index} style={styles.resultText}>{result}</Text>
        ))}
      </ScrollView>

      <Text style={styles.info}>
        This will test if the backend server is accessible and responding
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});