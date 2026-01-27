import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ApiService from '../src/services/ApiService';
import ApiTestUtils from '../src/utils/apiTestUtils';
import { hp, scale, scaleFont, verticalScale, wp } from '../src/utils/responsive';

export default function ApiTestScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Unknown');

  const testApiConnection = async () => {
    setLoading(true);
    try {
      console.log('Testing API connection...');
      const response = await ApiService.getAllLoanTypes();
      console.log('API Test Result:', response);
      
      if (response.success) {
        setConnectionStatus('Connected');
        Alert.alert('Success', 'API Connection Successful!');
      } else {
        setConnectionStatus('Failed');
        Alert.alert('Error', 'API Connection Failed!');
      }
    } catch (error) {
      console.error('API Test Error:', error);
      setConnectionStatus('Failed');
      Alert.alert('Error', `API Connection Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runCompleteHealthCheck = async () => {
    setLoading(true);
    try {
      const healthReport = await ApiTestUtils.healthCheck();
      console.log('Health Check Report:', healthReport);
      
      if (healthReport.serverReachable) {
        Alert.alert('Health Check Complete', 'Server is reachable and APIs are configured!');
      } else {
        Alert.alert('Health Check Complete', 'Server is not reachable. Check your connection and backend URL.');
      }
    } catch (error) {
      console.error('Health Check Error:', error);
      Alert.alert('Error', `Health Check Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetAllLoanTypes = async () => {
    setLoading(true);
    try {
      console.log('Testing get all loan types...');
      const response = await ApiService.getAllLoanTypes();
      console.log('Get All Loan Types Result:', response);
      
      if (response.success) {
        Alert.alert('Success', 'Get All Loan Types API works!');
      } else {
        Alert.alert('Failed', 'Get All Loan Types API failed!');
      }
    } catch (error) {
      console.error('Get All Loan Types Error:', error);
      Alert.alert('Error', `Get All Loan Types Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetMyProfile = async () => {
    setLoading(true);
    try {
      console.log('Testing get my profile...');
      const response = await ApiService.getMyProfile();
      console.log('Get My Profile Result:', response);
      
      if (response.success) {
        Alert.alert('Success', 'Get My Profile API works!');
      } else {
        Alert.alert('Failed', 'Get My Profile API failed!');
      }
    } catch (error) {
      console.error('Get My Profile Error:', error);
      Alert.alert('Error', `Get My Profile Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetMyLoanApplications = async () => {
    setLoading(true);
    try {
      console.log('Testing get my loan applications...');
      const response = await ApiService.getMyLoanApplications();
      console.log('Get My Loan Applications Result:', response);
      
      if (response.success) {
        Alert.alert('Success', 'Get My Loan Applications API works!');
      } else {
        Alert.alert('Failed', 'Get My Loan Applications API failed!');
      }
    } catch (error) {
      console.error('Get My Loan Applications Error:', error);
      Alert.alert('Error', `Get My Loan Applications Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.container}>
      <Text style={styles.title}>API Connection Tests</Text>
      <Text style={styles.connectionStatus}>Status: {connectionStatus}</Text>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]}
        onPress={testApiConnection}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Basic Connection'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={runCompleteHealthCheck}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Run Health Check'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={testGetAllLoanTypes}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Loan Types'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={testGetMyProfile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Get Profile'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={testGetMyLoanApplications}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Loan Apps'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton, { marginTop: 20 }]}
        onPress={() => router.back()}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          Go Back
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.info}>
        Check console logs for detailed API responses
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: hp(3.75),
    color: '#333',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: wp(8),
    paddingVertical: verticalScale(15),
    borderRadius: scale(8),
    minWidth: wp(50),
    alignItems: 'center',
    marginVertical: hp(0.6),
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  info: {
    marginTop: hp(3.75),
    fontSize: scaleFont(14),
    color: '#666',
    textAlign: 'center',
  },
});