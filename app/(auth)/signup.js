/* eslint-disable react-hooks/exhaustive-deps */
 
 
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signup } from '../../src/utils/auth';
import { wp, hp, scale, scaleFont, isIOS, isAndroid } from '../../src/utils/responsive';

export default function Signup() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNo: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignup = async () => {
    // Validation
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    
    if (!formData.phoneNo.trim() || formData.phoneNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    if (!formData.password.trim() || formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to Terms & Conditions');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        fullName: formData.fullName.trim(),
        phoneNo: formData.phoneNo.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
        role: 'client'
      };
      
      const result = await signup(userData);
      
      if (result.success) {
        // Signup successful, navigate to login
        router.push('/(auth)/login');
      } else {
        // Signup failed
        Alert.alert('Signup Failed', result.error || 'Unable to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Signup error:', error);
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
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <Animated.View 
            style={[
              styles.headerSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../src/assets/Images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.brandName}>ElitePaisa</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey to financial freedom</Text>
          </Animated.View>

          {/* Benefits Section */}
          <Animated.View 
            style={[
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              },
              { marginTop: hp(3) }
            ]}
          >
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>⚡</Text>
                <Text style={styles.benefitText}>Quick Approval</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🔒</Text>
                <Text style={styles.benefitText}>100% Secure</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>💰</Text>
                <Text style={styles.benefitText}>Best Rates</Text>
              </View>
            </View>
          </Animated.View>

          {/* Form Section */}
          <Animated.View 
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              },
              { marginTop: hp(4) }
            ]}
          >
            <View style={styles.formCard}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput 
                    placeholder="Enter your full name" 
                    style={styles.input} 
                    placeholderTextColor="#9CA3AF"
                    value={formData.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                  />
                </View>
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📱</Text>
                  <TextInput 
                    placeholder="Enter mobile number" 
                    style={styles.input} 
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={formData.phoneNo}
                    onChangeText={(text) => handleInputChange('phoneNo', text)}
                  />
                </View>
                <Text style={styles.helperText}>We all send you an OTP for verification</Text>
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput 
                    placeholder="your.email@example.com" 
                    style={styles.input} 
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                  />
                </View>
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🔐</Text>
                  <TextInput 
                    placeholder="Create a strong password" 
                    secureTextEntry={!showPassword}
                    style={styles.input} 
                    placeholderTextColor="#9CA3AF"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.passwordStrength}>
                  <View style={[styles.strengthBar, styles.strengthWeak]} />
                  <View style={styles.strengthBar} />
                  <View style={styles.strengthBar} />
                  <View style={styles.strengthBar} />
                </View>
                <Text style={styles.helperText}>At least 8 characters with letters & numbers</Text>
              </View>

              {/* Terms & Conditions */}
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  I agree to the{' '}
                  <Text style={styles.linkText}>Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity
                style={[styles.button, (!agreedToTerms || loading) && styles.buttonDisabled]}
                onPress={handleSignup}
                activeOpacity={0.8}
                disabled={!agreedToTerms || loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
                <Text style={styles.buttonIcon}>→</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Divider */}
          <Animated.View 
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              },
              { marginTop: hp(4) }
            ]}
          >
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>
          </Animated.View>

          {/* Social Login */}
          <Animated.View 
            style={[
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              },
              { marginTop: hp(3) }
            ]}
          >
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🔵</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📘</Text>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Sign In Link */}
          <Animated.View 
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              },
              { marginTop: hp(4), marginBottom: hp(5) }
            ]}
          >
            <View style={styles.signinContainer}>
              <Text style={styles.signinText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.signinLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.trustBadge}>
              <Text style={styles.trustIcon}>🔒</Text>
              <Text style={styles.trustText}>Your data is encrypted & protected</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: wp(5),
    paddingTop: hp(5.5),
  },
  headerSection: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: hp(2),
  },
  logoCircle: {
    width: wp(22),
    height: wp(22),
    borderRadius: scale(11),
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)',
  },
  logoText: {
    fontSize: scaleFont(32),
    fontWeight: '900',
    color: '#FFFFFF',
  },
  logoImage: {
    width: wp(22),
    height: wp(22),
  },
  brandName: {
    fontSize: scaleFont(28),
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: hp(1),
    letterSpacing: -0.5,
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: '900',
    color: '#111827',
    marginBottom: hp(1),
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: wp(4),
    elevation: 2,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
  },
  benefitItem: {
    alignItems: 'center',
    gap: hp(0.8),
  },
  benefitIcon: {
    fontSize: scaleFont(24),
  },
  benefitText: {
    fontSize: scaleFont(12),
    fontWeight: '700',
    color: '#374151',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(6),
    elevation: 3,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  inputWrapper: {
    marginBottom: hp(2.5),
  },
  inputLabel: {
    fontSize: scaleFont(14),
    fontWeight: '700',
    color: '#374151',
    marginBottom: hp(1.25),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: scale(14),
    paddingHorizontal: wp(4),
    height: hp(7),
  },
  inputIcon: {
    fontSize: scaleFont(20),
    marginRight: wp(3),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
    color: '#111827',
    fontWeight: '600',
  },
  eyeButton: {
    padding: wp(1),
  },
  eyeIcon: {
    fontSize: scaleFont(20),
  },
  helperText: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    marginTop: hp(1),
    fontWeight: '500',
  },
  passwordStrength: {
    flexDirection: 'row',
    gap: wp(1.5),
    marginTop: hp(1.5),
  },
  strengthBar: {
    flex: 1,
    height: hp(0.5),
    backgroundColor: '#E5E7EB',
    borderRadius: scale(1),
  },
  strengthWeak: {
    backgroundColor: '#EF4444',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(3),
    marginTop: hp(1),
  },
  checkbox: {
    width: wp(6),
    height: wp(6),
    borderRadius: scale(3),
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '900',
  },
  checkboxText: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    flex: 1,
    lineHeight: hp(2.8),
    fontWeight: '500',
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2563EB',
    height: hp(7),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(17),
    fontWeight: '800',
    marginRight: wp(2),
  },
  buttonIcon: {
    color: '#FFFFFF',
    fontSize: scaleFont(20),
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: hp(0.15),
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: scaleFont(14),
    color: '#9CA3AF',
    fontWeight: '600',
    marginHorizontal: wp(4),
  },
  socialContainer: {
    flexDirection: 'row',
    gap: wp(3),
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: hp(7),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    fontSize: scaleFont(20),
    marginRight: wp(2),
  },
  socialText: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#374151',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  signinText: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    fontWeight: '500',
  },
  signinLink: {
    fontSize: scaleFont(16),
    color: '#2563EB',
    fontWeight: '800',
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: scale(12),
    alignSelf: 'center',
  },
  trustIcon: {
    fontSize: scaleFont(16),
    marginRight: wp(2),
  },
  trustText: {
    fontSize: scaleFont(13),
    color: '#059669',
    fontWeight: '700',
  },
});