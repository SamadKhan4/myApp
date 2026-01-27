 
 
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../../src/utils/auth';
import { hp, scale, scaleFont, wp } from '../../src/utils/responsive';

export default function Login() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(email.trim(), password.trim());
      
      if (result.success) {
        // Login successful, navigate to home
        router.replace('/(tabs)/home');
      } else {
        // Login failed
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../src/assets/Images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>ElitePaisa</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to access your account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput 
                placeholder="your.email@example.com" 
                style={styles.input} 
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput 
                placeholder="Enter your password" 
                secureTextEntry 
                style={styles.input} 
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => router.push('/(auth)/forgot-password')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don&#39;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    padding: wp(6),
    justifyContent: 'space-between',
  },
  headerSection: {
    marginTop: hp(3),
    marginBottom: hp(4),
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: hp(2),
  },
  logoImage: {
    width: wp(22),
    height: wp(22),
  },
  brandName: {
    fontSize: scaleFont(24),
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: hp(1),
    letterSpacing: -0.5,
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(1.5),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    lineHeight: hp(3.5),
    fontWeight: '400',
  },
  formContainer: {
    gap: hp(2.5),
  },
  inputWrapper: {
    gap: hp(1),
  },
  inputLabel: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#374151',
    marginLeft: wp(1),
  },
  input: {
    height: hp(6.5),
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingHorizontal: wp(4),
    fontSize: scaleFont(16),
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: hp(1),
  },
  forgotPasswordText: {
    color: '#2563EB',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2563EB',
    height: hp(6.5),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    elevation: 4,
    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.2)',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  dividerLine: {
    flex: 1,
    height: hp(0.15),
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: scaleFont(14),
    color: '#9CA3AF',
    fontWeight: '500',
    marginHorizontal: wp(4),
  },
  googleButton: {
    height: hp(6.5),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  googleButtonText: {
    color: '#374151',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  footerText: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    fontWeight: '400',
  },
  signupLink: {
    fontSize: scaleFont(16),
    color: '#2563EB',
    fontWeight: '600',
  },
});
